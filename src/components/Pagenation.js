import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.pagination}>
      {pageNumbers.map((number) => (
        <TouchableOpacity
          key={number}
          style={styles.pageItem}
          onPress={() => paginate(number)}
        >
          <Text style={styles.pageLink}>{number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pageItem: {
    marginHorizontal: 5,
  },
  pageLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Pagination;
