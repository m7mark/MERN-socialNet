const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRouter = require("./routes/user")
const profileRouter = require("./routes/profile")
const originRouter = require("./routes/origin")
const cors = require("cors")
const path = require('path');
const cookieParser = require("cookie-parser");
const Origin = require('./models/Origin');

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cookieParser());

let allowedOrigins = [];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, false);
    }
    return callback(null, true);
  },
  allowedHeaders: 'Accept,Origin,Content-Type,X-LS-CORS-Template,X-LS-Auth-Token,X-LS-Auth-User-Token,Content-Type,X-LS-Sync-Result,X-LS-Sequence,token',
  credentials: true,
  optionsSuccessStatus: 200
}));

// app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.join(__dirname, "/uploads")))
app.use(express.static(path.join(__dirname, "/loginpage/build")));
app.use('/api', authRouter)
app.use('/api', profileRouter)
app.use('/api', originRouter)
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
    //laod list of trusted origins
    const { origins } = await Origin.findById('618451383cb0c829dad4fa54')
    allowedOrigins = origins;
  } catch (e) { console.log(e); }
}
startApp()
