import { people } from '../db/people'
import testDb from '../db/testDb'

const resolvers = {
    Query: {
        people: () => people,
        person: (_: any, { id }: any) => people.filter(x => x.id == id)[0],

        code: (_: any, param: any) => testDb.getCode(param),
        codes: (_: any, param: any) => testDb.getCodes(param),
    }
}

export default resolvers;