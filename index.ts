import express from "express";
import { fileURLToPath } from "url";
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/user"
import profileRouter from "./routes/profile"
import cors from "cors"
import path, { dirname } from 'path';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'


// __dirname defenition
// const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "/uploads")))
app.use(express.static(path.join(__dirname, "/loginpage/build")));
app.use('/api', authRouter)
app.use('/api', profileRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/loginpage/build', 'index.html'));
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(200)
  // Error response
  res.json({
    data: {},
    resultCode: 1,
    messages: [error.message]
  })
})

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL || '')
    app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } catch (e) { console.log(e); }
}
startApp()
