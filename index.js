const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Bhagesh",
    content: "Bhagesh is here",
  },
  {
    id: uuidv4(),
    username: "Paresh",
    content: "Paresh is here",
  },
  {
    id: uuidv4(),
    username: "Om",
    content: "Om is here",
  },
];

app.listen(port, () => {
  console.log(`Listing at port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server at Main page");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  console.log(newContent);
  post.content = newContent;
  // console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id",(req,res)=>{
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");

})