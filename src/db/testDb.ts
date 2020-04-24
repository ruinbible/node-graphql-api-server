import OracleDB, { Connection } from 'oracledb';
import oracleDbHelper from '../db/oracleDbHelper'
import { dbConfig } from '../config'
import { qs } from './testQueryStore'

const testDb = {
    getCode: async ({ codeGubun }: any) => {
        let result = await oracleDbHelper.execute(
            qs.getQuery('GET_CODELIST'),
            {
                IN_CODEGUBUN: codeGubun,
            },
            dbConfig.testDb
        )
        return result.rows
    },

    getCodes: async ({ codeGubun }: any) => {
        let result = await oracleDbHelper.execute(
            qs.getQuery('PC_GET_CODELIST'),
            {
                IN_CODEGUBUN: codeGubun,
                OUT_RC: {
                    type: OracleDB.CURSOR,
                    dir: OracleDB.BIND_OUT,
                },
            },
            dbConfig.testDb
        )

        let rs: OracleDB.ResultSet<any> = result.outBinds.OUT_RC
        return await rs.getRows(100000)
    },
}

export default testDb;