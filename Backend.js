const {openDatabase}=require('react-native-sqlite-storage')

const db = openDatabase(
    {
      name: 'mydb',
      location: 'default',
    },
    () => {
      console.log('Database connected!');
    },
    error => console.log('Database error', error),
  );



  const createUserTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, email VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };

  const createUser = (name, email) => {
    let sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    let params = [name, email];
    db.executeSql(
      sql,
      params,
      result => {
        Alert.alert('Success', 'User created successfully.');
      },
      error => {
        console.log('Create user error', error);
      },
    );
  };

  const listUsers = async () => {
    let sql = 'SELECT * FROM users';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          const userList = []
          for (var i = 0; i < length; i++) {
            // console.log(resultSet.rows.item(i));
            userList.push(resultSet.rows.item(i));
          }
          setListUsersItems(userList);
          console.log(listUsersItems)
        },
        error => {
          console.log('List user error', error);
        },
      );
    });
  };

  const updateUser = () => {
    let sql = 'UPDATE users SET email = ?, name = ? WHERE id = ?';
    let params = ['yoursocialmd@gmail.com', 'Mohammad Sarfaraj', 1];
    db.executeSql(
      sql,
      params,
      resultSet => {
        Alert.alert('Success', 'Record updated successfully');
      },
      error => {
        console.log(error);
      },
    );
  };
module.exports = {
  createUserTable,
  createUser,
  updateUser,
  listUsers
}
