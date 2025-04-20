import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Production_URL } from "../../apiservice/api";
import axios from "axios";

const MAX_IMAGE_SIZE_MB = 1;

const UploadKyc = () => {

   
  const [customerNumber, setCustomerNumber] = useState('');
  const [tagImg, setTagImg] = useState(null);
const [vehicleFront, setVehicleFront] = useState(null);
const [vehicleSide, setVehicleSide] = useState(null);
const [ackDocument, setackDocument] = useState(null);
const [rcFrontImage, setRcFrontImage] = useState(null);
const [rcBackImage, setRcBackImage] = useState(null);
const [addressFrontImage, setAddressFrontImage] = useState(null);
const [addressBackImage, setAddressBackImage] = useState(null);
const [idFrontImage, setIdFrontImage] = useState(null);
const [idBackImage, setIdBackImage] = useState(null);
const [Loading, setLoading] = useState(false)
const [CustomerData, setCustomerData] = useState([])



  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Production_URL + `/customer/entityID?contactNo=${customerNumber}`);

      console.log("response --custr", response.data.customer)
      setCustomerData(response.data.customer);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectImage = (setImage) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User canceled image picker");
        } else if (response.errorCode) {
          console.error("ImagePicker Error:", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          const imageSizeMB = selectedImage.fileSize / (1024 * 1024);

          if (imageSizeMB > MAX_IMAGE_SIZE_MB) {
            Alert.alert(
              "Image Too Large",
              `Please select an image smaller than ${MAX_IMAGE_SIZE_MB} MB.`
            );
          } else {
            setImage(selectedImage.uri);
          }
        }
      }
    );
  };

  // Prepare form data based on selected images and other inputs
  const prepareFormData = () => {
    return [
      { key: "entityId", value: [CustomerData?.entityId], type: "text" },
      { key: "addressProof", type: "file", value: [addressFrontImage, addressBackImage] },
      { key: "idProof", type: "file", value: [idFrontImage, idBackImage] },
      { key: "businessType", value: "LQFLEET115_VC", type: "text" },
      { key: "entityType", value: "TRUCK_CORPORATE", type: "text" },
      { key: "ackDocument", type: "file", value: [ackDocument] },
      { key: "VehicleRC", type: "file", value: [rcFrontImage, rcBackImage] },
      { key: "FrontImg", type: "file", value: [vehicleFront] },
      { key: "SideImg", type: "file", value: [vehicleSide] },
    ];
  };
  
  const submitForm = async () => {
    const formData = new FormData();
    const preparedData = prepareFormData();
  
    // Append each field
    preparedData.forEach(item => {
      if (item.type === "text") {
        formData.append(item.key, item.value);
      } else if (item.type === "file") {
        item.value.forEach((uri, index) => {
          if (uri) {
            formData.append(item.key, {
              uri,
              type: "image/jpeg",
              name: `${item.key}_${index}.jpg`,
            });
          }
        });
      }
    });
  
    // Headers (DO NOT manually add 'Content-Type' for FormData)
    const headers = {
      "partnerId": "LQFLEET",
      "partnerToken": "Basic TFFGTEVFVA==",
      "Authorization": "Basic YWRtaW46YWRtaW4=",
      "TENANT": "LQFLEET",
    };
  
    try {
      const response = await fetch("https://uat-fleetdrive.m2pfintech.com/m2p-kyc", {
        method: "POST",
        headers, // don't set content-type manually
        body: formData,
      });
  
      const contentType = response.headers.get("content-type");
      const isJSON = contentType && contentType.indexOf("application/json") !== -1;
  
      const responseJson = isJSON ? await response.json() : await response.text();
      console.log("responseJson.message",responseJson)
  
      if (isJSON && responseJson.success) {
        Alert.alert("Success", "KYC uploaded successfully!");
      } else {
        Alert.alert("Error", responseJson.message || "There was an issue uploading the KYC.");
      }
  
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };
  
  
  


  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 15 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter customer number"
          placeholderTextColor="#888"
          value={customerNumber}
          onChangeText={setCustomerNumber}
        />

        <TouchableOpacity style={styles.submitButton} onPress={fetchCustomer} disabled={Loading}>
          <Text style={styles.submitText}> {Loading? <ActivityIndicator size="small" color="#fff" /> :'Verify' }</Text>
        </TouchableOpacity>

        <View style={styles.uploadBox}>
          <Text style={styles.label}>Front and Back of RC (Registration Certificate) <Text style={styles.imp}>*</Text></Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text>Front</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setRcFrontImage)}
              >
                {rcFrontImage ? (
                  <Image source={{ uri: rcFrontImage }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text>Back</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setRcBackImage)}
              >
                {rcBackImage ? (
                  <Image source={{ uri: rcBackImage }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Address Proof Image Upload */}
        <View style={styles.uploadBox}>
          <Text style={styles.label}>Address Proof <Text style={styles.imp}>*</Text></Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text>Front Image</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setAddressFrontImage)}
              >
                {addressFrontImage ? (
                  <Image source={{ uri: addressFrontImage }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text>Back Image</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setAddressBackImage)}
              >
                {addressBackImage ? (
                  <Image source={{ uri: addressBackImage }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>


   {/* Address Proof Image Upload */}
   <View style={styles.uploadBox}>
          <Text style={styles.label}>ID Proof <Text style={styles.imp}>*</Text></Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text>Front Image</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setIdFrontImage)}
              >
                {idFrontImage ? (
                  <Image source={{ uri: idFrontImage }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text>Back Image</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setIdBackImage)}
              >
                {idBackImage ? (
                  <Image source={{ uri: idBackImage }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Vehicle Image Upload */}
        <View style={styles.uploadBox}>
          <Text style={styles.label}>Upload Vehicle Front image with Number Plate <Text style={styles.imp}>*</Text></Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
             
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setVehicleFront)}
              >
                {vehicleFront ? (
                  <Image source={{ uri: vehicleFront }} style={styles.previewImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#007BFF" />
                )}
              </TouchableOpacity>
            </View>
         
          </View>
        </View>
          {/* Acknowledgment Document Upload */}
          <View style={styles.uploadBox}>
          <Text style={styles.label}>Upload Image of Side View of Vehicle with Axle <Text style={styles.imp}>*</Text></Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selectImage(setVehicleSide)}
          >
            {vehicleSide ? (
              <Image source={{ uri: vehicleSide }} style={styles.previewImage} />
            ) : (
              <Ionicons name="add" size={30} color="#007BFF" />
            )}
          </TouchableOpacity>
        </View>


  {/* Tag Document Upload */}
  <View style={styles.uploadBox}>
          <Text style={styles.label}>Upload image of Tag Affixed on car's windshield <Text style={styles.imp}>*</Text> </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selectImage(setTagImg)}
          >
            {tagImg ? (
              <Image source={{ uri: tagImg }} style={styles.previewImage} />
            ) : (
              <Ionicons name="add" size={30} color="#007BFF" />
            )}
          </TouchableOpacity>
        </View>

        {/* Acknowledgment Document Upload */}
        <View style={styles.uploadBox}>
          <Text style={styles.label}>Acknowledgment Document <Text style={styles.imp}>*</Text></Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selectImage(setackDocument)}
          >
            {ackDocument ? (
              <Image source={{ uri: ackDocument }} style={styles.previewImage} />
            ) : (
              <Ionicons name="add" size={30} color="#007BFF" />
            )}
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitForm} disabled={!CustomerData?.entityId}>
          <Text style={styles.submitText} disabled={Loading}> {Loading ? <ActivityIndicator size="small" color="#fff" /> :" Submit"} </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  input: {
    height: 50,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 10,
    marginBottom: 20,
  },
  imp:{
    color:"red"
  },
  uploadBox: { flex: 1, marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, color: "black" ,fontWeight:500},
  uploadButton: {
    backgroundColor: "white",
    elevation:10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginTop:10
  },
  previewImage: { width: 100, height: 100, marginVertical: 10, borderRadius: 5 },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom:20
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default UploadKyc;
