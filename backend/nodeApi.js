const express = require('express');
const User = require('./Model'); // Assuming User model is in a file named User.js

const app = express();
const user = new User(':memory:'); // Using in-memory database for demo, change to appropriate file path for persistent storage

app.use(express.json());

// Create user API
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  user.addUser(name, email, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User added successfully', userId: result.id });
  });
});

// Get all users API
app.get('/api/users', (req, res) => {
  user.getAllUsers((err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});
