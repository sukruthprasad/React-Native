const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./mydb.db', err => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.post('/api/users_create', (req, res) => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;

  db.run(createUserTableQuery, function(err) {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({message: 'Users table created successfully'});
  });
});

app.post('/api/users', (req, res) => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;

  db.run(createUserTableQuery, function(err) {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({message: 'Users table created successfully'});
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;

  const insertUserQuery = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.run(insertUserQuery, [name, email, password], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User added successfully', userId: this.lastID });
  });
}); 

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({data: rows});
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
