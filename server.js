const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Item = require("./models/Item");

const app = express();
const PORT = 3000;

// Database Connection
mongoose.connect("mongodb+srv://pandagrebhushan3:Dm01hcb4a9TN9bJN@cluster0.qrkc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("index", { items });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/items", async (req, res) => {
    const { name, description } = req.body;
    await Item.create({ name, description });
    res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render("edit", { item });
});

app.put("/items/:id", async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

app.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
