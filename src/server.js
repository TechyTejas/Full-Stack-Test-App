const express = require('express');
const path = require('path');
const port = 5000;
const app = express();
const db = require('./static/js/utils/db-connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Everything inside this folder can be accessed directly by the browser.
app.use(express.static(path.join(__dirname, 'public')));

//routes
const userRoutes = require('./routes/userRoutes');

//use routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World Tejass');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/all-users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'all-users.html'));
});

db.sync({force: false}).then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
})