import React, { useState, useEffect } from 'react';
import { View, Button, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Header from './src/components/Header';
import DirectoryTable from './src/components/DirectoryTable';
import AddUserForm from './src/components/AddUserForm';
import EditUserForm from './src/components/EditUserForm';
import Pagenation from './src/components/Pagenation';
import Modal from './src/components/Modal';
import useModal from './src/hooks/userModal';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
  };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    axios('http://localhost:3001/api/users')
      .then((response) =>
        response.data.map((user) => ({
          id: user.id.value,
          first_name: user.name.first,
          last_name: user.name.last,
          username: user.login.username,
          email: user.email,
          image: user.picture.thumbnail,
        }))
      )
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const addUser = (user) => {
    toggle();
    user.id = users.length + 1;
    user.image = 'https://randomuser.me/api/portraits/thumb/lego/1.jpg';
    setUsers([user, ...users]);
  };

  const editUser = (user) => {
    setEditing(true);
    toggle();
    setCurrentUser({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      image: user.image,
    });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    toggle();
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* <Header /> */}
      <ScrollView style={styles.mainDiv} >
        <View style={styles.WebContainer}>
        <View style={styles.container}>
          <Button title="Add User" onPress={toggle} />
        </View>
        {editing ? (
          <Modal
            isShowing={isShowing}
            hide={toggle}
            content={
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            }
          />
        ) : (
          <Modal
            isShowing={isShowing}
            hide={toggle}
            content={<AddUserForm addUser={addUser} />}
          />
        )}
        <DirectoryTable
          users={currentUsers}
          editUser={editUser}
          deleteUser={deleteUser}
        />
        <Pagenation
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
        />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight > 600 ? 20 : 10,
    marginBottom: windowHeight > 600 ? 20 : 10,
  },
  WebContainer:{
    paddingLeft:"10%",
    paddingRight:"10%"
  },
  mainDiv:{
    backgroundColor:"smokewhite"
  }
});

export default App;
