import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ isShowing, hide, content }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShowing}
      onRequestClose={hide}
    >
      <View style={styles.modalOverlay} />
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={hide}
            >
              <Text style={styles.closeButtonText}>&times;</Text>
            </TouchableOpacity>
          </View>
          {content}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCloseButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomModal;
