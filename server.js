/// ************SERVER.JS****************
/// express app using mongodb for storage
/// for development purposes, mongodb is being hosted in docker image locally
/// *************************************
const express = require('express');

const PORT = process.env.PORT || 8000;
const connectDb = require('./config/db');

// setup
connectDb();
const app = express();

app.use('/api/users/', require('./backend/routes/userRoutes'));
app.use('/api/tickets/', require('./backend/routes/ticketRoutes'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Dev Flow Pro!' });
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
