import express from "express";
import cors from "cors";
import userRouter from "./routes/UserRegister.js";
import mongoose from "mongoose";
const app = express();
var whitelist = ["http://localhost:5173", "http://192.168.31.56:5173","https://magnificent-flan-0d2cd1.netlify.app"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors(corsOptions));
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
