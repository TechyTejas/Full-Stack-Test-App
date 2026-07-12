const express = require('express');
const port = 5000;
const app = express();
const db = require('./static/js/utils/db-connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes 
const userRoutes = require('./routes/userRoutes');

//use routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});