import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello world" });
});

app.get("/name/:name", (req, res) => {
    res.status(200).json({ name: req.params.name });
})

app.use(express.json());

app.post("/", (req, res) => {
    res.status(200).json(req.body);
});

app.listen(3000);