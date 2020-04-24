import jwt from 'jsonwebtoken'
import { appKey } from '../config'

const jwtHelper = {
    generateApiKey: (req: any, res: any, next: any) => {
        function makeKey(length: number) {
            let result           = ''
            let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let charactersLength = characters.length
            for ( let i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        }

        // 1. API KEY 생성
        let apiKey = makeKey(32)

        // 2. DB에 저장
        // TODO: DB 구현

        res.send({ apiKey: apiKey })
        return
    },

    generateToken: (req: any, res: any, next: any) => {
        // 1. API KEY 를 파라메터로 취득
        let apiKey = req.body.apiKey

        // 2. API KEY 가 유효한지 DB에서 검증
        // TODO: DB 구현
        if (apiKey !== appKey) {
            let msg = 'Forbidden'
            console.error('ERROR:', msg)
            res.status(403).send({ message: msg })
            return
        }

        // 3. 토큰 생성
        let token = {
            accessToken: jwt.sign({ apiKey: apiKey }, appKey, { expiresIn: '30m' }),
            refreshToken: jwt.sign({ apiKey: apiKey }, appKey, { expiresIn: '30d' }),
        }

        console.log(`{ "Authorization": "Bearer ${token.accessToken}" }`)
        res.send(token)
        return;
    },

    graphql: (req: any, res: any, next: any) => {
        try {
            var token = req.headers.authorization?.split(' ')[1]
            jwt.verify(token!, appKey, (err: any, decodedToken: any) => {
                if (err || !decodedToken) {
                    console.error('ERROR:', err.message)
                    res.status(401).send({ message: err.message })
                    return
                }
                next()
            })
        } catch {
            let msg = 'Unauthorized'
            console.error('ERROR:', msg)
            res.status(401).send({ message: msg })
            return
        }
    },
}

export default jwtHelper;
