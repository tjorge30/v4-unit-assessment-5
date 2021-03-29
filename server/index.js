require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  userCtrl = require("./controllers/user"),
  postCtrl = require("./controllers/posts"),
  massive = require("massive");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } =  process.env;
const PORT = SERVER_PORT;

const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
        app.listen(PORT, (_) => console.log(`running on ${PORT}`));
    });

    app.use(
        session({
            resave: true,
            saveuninitialized: false,
            secret: SESSION_SECRET,
            cookie: {maxAge: 7200000}
        })
);

//Auth Endpoints
app.post("/api/auth/register", userCtrl.register);
app.post("/api/auth/login", userCtrl.login);
app.get("/api/auth/me", userCtrl.getUser);
app.post("/api/auth/logout", userCtrl.logout);

//Post Endpoints
app.get("/api/posts", postCtrl.readPosts);
app.post("/api/post", postCtrl.createPost);
app.get("/api/post/:id", postCtrl.readPost);
app.delete("/api/post/:id", postCtrl.deletePost);

