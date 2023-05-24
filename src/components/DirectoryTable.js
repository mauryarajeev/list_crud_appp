import React, { useState, useMemo } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBox from './SearchBox';

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { editUser, deleteUser } = props;
  const [searchValue, setSearchValue] = useState('');

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key].toString().toLowerCase().includes(searchValue.toString().toLowerCase())
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.userInfo}>
        <Text>{item.first_name}</Text>
        <Text>{item.last_name}</Text>
        <Text>{item.username}</Text>
        <Text>{item.email}</Text>
      </View>
      <View style={styles.iconButtons}>
        <IconButton
          icon={() => <MaterialIcons name="edit" size={24} color="black" />}
          onPress={() => editUser(item)}
        />
        <IconButton
          icon={() => <MaterialIcons name="delete" size={24} color="black" />}
          onPress={() => deleteUser(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View>
      <SearchBox searchHandler={searchHandler} />
      <ScrollView>
        {updateUsers.length > 0 ? (
          <FlatList
            data={updateUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text>No Users</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  iconButtons: {
    flexDirection: 'row',
  },
});

export default DirectoryTable;
