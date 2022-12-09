const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/Routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);


mongoose.set('strictQuery', false)

mongoose.connect(
  process.env.MONGO_URL, 
    {
  
  useNewUrlParser: true, 
  useUnifiedTopology: true
      
  })
  
  const db = mongoose.connection
  
  db.once("open", ()=>{console.log("banco de dados carregado")})
  
  app.listen(process.env.PORT || 3000, ()=>{
  
  console.log("servidor rodando na porta 3000")
  
  
  })