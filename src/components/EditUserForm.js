import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit User</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={user.first_name}
          onChangeText={(value) => handleInputChange('first_name', value)}
          pattern="[a-zA-Z]+"
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={user.last_name}
          onChangeText={(value) => handleInputChange('last_name', value)}
          pattern="[a-zA-Z]+"
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={user.username}
          onChangeText={(value) => handleInputChange('username', value)}
          pattern="[a-zA-Z0-9-]+"
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(value) => handleInputChange('email', value)}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => props.updateUser(user.id, user)}>
        <Text style={styles.buttonText}>Update User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom:"15%"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditUserForm;
