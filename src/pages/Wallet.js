import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, TextInput, Animated } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const Wallet = ({navigation}) => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const { user, token } = useAuth();
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        fetchWalletDetails();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const fetchWalletDetails = async () => {
        try {
            const response = await axios.get(`https://api.aktollpark.com/wallet-details/${user.id}`);
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
            const orderResponse = await fetch("https://api.aktollpark.com/create-order", {
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
                theme: { color: "#8B0000" }
            };

            RazorpayCheckout.open(options)
                .then(async (paymentData) => {
                    try {
                        const verifyResponse = await fetch("https://api.aktollpark.com/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                order_id: order.id,
                                payment_id: paymentData.razorpay_payment_id,
                                signature: paymentData.razorpay_signature,
                                agentId: "67ae10d8578a05a658278f91",
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
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <LinearGradient
                colors={['#8B0000', '#B22222']}
                style={styles.header}
            >
                <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Wallet Balance</Text>
                <Text style={styles.balance}>₹{balance}</Text>
            </LinearGradient>

            <View style={styles.rechargeContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TouchableOpacity style={styles.rechargeButton} onPress={handleRecharge}>
                    <LinearGradient
                        colors={['#B22222', '#8B0000']}
                        style={styles.buttonGradient}
                    >
                        <Text style={styles.buttonText}>Recharge Now</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Text style={styles.subTitle}>Transaction History</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.transactionItem}>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionText}>{item.orderId}</Text>
                            <Text style={styles.transactionDate}>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                        <View style={styles.transactionAmountContainer}>
                            <Text style={styles.transactionAmount}>{item.amount}.Rs</Text>
                            <Text
                                style={[
                                    styles.transactionStatus,
                                    item.status === "Success" ? styles.success : styles.failed
                                ]}
                            >
                                {item.status}
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No transactions yet</Text>
                }
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: 15,
        paddingTop: 35,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 3,
        shadowColor: '#B22222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 15,
        zIndex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
    },
    balance: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 8,
        fontFamily: 'Poppins-ExtraBold',
    },
    rechargeContainer: {
        padding: 15,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#DDD',
        fontFamily: 'Poppins-Regular',
        // elevation: 2,
        shadowColor: '#B22222',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    rechargeButton: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonGradient: {
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 15,
        marginBottom: 8,
        color: '#333',
        fontFamily: 'Poppins-SemiBold',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        marginHorizontal: 15,
        marginBottom: 8,
        borderRadius: 10,
        elevation: 0,
        shadowColor: '#B22222',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: '#333',
    },
    transactionDate: {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
        color: '#777',
        marginTop: 3,
    },
    transactionAmountContainer: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#B22222',
    },
    transactionStatus: {
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginTop: 3,
    },
    success: {
        color: '#0f9d58',
        backgroundColor: '#e6f4ea',
    },
    failed: {
        color: '#d32f2f',
        backgroundColor: '#fdecea',
    },
    emptyText: {
        textAlign: 'center',
        color: '#777',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        marginTop: 15,
    },
});

export default Wallet;