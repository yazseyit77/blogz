let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let express = require("express");
let app = express();

//app config
mongoose.connect("mongodb://localhost:27017/blogz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose/model config
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});
let Blog = mongoose.model("Blog", blogSchema);

// RESTful routes
//landing route
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
//index route
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log("Error!");
    } else {
      res.render("index", { blogs });
    }
  });
});
// new route
app.get("/blogs/new", (req, res) => {
  res.render("new");
});
// create route
app.post("/blogs", (req, res) => {
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render("new");
    } else {
      res, redirect("/blogs");
    }
  });
});

app.listen(8000, console.log("Listening on PORT: 8000"));
