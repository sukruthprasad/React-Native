const express = require('express');
const User = require('./Model'); // Assuming User model is in a file named User.js
const sqlite3 = require('sqlite3').verbose();
const app = express();
const user = new User(':memory:'); // Using in-memory database for demo, change to appropriate file path for persistent storage

app.use(express.json());
// const db = new sqlite3.Database('../db/UserDB.sqlite');
// Create user API
app.post('/api/users', (req, res) => {
  const {name, email} = req.body;
  user.addUser(name, email, (err, result) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({message: 'User added successfully', userId: result.id});
  });
});

// Get all users API
app.get('/api/users', (req, res) => {
  user.getAllUsers((err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({users: rows});
  });
});

app.get('/api/users/generateRandom', (req, res) => {
  try {
    const generateRandomString = length => {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };

    const generateRandomEmail = () => {
      const randomString = generateRandomString(8);
      return {name: `${randomString}`, email: `${randomString}@example.com`};
    };
    let user = [];
    for (let i = 0; i < 10; i++) {
      const generatedNameEmail = generateRandomEmail();
      user.push(generatedNameEmail);
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    console.log('error has been trigered');
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});
