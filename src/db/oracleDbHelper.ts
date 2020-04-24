import OracleDB, { BindParameters, ConnectionAttributes } from 'oracledb'

const oracleDbHelper = {
    execute: (sql: string, binds: BindParameters={}, connectionAttributes: ConnectionAttributes): Promise<any> =>
        new Promise<any>(async (resolve, reject) => {
            let connection, options, result

            try {
                connection = await OracleDB.getConnection(connectionAttributes)
            } catch (error) {
                reject(error)
                return
            }

            try {
                options = {
                    outFormat: OracleDB.OUT_FORMAT_OBJECT,   // query result format
                    // extendedMetaData: true,   // get extra metadata
                    // fetchArraySize: 100       // internal buffer allocation size for tuning
                    // resultSet: true,
                };

                result = await connection.execute(sql, binds, options)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }),
}

export default oracleDbHelper