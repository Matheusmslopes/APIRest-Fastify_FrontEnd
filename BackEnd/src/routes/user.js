/**@type{import('fastify').FastifyPluginAsync<>} */

import { USER_NOT_FOUND } from '../libs/error.js';

export default async function user(app, options) {
    const users = app.mongo.db.collection('users');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    username: { type: 'string' },
                    password: { type: 'string' },
                    admin: { type: 'boolean' }
                },
                required: ['username', 'password', 'admin']
            }
        }
    }, async (req, rep) => {
        let user = req.body;

        let result = await users.count({username: user.username})
        if(result <= 0) throw new USER_ALREADY_EXISTS();

        await users.insertOne({ username: user.username, password: user.password, admin: user.admin });

        return;
    });

    app.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    username: { type: 'string' },
                    password: { type: 'string' },
                    admin: { type: 'boolean' },
                },
                required: ['username', 'password']
            }
        }
    }, async (req, rep) => {
        let user = req.body;
        
        let result = await users.count({username: user.username});
        if(result <= 0) throw new USER_NOT_FOUND();
        else {
            let jwtToken = app.jwt.sign(req.body);

            let isAdmin = await users.count({username: user.username, admin: true});
            if(isAdmin <= 0) {
                return rep.code(200).send({
                    "x-access-token": jwtToken
                });
            } else {
                let adminToken = app.jwt.sign(req.body);

                return rep.code(200).send({
                    "x-access-token": jwtToken,
                    "admin-token": adminToken
                });
            }
        }
    });
}
