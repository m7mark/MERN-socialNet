const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRouter = require("./routes/user")
const profileRouter = require("./routes/profile")
const cors = require("cors")
const path = require('path');

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
app.use((error, req, res, next) => {
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
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } catch (e) { console.log(e); }
}
startApp()
