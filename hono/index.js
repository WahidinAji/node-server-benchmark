import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
    return c.json({ msg: "Hello world" }, 200);
});

app.get("/name/:name", (c) => {
    return c.json({ name: c.req.param("name") }, 200);
});

app.post("/", async (c) => {
    const body = await c.req.json();
    return c.json(body, 200);
});

serve({ fetch: app.fetch, port: 3000 });