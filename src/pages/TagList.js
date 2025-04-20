import { View, FlatList, ActivityIndicator, Clipboard, ToastAndroid, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Production_URL } from '../apiservice/api';
import useAuth from '../hooks/useAuth';
import { Card, Text, IconButton, Button } from 'react-native-paper';

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [groupedTags, setGroupedTags] = useState({});
  const [filteredTags, setFilteredTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${Production_URL}/tags/agent/${user.id}`);
        const data = await response.json();

        const groupedData = data.reduce((acc, tag) => {
          if (!acc[tag.tagClass]) {
            acc[tag.tagClass] = [];
          }
          acc[tag.tagClass].push(tag);
          return acc;
        }, {});

        setGroupedTags(groupedData);
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const copyToClipboard = (kitNo) => {
    Clipboard.setString(kitNo);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const handleCategoryClick = (category) => {
    setFilteredTags(groupedTags[category] || []);
    setSelectedCategory(category);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#F8F9FA' }}>
      {loading ? (
        <ActivityIndicator size="large" color="darkred" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={Object.entries(groupedTags)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            const [category, tags] = item;
            return (
              <TouchableOpacity onPress={() => handleCategoryClick(category)}>
                <Card style={{ marginBottom: 12, padding: 16, borderRadius: 12, backgroundColor: tags[0]?.color || '#ccc' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/fasttag.jpg')} style={{ width: 100, height: 40, marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Class: {category}</Text>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>Total: {tags.length}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Class: {selectedCategory}</Text>
            {filteredTags.length > 0 ? (
              <FlatList
                data={filteredTags}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <Card style={{ marginBottom: 10, padding: 12, borderRadius: 12, backgroundColor: item.color || 'lightgray' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.kitNo.trim()}</Text>
                      <IconButton
                        icon="content-copy"
                        color="black"
                        size={20}
                        onPress={() => copyToClipboard(item.kitNo)}
                      />
                    </View>
                  </Card>
                )}
              />
            ) : (
              <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 20 }}>No Tags Available</Text>
            )}
            <Button mode="contained" onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>Close</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TagList;