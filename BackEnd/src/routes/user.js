/**@type{import('fastify').FastifyPluginAsync<>} */

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
        let name = req.body.username;

        let jwtToken = app.jwt.sign(req.body);

        await users.insertOne({ username: name, jwtToken: jwtToken });

        return rep.code(201).send({
            "x-access-token": jwtToken
        });
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
}
