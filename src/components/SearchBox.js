import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBox = ({ searchHandler }) => {
  const handleSearchInputChange = (value) => {
    searchHandler(value);
  };

  return (
    <View style={styles.search}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearchInputChange}
        placeholder="Search..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default SearchBox;
