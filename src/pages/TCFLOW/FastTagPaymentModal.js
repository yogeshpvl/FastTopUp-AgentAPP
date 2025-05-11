import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FastTagPaymentModal = ({ visible, setVisible, subData, Balance,onPaymentSuccess }) => {
  const [status, setStatus] = useState(null); // success / error

  console.log(" Balance--", Balance)
  const handlePayment = () => {
    if (Balance >= subData?.fastTagPrice?.total) {
      setStatus('success');
      if (onPaymentSuccess) {
        onPaymentSuccess();  // Call postRequest after payment success
      }
      setTimeout(() => {
        setVisible(false);
        setStatus(null);
      }, 2000);
    } else {
      setStatus('error');
      setTimeout(() => {
        setStatus(null);
      }, 2000);
    }
  };

  const fastTagPrice = subData?.fastTagPrice || {};

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalView}>
          
          {status === 'success' && (
            <Text style={styles.successText}>Payment Successful 🎉</Text>
          )}

          {status === 'error' && (
            <Text style={styles.errorText}>Insufficient Balance ❌</Text>
          )}

          {!status && (
            <>
              <Text style={styles.title}>FastTag Price Details</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceRow}>
                  Base Price: ₹ {fastTagPrice.basePrice || 0}
                </Text>
                <Text style={styles.priceRow}>
                  Activation Fee: ₹ {fastTagPrice.activationFee || 0}
                </Text>
                <Text style={styles.priceRow}>
                  Platform Fee: ₹ {fastTagPrice.platformFee || 0}
                </Text>
                <Text style={styles.priceRow}>
                  Payment Gateway Fee: ₹ {fastTagPrice.paymentGatewayFee || 0}
                </Text>
                <Text style={styles.priceRow}>
                  GST: ₹ {fastTagPrice.gst || 0}
                </Text>

                <View style={styles.separator} />

                <Text style={styles.totalText}>
                  Total: ₹ {fastTagPrice.total || 0}
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handlePayment}>
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  priceContainer: {
    width: '100%',
    marginBottom: 20,
  },
  priceRow: {
    fontSize: 16,
    marginVertical: 2,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00B386',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelText: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 14,
  },
  successText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default FastTagPaymentModal;
