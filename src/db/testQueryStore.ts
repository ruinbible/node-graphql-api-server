import QueryStore from '../db/QueryStore'

const queries = [
    {
        id: 'NOW',
        text: `SELECT CURRENT_DATE AS NOW FROM DUAL`
    },
    {
        id: 'GET_CODELIST',
        text: `
            SELECT  COMN_CD     ID,
                    COMN_CD_NM  NM
            FROM    CODES
            WHERE   CODEGUBUN = :IN_CODEGUBUN
        `
    },
    {
        id: 'PC_GET_CODELIST',
        text: `CALL PC_GET_CODELIST(:IN_CODEGUBUN, :OUT_RC)`
    },
]

let qs = new QueryStore(queries);
export { qs };