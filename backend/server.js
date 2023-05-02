import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();


app.use(cors());

app.use(bodyParser.json());

const PORT = 4001;
const SECRET = "fosjguerhgrj";

const users = [];
const accounts = [];
let userIds = 1;
  //{
  //"username": "hej",
  //"password": "123",
 // "id": 1
//}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("req.headers", req.headers);
  console.log("authHeader", authHeader)
  console.log("token", token)

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}



app.post("/users", (req, res) => {
  const user = req.body;
  user.id= userIds++;
  users.push(user);

  console.log("req body: " + user.username + " " + user.password );

  const account = 
  {
    money: "100",
    userId: user.id,
  };

  accounts.push(account);
  

  res.statusCode = 200;
  res.send("ok");
});

app.post("/sessions", (req, res) => {

  const user = req.body;
  const dbUser = users.find((userEl)=> {
    if(userEl.username == user.username){
      return userEl
    }
  })

  if(dbUser.password === user.password ){
    const token = jwt.sign(dbUser.id, SECRET)
    console.log(token);
    res.json(token);
  }
 
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  
  const myAccount = accounts.find((acc) => acc.userId == req.userId);
  console.log(myAccount);
  res.json(myAccount);



});




app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
