import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Clipboard,
  ToastAndroid,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import useAuth from '../hooks/useAuth';
import { Production_URL } from '../apiservice/api';

// Color palette for tag classes VC4 to VC16
const tagClassColors = {
  VC4:  ['#8B0000', '#B22222'], // Dark Red to Firebrick
  VC5:  ['#A52A2A', '#CD5C5C'], // Brown to Indian Red
  VC6:  ['#FF4500', '#FF7F50'], // OrangeRed to Coral
  VC7:  ['#FFA500', '#FFB84D'], // Orange to Light Orange
  VC8:  ['#9C27B0', '#BA68C8'], // Purple to Light Purple
  VC9:  ['#6A1B9A', '#AB47BC'], // Deep Purple to Medium Orchid
  VC10: ['#1565C0', '#2196F3'], // Blue shades
  VC11: ['#283593', '#5C6BC0'], // Indigo shades
  VC12: ['#2E7D32', '#4CAF50'], // Green shades
  VC13: ['#388E3C', '#81C784'], // Medium Green to Light Green
  VC14: ['#00897B', '#4DB6AC'], // Teal to Aqua
  VC15: ['#006064', '#26C6DA'], // Cyan to Light Blue-Cyan
  VC16: ['#455A64', '#90A4AE'], // Blue Grey to Light Grey Blue
  default: ['#616161', '#9E9E9E'] // Default grey tones
};


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
  }, [user?.id]);

  const copyToClipboard = (kitNo) => {
    Clipboard.setString(kitNo);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const handleCategoryClick = (category) => {
    setFilteredTags(groupedTags[category] || []);
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const getDaysAgo = (dateString) => {
    const updatedDate = new Date(dateString);
    const today = new Date();
    updatedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today - updatedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated 1 day ago';
    return `Updated ${diffDays} days ago`;
  };

  const refreshTags = () => {
    setLoading(true);
    setTags([]);
    setGroupedTags({});
    setFilteredTags([]);
    setModalVisible(false);
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
  };

  const renderCategoryCard = ({ category, tags }) => {
    const colors = tagClassColors[category] || tagClassColors.default;
    return (
      <Animatable.View animation="fadeInUp" duration={500} style={styles.cardContainer}>
        <TouchableOpacity onPress={() => handleCategoryClick(category)}>
          <LinearGradient colors={colors} style={styles.categoryCard}>
            <View style={styles.cardContent}>
              <Icon name="tag-outline" size={30} color="#fff" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Class: {category}</Text>
              <Text style={styles.cardSubtitle}>Total: {tags.length}</Text>
              <Image
                source={require('../assets/fasttag.jpg')}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  const renderTagItem = ({ item }) => (
    <Animatable.View animation="fadeIn" duration={300}>
      <View style={styles.tagCard}>
        <View style={styles.tagCardContent}>
          <View style={styles.tagInfo}>
            <Text style={styles.tagTitle}>{item.kitNo.trim()}</Text>
            <Text style={styles.tagSubtitle}>{getDaysAgo(item.updatedAt)}</Text>
            <Text style={styles.tagSubtitle}>
              {moment(item.updatedAt).format('MM-DD-YYYY')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(item.kitNo)}
          >
            <Icon name="content-copy" size={24} color="#8B0000" />
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tag List</Text>
        <TouchableOpacity onPress={refreshTags} disabled={loading}>
          <Icon name="refresh" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#8B0000" style={styles.loader} />
      ) : tags.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('../assets/fasttag.jpg')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No tags available</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {Object.entries(groupedTags).map(([category, tags]) =>
              renderCategoryCard({ category, tags })
            )}
          </View>
        </ScrollView>
      )}

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Class: {selectedCategory}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            {filteredTags.length > 0 ? (
              <ScrollView contentContainerStyle={styles.modalScroll}>
                {filteredTags.map((item) => renderTagItem({ item }))}
              </ScrollView>
            ) : (
              <View style={styles.emptyModal}>
                <Text style={styles.emptyModalText}>No Tags Available</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  loader: {
    marginTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  cardContent: {
    alignItems: 'flex-start',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  cardImage: {
    width: 80,
    height: 40,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  modalScroll: {
    padding: 16,
  },
  tagCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  tagCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  tagInfo: {
    flex: 1,
  },
  tagTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  tagSubtitle: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  copyButton: {
    padding: 8,
  },
  emptyModal: {
    padding: 20,
    alignItems: 'center',
  },
  emptyModalText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  closeButton: {
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});

export default TagList;