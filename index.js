import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } catch (e) { console.log(e); }
}

startApp()
