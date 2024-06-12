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
                    password: { type: 'string' }
                },
                required: ['username', 'password']
            }
        }
    }, async (req, rep) => {
        let user = req.body;

        let result = await users.count({username: user.username})
        if(result <= 0) throw new USER_ALREADY_EXISTS();

        await users.insertOne({ username: username, password: password });

        return;
    });

    app.put('/register/:id', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    password: { type: 'string' },
                    isAdmin: { type: 'boolean' }
                },
                required: ['username', 'password', 'isAdmin']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let id = req.params.id;

        let adminToken = app.jwt.sign(req.body);

        if(!req.body.isAdmin)
            return rep.code(400).send({
                "message": "isAdmin property must be true"
        })

        await users.updateOne({ _id: new app.mongo.ObjectId(id) }, {
            $set: {
                adminToken: adminToken
            }
        });

        return rep.code(200).send({
            "admin-token": adminToken
        });
    });

    app.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    username: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['username', 'password']
            }
        }
    }, async (req, rep) => {
        let user = req.body;
        let jwtToken = app.jwt.sign(req.body);
        
        let result = await users.count({username: user.username})
        if(result <= 0) throw new USER_NOT_FOUND();

        return rep.code(200).send({
            "x-access-token": jwtToken
        });
    });
}

