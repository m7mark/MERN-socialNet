import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/user"
import profileRouter from "./routes/profile"
import cors from "cors"
import path  from 'path';
import { Request, Response, NextFunction } from 'express'

// __dirname defenition
// const __dirname = dirname(fileURLToPath(import.meta.url));
const dirName = path.dirname(__dirname);

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(dirName, "/uploads")))
app.use(express.static(path.join(dirName, "/loginpage/build")));
app.use('/api', authRouter)
app.use('/api', profileRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(dirName, '/loginpage/build', 'index.html'));
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
