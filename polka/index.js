import polka from "polka";

const app = polka();

app.get("/", (req, res) => {
    res.writeHead(200).end(JSON.stringify({ msg: "Hello world" }));
});

app.get("/name/:name", (req, res) => {
    res.writeHead(200).end(JSON.stringify({ name: req.params.name }));
});

app.use(async (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        next();
        return;
      }

      let body = "";

      for await (const chunk of req) {
        body += chunk;
      }

      const paramBody = {};

      switch (req.headers["content-type"]) {
        case "application/x-www-form-urlencoded":
          for (const [key, value] of new URLSearchParams(body)) {
            paramBody[key] = value;
          }

          req.body = paramBody;
          break;
        case "application/json":
        default:
          req.body = JSON.parse(body);
      }
      next();
})

app.post("/", (req, res) => {
    res.writeHead(200).end(JSON.stringify(req.body));
})

app.listen(3000);