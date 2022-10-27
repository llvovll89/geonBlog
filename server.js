// 모듈
const articleRouter = require("./routes/articels");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// router.use(bodyParser.text({ type: "text/html" }));

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(morgan("tiny"));
// css 쓰기 위해 정적 폴더 assets 지정
app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`Server Start | http://localhost:${PORT}`);
});