import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';

const SaleReport = () => {
  // Sample sales data for the report
  const salesData = [
    { id: '1', date: '2024-12-01', amount: '₹ 5000', status: 'Completed' },
    { id: '2', date: '2024-12-02', amount: '₹ 3000', status: 'Pending' },
    { id: '3', date: '2024-12-03', amount: '₹ 4500', status: 'Completed' },
    { id: '4', date: '2024-12-04', amount: '₹ 6000', status: 'Completed' },
    { id: '5', date: '2024-12-05', amount: '₹ 2500', status: 'Pending' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sales Report</Text>

      {/* Date Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter by Date:</Text>
        <TouchableOpacity style={styles.dateFilterButton}>
          <Text style={styles.filterButtonText}>Select Date</Text>
        </TouchableOpacity>
      </View>

      {/* Sales Data List */}
      <FlatList
        data={salesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text style={styles.reportText}>Date: {item.date}</Text>
            <Text style={styles.reportText}>Amount: {item.amount}</Text>
            <Text style={styles.reportText}>Status: {item.status}</Text>
          </View>
        )}
      />

      {/* View Detailed Report Button */}
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Detailed Report</Text>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  dateFilterButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  reportItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
  },
  reportText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  viewButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});

export default SaleReport;
