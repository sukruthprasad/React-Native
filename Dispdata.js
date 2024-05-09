import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const Dispdata = ({responseFromApi}) => {
  
  return (
    <>
      {/* <View style={{display: 'flex', width: '100%', overflow: 'scroll'}}>
        <View>
          <View>
            <Text>Name</Text>
            <Text>Email</Text>
          </View>
          {listUsersItems.map(item => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          ))}
        </View>
      </View> */}

      { <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Email</Text>
        </View>
        <ScrollView style={styles.scrollView}>
        {responseFromApi.map(item => (
            <View style={styles.row} key={item.id}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.email}</Text>
            </View>
        ))}
        </ScrollView>
      </View> }
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    width: 325,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});
export default Dispdata;
