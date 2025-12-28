const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

// Static
app.use("/assets", express.static(path.join(process.cwd(), "assets")));
app.use("/demo_files", express.static(path.join(process.cwd(), "demo_files")));
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Defaults pour éviter "is not defined"
app.use((req, res, next) => {
  res.locals.slideTop = { why: "", recent: [] };
  res.locals.contact = {};
  res.locals.wrapper = {};
  res.locals.nav = [];
  res.locals.slides = [];
  res.locals.gallery = { images: [], paragraphs: [] };
  res.locals.menuColumns = [];
  res.locals.events = [];
  res.locals.map = { lat: -12.043333, lng: -77.028333, title: "Resto, Inc." };
  res.locals.googleMapsKey = process.env.GMAPS_KEY || "";
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    slideTop: {
      why: "Lorem ipsum dolor sit amet...",
      recent: [
        { label: "Consectetur adipiscing elit", href: "#" },
        { label: "Lorem ipsum dolor sit amet", href: "#" },
      ],
    },
    contact: {
      addressLine1: "21132, Saint Caterine St",
      addressLine2: "Montreal, Vivas 2355 Canada",
      phone: "1-800-565-2390",
      email: "resto@yourname.com",
    },
    nav: [
      { label: "HOME", href: "#home", active: true },
      { label: "ABOUT", href: "#about" },
      { label: "GALLERY", href: "#gallery" },
      { label: "MENU", href: "#themenu" },
      { label: "EVENTS", href: "#events" },
      { label: "RESERVATION", href: "#reservation" },
      { label: "CONTACT", href: "#contact" },
    ],
  });
});

app.get("/health", (req, res) => res.json({ ok: true }));

module.exports = app;