const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route.js');
const userroutes = require("./routes/user.route.js")
const carpoolRoutes = require('./routes/carpool.route.js');
const carrentalroutes = require('./routes/carrental.route.js')
const lostnfoundroutes = require("./routes/lostnfound.route.js")
const projectroutes = require('./routes/project.route.js')
const connectDB = require('./config/database.js');
require('dotenv').config();


// connection (mongo and cloudniary)


connectDB();
require("./utils/cloudinary.js");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));




// middelware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/user',userroutes)
app.use('/api/carpool', carpoolRoutes);
app.use('/api/carrental',carrentalroutes);
app.use('/api/lostnfound', lostnfoundroutes);
app.use('/api/projects', projectroutes);

// server 
app.listen('4000', () => {
    console.log('server running');
});