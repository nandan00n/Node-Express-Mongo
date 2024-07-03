const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorhandler");
const PORT = process.env.PORT || 3500;

//Custom Logger
app.use(logger);
//cors stands for cross Origin Resource Sharing

// CORS configuration
const whitelist = [
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "https://www.mysite.com",
];

const constOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(constOptions));
//body parser middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile('./views/index.html', {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  // res.sendFile('./views/index.html', {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  // res.sendFile('./views/index.html', {root: __dirname});
  res.redirect(301, "new-page.html"); //302 by default
});

//Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404)
  if(req.accepts('html')){    
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if(req.accepts('json')){    
    res.json({error: "404 Not Found"});
  }
  else{
    res.type('txt').send("404 Not Found");
  }
});


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
