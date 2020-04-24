import { GraphQLServer, Options } from 'graphql-yoga'
import bodyParser from 'body-parser'
import resolvers from './graphql/resolvers'
import jwtHelper from './jwt/jwtHelper'
import { port } from './config';

const appOptions: Options = {
    port: port,
    playground: "/playground",
    endpoint: "/graphql",
}

const handleAppStart = (): void => console.log(`Listening on port ${appOptions.port}`);

const server = new GraphQLServer({
    typeDefs: 'src/graphql/schema.graphql',
    resolvers
})

server.express.use(bodyParser.urlencoded({extended: false}))
server.express.use(bodyParser.json())
server.express.post('/apiKey', jwtHelper.generateApiKey)    // API KEY 생성
server.express.post('/token', jwtHelper.generateToken)      // 토큰 생성
server.express.use('/graphql', jwtHelper.graphql)           // GraphQL middleware
server.start(appOptions, handleAppStart)
