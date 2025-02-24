
import "dotenv/config"
import express from "express";
import cors from "cors"; 
import routes from "./routes/index.js"
const app = express()

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/",(req,res)=>{
    return res.send({
        "message" : "Hi everyone!"
    })
})
// Routes

app.use(routes);
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));