import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import RNFS from 'react-native-fs'; // for download CSV
import { Production_URL } from '../apiservice/api';
import useAuth from '../hooks/useAuth';
import moment from 'moment';

const SaleReport = () => {
  const { user } = useAuth();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${Production_URL}/customer/AgentReport?agentId=${user.id}&fromDate=${formatDate(fromDate)}&toDate=${formatDate(toDate)}`
      );
      const data = await response.json();
      console.log("data---",data)
      if (data.success) {
        setReportData(data.data);
      } else {
        ToastAndroid.show('Failed to fetch report', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Error fetching report', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    if (!reportData || !reportData.customers) return;

    const csvHeader = 'Contact No,Kit No,Tag Class,Status,Created At\n';
    const csvRows = reportData.customers.map(c => 
      `${c.contactNo},${c.kitNo},${c.tagClass},${c.status},${formatDate(new Date(c.createdAt))}`
    ).join('\n');

    const csvString = csvHeader + csvRows;
    const path = RNFS.DownloadDirectoryPath + '/AgentReport.csv';

    try {
      await RNFS.writeFile(path, csvString, 'utf8');
      ToastAndroid.show('Report Downloaded Successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Failed to download report', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sales Report</Text>

      {/* Date Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateFilterButton}>
          <Text style={styles.filterButtonText}>From: {formatDate(fromDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateFilterButton}>
          <Text style={styles.filterButtonText}>To: {formatDate(toDate)}</Text>
        </TouchableOpacity>
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFromPicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowToPicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      )}

      <Button mode="contained" onPress={fetchReport} style={{ marginVertical: 15 }}>
        Fetch Report
      </Button>

      {loading && <ActivityIndicator size="large" color="darkred" />}

      {reportData && (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.reportText}>MinKYC Customers: {reportData.minKYCCount}</Text>
            <Text style={styles.reportText}>FullKYC Customers: {reportData.fullKYCCount}</Text>
          </View>

          <Button mode="contained" onPress={downloadCSV} style={{ marginVertical: 15 }}>
            Download Report (CSV)
          </Button>
          <FlatList
            data={reportData.customers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.reportItem}>
                <Text style={styles.reportText}>Contact: {item.contactNo}</Text>
                <Text style={styles.reportText}>Kit No: {item.kitNo}</Text>
                <Text style={styles.reportText}>Tag Class: {item.tagClass}</Text>
                <Text style={styles.reportText}>Status: {item.status}</Text>
                <Text style={styles.reportText}>Date: {moment(item.createdAt).format("MM-DD-YYYY LT")}</Text>
              </View>
            )}
          />


        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  reportItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  reportText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default SaleReport;
