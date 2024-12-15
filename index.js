import express from "express";
import cors from "cors";
import userRouter from "./routes/UserRegister.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
const app = express();
dotenv.config()
var whitelist = ["http://localhost:5173", "http://192.168.31.56:5173","https://magnificent-flan-0d2cd1.netlify.app"];
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = whitelist;
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.use(cors(corsOptions));
app.get("/",(req,res)=>{
  res.sendStatus(200)
})
app.use("/user", userRouter);
mongoose
  .connect(
    process.env.CONNECTIONSTRING
  )
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));
app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});
