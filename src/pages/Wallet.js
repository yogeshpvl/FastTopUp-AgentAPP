import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, TextInput } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
      const {user, token} = useAuth();
      console.log('User:', user);
      console.log('Token:', token);

    useEffect(() => {
        fetchWalletDetails();
    }, []);

    const fetchWalletDetails = async () => {
        try {
            const response = await axios.get(`http://192.168.0.230:8500/wallet-details/${user.id}`);
            setBalance(response.data.balance);
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error("Error fetching wallet details:", error);
            Alert.alert("Error", "Failed to load wallet details.");
        }
    };
    

    const handleRecharge = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            Alert.alert("Invalid Amount", "Please enter a valid amount.");
            return;
        }
        
        try {
            const orderResponse = await fetch("http://192.168.0.230:8500/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, currency: "INR", agentId: "67ae10d8578a05a658278f91" })
            });
            const order = await orderResponse.json();

            const options = {
                description: "Wallet Recharge",
                image: "https://your-logo-url.com/logo.png",
                currency: "INR",
                key: "rzp_test_1iDoeKTN6YVLnj", 
                amount: order.amount,
                name: "Your App Name",
                order_id: order.id,
                prefill: { email: "test@example.com", contact: "9999999999", name: "Test User" },
                theme: { color: "#F37254" }
            };

            RazorpayCheckout.open(options)
                .then(async (paymentData) => {
                    try {
                        const verifyResponse = await fetch("http://192.168.0.230:8500/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                order_id: order.id,
                                payment_id: paymentData.razorpay_payment_id,
                                signature: paymentData.razorpay_signature,
                                agentId:"67ae10d8578a05a658278f91",
                                amount
                            })
                        });
                        const verifyJson = await verifyResponse.json();
                        Alert.alert("Success", verifyJson.message);
                        fetchWalletDetails();
                    } catch (error) {
                        console.error("Verification Error:", error);
                        Alert.alert("Error", "Payment verification failed.");
                    }
                })
                .catch(() => {
                    Alert.alert("Error", "Payment failed. Try again.");
                });
        } catch (error) {
            console.error("Recharge Error:", error);
            Alert.alert("Error", "Something went wrong.");
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Wallet Balance: ₹{balance}</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.rechargeButton} onPress={handleRecharge}>
            <Text style={styles.buttonText}>Recharge</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Transaction History</Text>
        <FlatList
    data={transactions}
    keyExtractor={(item) => item._id.toString()}
    renderItem={({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.transactionDetails}>
                <Text style={styles.transactionText}>{item.orderId}</Text>
                <Text style={styles.transactionDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
                <Text style={styles.transactionAmount}>₹{item.amount}</Text>
                <Text style={[styles.transactionStatus, item.status === "Success" ? styles.success : styles.failed]}>
                    {item.status}
                </Text>
            </View>
        </View>
    )}
/>
    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 16, fontWeight: "600", marginBottom: 10, fontFamily: "Poppins" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10, fontSize: 14, fontFamily: "Poppins" },
    subTitle: { fontSize: 16, fontWeight: "500", marginVertical: 10, fontFamily: "Poppins" },
    rechargeButton: { backgroundColor: "#F37254", padding: 10, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold", fontFamily: "Poppins" },
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 5,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionAmountContainer: {
        alignItems: "flex-end",
    },
    transactionText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#333",
    },
    transactionDate: {
        fontSize: 12,
        fontFamily: "Poppins-Light",
        color: "#777",
    },
    transactionAmount: {
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
        color: "#000",
    },
    transactionStatus: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 5,
        textAlign: "center",
    },
    success: {
        color: "#0f9d58",
        backgroundColor: "#e6f4ea",
    },
    failed: {
        color: "#d32f2f",
        backgroundColor: "#fdecea",
    },
});

export default Wallet;