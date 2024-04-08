import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {createUserTable} from './Backend';
import {openDatabase} from 'react-native-sqlite-storage';
import Dispdata from './Dispdata';
const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [toggleState, setToggleState] = useState(false);
  const [listUsersItems, setListUsersItems] = useState([]);

  const db = openDatabase(
    {
      name: 'mydb',
      location: 'default',
      createFromLocation: './mydb.db',
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
        // Alert.alert('Success', 'User created successfully.');
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
          const userList = [];
          for (var i = 0; i < length; i++) {
            // console.log(resultSet.rows.item(i));
            userList.push(resultSet.rows.item(i));
          }
          setListUsersItems(userList);
          console.log(listUsersItems);
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

  useEffect(() => {
    createUserTable();
  }, []);
  const toggleComponent = () => {
    setToggleState(toggleState => !toggleState);
  };


  
const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const generateRandomEmail = () => {
  const randomString = generateRandomString(8);
  return `${randomString}@example.com`;
};


const generateRandomUsers = () => {
  for (let i = 0; i < 100; i++) {
    const name = generateRandomString(8);
    const email = generateRandomEmail();
    createUser(name, email); 
  }
};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'scroll',
      }}>
      <Text style={{marginBottom: 20, paddingBottom: 10, width: 200, left: 30}}>
        ADD Name & Email
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={{borderWidth: 1, padding: 10, marginBottom: 10, width: 200}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={{borderWidth: 1, padding: 10, marginBottom: 10, width: 200}}
      />
      <Button title="Save" onPress={() => createUser(name, email)} />
      <Button title="Show Data" onPress={() => listUsers(name, email)} />
      <Button title="Display Data" onPress={() => toggleComponent()} />
      <Button title="Gen Random" onPress={() => generateRandomUsers()} />

      {toggleState === true ? <Dispdata listUsersItems={listUsersItems} /> : ''}
    </View>
  );
};

export default App;
