const sqlite3 = require('sqlite3').verbose();

class User {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.createTable();
  }

  createTable() {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `;
    this.db.run(createUserTableQuery, function(err) {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table created successfully');
      }
    });
  }

  addUser(name, email, callback) {
    const insertUserQuery = `
      INSERT INTO users (name, email)
      VALUES (?, ?)
    `;
    this.db.run(insertUserQuery, [name, email], function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: this.lastID });
    });
  }

  getAllUsers(callback) {
    const getAllUsersQuery = `
      SELECT * FROM users
    `;
    this.db.all(getAllUsersQuery, function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }
}

module.exports = User;
