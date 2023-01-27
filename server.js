require("dotenv").config();
const express = require("express");
const {notion, createDbEntry} = require('./notion');


const app = express();
app.set("views", "./views")
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Welcome to notion integration test app");
});

app.post("/create-record", async (req, res) => {
    console.log(req.body, 'req');
    const { title, description, date, number } = req.body
  
    await createDbEntry({
      title,
      description,
      date,
      number
    })
  
    res.redirect("/")
  });



app.listen(process.env.PORT);

