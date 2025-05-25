const express = require('express');
const app = express();
const cors = require('cors');
const carpoolRoutes = require('./routes/carpool.route.js');
const  carrentalroutes = require('./routes/carrental.route.js')
const connectDB = require('./config/database.js');

connectDB();
app.use(express.json());

app.use('/api/carpool', carpoolRoutes);
app.use('/api/carrental',carrentalroutes);


app.listen('4000', () => {
    console.log('server running');
});