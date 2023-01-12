import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

const initialState = {
  text: "",
  location: "",
  photo: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(CameraType.back);
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
    setPhoto(photo.uri);
    setState((prevState) => ({ ...prevState, photo: photo.uri }));
    // console.log("location", location.latitude);
    // console.log(photo);
  };

  const sendPhoto = async () => {
    navigation.navigate("DefaultScreen", { photo });
    setState(initialState);
    setPhoto(null);
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
          <Text style={styles.textFlip}>Flip Camera</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TextInput
          style={{ fontSize: 16, paddingTop: 8, paddingBottom: 48 }}
          placeholder="Завантажити фото"
        />
      </View>
      <TextInput
        style={styles.input}
        value={state.text}
        placeholder="Назва..."
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, text: value }))
        }
      />
      <View style={{ position: "relative" }}>
        <View style={styles.location}>
          <Feather name="map-pin" size={16} color="#bdbdbd" />
          <TextInput
            style={styles.locationText}
            value={state.location}
            placeholder="Місцевість..."
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />
        </View>
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
      <TouchableOpacity
        // onFocus={() => setPhoto(null)}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={24} color="#DADADA" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    height: 240,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    // borderColor: "#E8E8E8",
    borderRadius: 8,
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
  textFlip: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    flexDirection: "row",
    alignItems: "baseline",
    height: 35,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 32,
  },
  locationText: {
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  deleteButton: {
    // bottom: 22,
    marginTop: 120,
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
});
