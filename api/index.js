const express = require("express");
const path = require("path");
require('dotenv').config();



const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Express + EJS sur Vercel",
    now: new Date().toLocaleString("fr-CA"),
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
})
module.exports = app;