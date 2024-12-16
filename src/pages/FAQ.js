import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const FAQ = () => {
  const faqs = [
    {
      question: "What is a Tag Issuance?",
      answer: "A Tag Issuance refers to the process of issuing a tag for toll payments in the transport system."
    },
    {
      question: "How can I recharge my tag?",
      answer: "You can recharge your tag through the app by selecting the 'Tag Recharge' option and entering the amount."
    },
    {
      question: "What documents are required for tag registration?",
      answer: "You will need your vehicle details, owner information, contact number, and a valid ID proof."
    },
    {
      question: "How do I replace a lost tag?",
      answer: "In case of a lost tag, you can request a replacement through the 'Tag Replacement' option on the app."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact customer support through the 'Help' option in the app or by calling the helpline."
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}

      {/* Contact Support Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  answer: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },
  contactButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});

export default FAQ;
