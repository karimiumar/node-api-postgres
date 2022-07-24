const Pool = require('pg').Pool;
const pool = new Pool ({
    user: 'postgres'
    ,password: 'postgres'
    ,database: 'postgres'
    ,host: '127.0.0.1'
    ,port: 5432
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM angular.users', (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const login = (req, res) => {
    let {username, password} = req.body;
    pool.query('SELECT * FROM angular.users WHERE username=$1 AND password=$2', [username, password]
        ,(error, results) => {

        if(error) {
            return res.send({status: 0, error: error});
        }
        return res.status(200).send({status: 1, token: '12345'});
    });
}

const getUserByUsername = (req, res) => {
    const username = req.params.username;
    console.log('Looking up db for user:', username);
    pool.query('SELECT * FROM angular.users WHERE username = $1', [username], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    const {username, email, password } = req.body;
    console.log('Creating user in db for user:', username);
    pool.query('INSERT INTO angular.users(username, email, password) VALUES ($1, $2, $3) RETURNING *'
        , [username, email, password], (error, results) => {
        if(error) throw error;
        console.log(`User added: ${results.insertId}`);
        res.status(201).send(`User added: ${results.insertId}`);
    });
};

const updateUser = (req, res) => {
    const username = req.params.username;
    console.log('Updating user in db for user:', username);
    const {email, password} = req.body;
    pool.query('UPDATE angular.users SET email = $1, password = $2 WHERE username = $3', [email, password, username],
        (error, results) => {
        if(error) throw error;
        res.status(200).send(`User with username : ${username} modified.`);
    });
};

module.exports = {
    getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    login
}

