import { app, server } from "./socket/socket.js";
import express from "express"
import cookieParser from "cookie-parser";
import 'dotenv/config';
import cors from "cors";
import { connectDb } from "./config/connect.db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"


app.use(cors({
     origin:[process.env.CLIENT_URL],
     credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// GLOBAL ERROR MIDDLEWARE SHOULD BE LAST
app.use(errorMiddleware)


const port = process.env.PORT || 4000;
server.listen(port, ()=>{
     connectDb();
     console.log(`Server listening on Port: http://localhost:${port}`); 
})