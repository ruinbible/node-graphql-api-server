import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 4000
const appKey = process.env.APP_KEY || ''
const dbConfig = {
    testDb: {
        connectString : process.env.TEST_ORACLE_DB_ADDR,
        user          : process.env.TEST_ORACLE_DB_USER,
        password      : process.env.TEST_ORACLE_DB_PASS,
    },
};

export { port, appKey, dbConfig }