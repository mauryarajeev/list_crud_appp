import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const AddUserForm = (props) => {
  const initialFormState = {
    id: null,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: null,
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUser({ ...user, image: file });
  };

  const handleAddUser = () => {
    if (!user.first_name || !user.last_name) return;

    props.addUser(user);
    setUser(initialFormState);
  };

  return (
    <view style={styles.ButtonAdd}>
    <PaperProvider theme={DefaultTheme} >
      <View>
        <TextInput
          placeholder="First Name"
          value={user.first_name}
          onChangeText={(value) => handleInputChange('first_name', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={user.last_name}
          onChangeText={(value) => handleInputChange('last_name', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={user.username}
          onChangeText={(value) => handleInputChange('username', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={user.email}
          onChangeText={(value) => handleInputChange('email', value)}
          style={styles.input}
        />
        <View style={styles.fileInputContainer}>
          <input type="file" onChange={handleImageUpload} />
        </View>
        <Button title="Add" onPress={handleAddUser}  />
      </View>
    </PaperProvider>
    </view>
  );
};

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  fileInputContainer: {
    marginBottom: 10,
  },
  ButtonAdd:{
    marginBottom:"8%",
  }
};

export default AddUserForm;
