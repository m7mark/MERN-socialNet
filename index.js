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

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  // Error response
  res.json({
    resultCode: 1,
    message: error.message,
  })
})

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } catch (e) { console.log(e); }
}

startApp()
