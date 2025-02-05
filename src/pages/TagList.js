import { View, FlatList, ActivityIndicator, Clipboard, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Production_URL } from '../apiservice/api';
import useAuth from '../hooks/useAuth';
import { Card, Text, Chip, IconButton } from 'react-native-paper';

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${Production_URL}/tags/agent/${user.id}`);
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Copy Kit Number to Clipboard
  const copyToClipboard = (kitNo) => {
    Clipboard.setString(kitNo);
    ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Blocked':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <View style={{ padding: 16, backgroundColor:"white",flex:1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="darkred" />
      ) : (
        <FlatList
          data={tags}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10, padding: 10, borderRadius: 10, backgroundColor:"lightgrey" }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.kitNo}</Text>
                <IconButton
                  icon="content-copy"
                  size={20}
                  onPress={() => copyToClipboard(item.kitNo)}
                />
              </View>
              <Chip style={{ alignSelf: 'flex-start', backgroundColor: getStatusColor(item.status) }}>
                {item.status}
              </Chip>
            </Card>
          )}
        />
      )}
    </View>
  );
};

export default TagList;
