const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./queries');

app.use(cors());
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express & PostgresSQL API'});
})

app.get('/users', db.getUsers);
app.get('/users/:username', db.getUserByUsername)
app.put('/users/:username', db.updateUser);
app.post('/register', db.createUser);
app.post('/login', db.login);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})