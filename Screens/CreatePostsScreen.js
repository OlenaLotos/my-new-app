import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(CameraType.back);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});

    setPhoto(photo.uri);
    console.log("location", location.latitude);
    console.log(photo);
  };

  const sendPhoto = async () => {
    navigation.navigate("DefaultScreen", { photo });
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} type={type}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100, borderRadius: 8 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.iconWrapp} onPress={takePhoto}>
          <Image
            style={styles.icon}
            source={require("../images/camera.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity style={styles.downLoadTextWrapp}>
          <Text style={styles.downLoadText}>Завантажити фото</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonSend}>
        <Button
          onPress={sendPhoto}
          // style={styles.buttonSend}
          color={"#fff"}
          backgroundColor={"#FF6C00"}
          title="Опублікувати"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    height: 240,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapp: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
  },
  icon: {
    // top: 18,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonSend: {
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 32,
  },
  downLoadTextWrapp: {
    marginLeft: 16,
    marginTop: 8,
  },
  downLoadText: {
    fontSize: 16,
    color: "#BDBDBD",
  },

  button: {
    // flex: 1,
    marginTop: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
