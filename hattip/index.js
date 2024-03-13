import { createServer } from "@hattip/adapter-node";
import { createRouter } from "@hattip/router";

const router = createRouter();

router.get("/", () => new Response("Hello world!",{status: 200}));
router.get("/name/:name", (ctx) => {
    return new Response(
        JSON.stringify({name: ctx.params.name}),
        {status: 200}
    );
});
router.post("/", async (ctx) => {
    const body = await ctx.request.json();
    return new Response(JSON.stringify(body), { status: 201});
});

createServer(router.buildHandler()).listen(3000);