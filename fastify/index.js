import Fastify from "fastify";

const app = Fastify({
    logger: false,
});

app.get("/", {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    msg: {
                        type: "string"
                    }
                }
            }
        }
    }
}, (request, reply) => {
    return { msg: "Hello world" };
});

app.get("/name/:name", {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    }
                }
            }
        }
    }
}, (request, reply) => {
    return { name: request.params.name }
});

app.post("/", {}, (request, reply) => {
    reply.send(request.body);
})

app.listen({ port: 3000 });