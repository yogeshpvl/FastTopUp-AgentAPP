import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Production_URL } from "../../apiservice/api";
import axios from "axios";

const MAX_TOTAL_IMAGE_SIZE_MB = 2; // Maximum total size for all images in MB

const UploadKyc = ({ navigation }) => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [tagImg, setTagImg] = useState(null);
  const [vehicleFront, setVehicleFront] = useState(null);
  const [vehicleSide, setVehicleSide] = useState(null);
  const [ackDocument, setAckDocument] = useState(null);
  const [rcFrontImage, setRcFrontImage] = useState(null);
  const [rcBackImage, setRcBackImage] = useState(null);
  const [addressFrontImage, setAddressFrontImage] = useState(null);
  const [addressBackImage, setAddressBackImage] = useState(null);
  const [idFrontImage, setIdFrontImage] = useState(null);
  const [idBackImage, setIdBackImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [imageSizes, setImageSizes] = useState({});

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Production_URL + `/customer/entityID?contactNo=${customerNumber}`);
      console.log("response --custr", response.data.customer);
      setCustomerData(response.data.customer);
    } catch (error) {
      Alert.alert("Error", "Customer not found");
      console.error("Error fetching customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateKycStatus = async () => {
    try {
      const response = await axios.put(Production_URL + `/customer/updateKycStatus?entityId=${customerData?.entityId}&status=minKyc`);
      console.log("response --custr", response.data);
    } catch (error) {
      console.error("Error updating KYC status:", error);
    }
  };

  const selectImage = (setImage, imageKey) => {
    // Show alert with options to take a photo or choose from gallery
    Alert.alert(
      "Select Image",
      "Choose an option to upload the image:",
      [
        {
          text: "Take Photo",
          onPress: () => launchCamera(setImage, imageKey),
        },
        {
          text: "Choose from Gallery",
          onPress: () => launchGallery(setImage, imageKey),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const launchCamera = (setImage, imageKey) => {
    ImagePicker.launchCamera(
      {
        mediaType: "photo",
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 1,
        includeExtra: true,
      },
      (response) => handleImagePickerResponse(response, setImage, imageKey)
    );
  };

  const launchGallery = (setImage, imageKey) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 1,
        includeExtra: true,
      },
      (response) => handleImagePickerResponse(response, setImage, imageKey)
    );
  };

  const handleImagePickerResponse = (response, setImage, imageKey) => {
    if (response.didCancel) {
      console.log("User canceled image picker");
    } else if (response.errorCode) {
      console.error("ImagePicker Error:", response.errorMessage);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    } else if (response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      const imageSizeMB = selectedImage.fileSize / (1024 * 1024);

      if (imageSizeMB > MAX_TOTAL_IMAGE_SIZE_MB) {
        Alert.alert(
          "Image Too Large",
          `Please select an image smaller than ${MAX_TOTAL_IMAGE_SIZE_MB} MB.`
        );
      } else {
        setImage(selectedImage.uri);
        setImageSizes((prev) => ({
          ...prev,
          [imageKey]: selectedImage.fileSize,
        }));
      }
    }
  };

  const prepareFormData = () => {
    return [
      { key: "entityId", value: [customerData?.entityId], type: "text" },
      { key: "addressProof", type: "file", value: [addressFrontImage, addressBackImage] },
      { key: "idProof", type: "file", value: [idFrontImage, idBackImage] },
      { key: "businessType", value: "LQFLEET115_VC", type: "text" },
      { key: "entityType", value: "TRUCK_CORPORATE", type: "text" },
      { key: "ackDocument", type: "file", value: [ackDocument] },
      { key: "VehicleRC", type: "file", value: [rcFrontImage, rcBackImage] },
      { key: "FrontImg", type: "file", value: [vehicleFront] },
      { key: "SideImg", type: "file", value: [vehicleSide] },
      { key: "TagImg", type: "file", value: [tagImg] },
    ];
  };

  const submitForm = async () => {
    // Calculate total image size
    const totalSizeBytes = Object.values(imageSizes).reduce((sum, size) => sum + (size || 0), 0);
    const totalSizeMB = totalSizeBytes / (1024 * 1024);

    if (totalSizeMB > MAX_TOTAL_IMAGE_SIZE_MB) {
      Alert.alert(
        "Total Image Size Exceeded",
        `The total size of all images must be less than ${MAX_TOTAL_IMAGE_SIZE_MB} MB. Current total: ${totalSizeMB.toFixed(2)} MB.`
      );
      return;
    }

    // Validate required images
    const requiredImages = [
      rcFrontImage,
      rcBackImage,
      idFrontImage,
      idBackImage,
      vehicleFront,
      vehicleSide,
      tagImg,
      ackDocument,
    ];
    if (requiredImages.some((img) => !img)) {
      Alert.alert("Missing Images", "Please upload all required images.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    const preparedData = prepareFormData();

    preparedData.forEach((item) => {
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

    const headers = {
      partnerId: "LQFLEET",
      partnerToken: "Basic TFFGTEVFVA==",
      Authorization: "Basic YWRtaW46YWRtaW4=",
      TENANT: "LQFLEET",
    };

    try {
      const response = await fetch("https://uat-fleetdrive.m2pfintech.com/m2p-kyc", {
        method: "POST",
        headers,
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      const isJSON = contentType && contentType.indexOf("application/json") !== -1;

      const responseJson = isJSON ? await response.json() : await response.text();
      console.log("responseJson.message", responseJson);

      if (isJSON && responseJson.success) {
        await updateKycStatus();
        Alert.alert("Success", "KYC uploaded successfully!");
        navigation.navigate("BottomTab");
      } else {
        Alert.alert("Error", responseJson.message || "There was an issue uploading the KYC.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to upload KYC. Please try again.");
    } finally {
      setLoading(false);
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
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={fetchCustomer} disabled={loading}>
          <Text style={styles.submitText}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : "Verify"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, marginBottom: 10 }}>
          All images size should be less than 2MB in total
        </Text>

        <View style={styles.uploadBox}>
          <Text style={styles.label}>
            Front and Back of RC (Registration Certificate) <Text style={styles.imp}>*</Text>
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text>Front</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setRcFrontImage, "rcFrontImage")}
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
                onPress={() => selectImage(setRcBackImage, "rcBackImage")}
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

        <View style={styles.uploadBox}>
          <Text style={styles.label}>
            ID Proof <Text style={styles.imp}>*</Text>
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text>Front Image</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setIdFrontImage, "idFrontImage")}
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
                onPress={() => selectImage(setIdBackImage, "idBackImage")}
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

        <View style={styles.uploadBox}>
          <Text style={styles.label}>
            Upload Vehicle Front image with Number Plate <Text style={styles.imp}>*</Text>
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectImage(setVehicleFront, "vehicleFront")}
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

        <View style={styles.uploadBox}>
          <Text style={styles.label}>
            Upload Image of Side View of Vehicle with Axle <Text style={styles.imp}>*</Text>
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selectImage(setVehicleSide, "vehicleSide")}
          >
            {vehicleSide ? (
              <Image source={{ uri: vehicleSide }} style={styles.previewImage} />
            ) : (
              <Ionicons name="add" size={30} color="#007BFF" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadBox}>
          <Text style={styles.label}>
            Upload image of Tag Affixed on car's windshield <Text style={styles.imp}>*</Text>
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selectImage(setTagImg, "tagImg")}
          >
            {tagImg ? (
              <Image source={{ uri: tagImg }} style={styles.previewImage} />
            ) : (
              <Ionicons name="add" size={30} color="#007BFF" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadBox}>
          <Text style={styles.label}>
            Acknowledgment Document <Text style={styles.imp}>*</Text>
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selectImage(setAckDocument, "ackDocument")}
          >
            {ackDocument ? (
              <Image source={{ uri: ackDocument }} style={styles.previewImage} />
            ) : (
              <Ionicons name="add" size={30} color="#007BFF" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !customerData?.entityId && styles.submitButtonDisabled]}
          onPress={submitForm}
          disabled={!customerData?.entityId || loading}
        >
          <Text style={styles.submitText}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : "Submit"}
          </Text>
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
  imp: {
    color: "red",
  },
  uploadBox: { flex: 1, marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, color: "black", fontWeight: "500" },
  uploadButton: {
    backgroundColor: "white",
    elevation: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginTop: 10,
  },
  previewImage: { width: 100, height: 100, marginVertical: 10, borderRadius: 5 },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default UploadKyc;