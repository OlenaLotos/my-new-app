import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
// import { AppLoading } from "expo";
import Apploading from "expo-app-loading";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      // Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false); // змінити на фолс
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  if (!isReady) {
    return (
      <Apploading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      {/* <View style={styles.container}> */}
      <ImageBackground
        style={styles.image}
        source={require("./images/backgraund.png")}
      >
        <View style={styles.background}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 32 : 66,
                width: dimensions,
              }}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}></View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Image
                    style={styles.photo}
                    source={require("./images/add.png")}
                  />
                  {/* <Text style={styles.buttonText}>+</Text> */}
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Реєстрація</Text>
              </View>

              <View style={{ marginBottom: 16 }}>
                <TextInput
                  onFocus={() => setIsShowKeyboard(true)}
                  style={styles.input}
                  textAlign="left"
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  onFocus={() => setIsShowKeyboard(true)}
                  style={styles.input}
                  textAlign="left"
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <TextInput
                  onFocus={() => setIsShowKeyboard(true)}
                  style={styles.input}
                  textAlign="left"
                  secureTextEntry={true}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <View style={styles.button}>
                <Button
                  // activeOpacity={0.8}
                  style={styles.button}
                  onPress={keyboardHide}
                  title="Зареєструватись"
                  color={"#fff"}
                >
                  {/* <Text style={styles.btnTitle}>Зареєструватись</Text> */}
                </Button>
              </View>
              <View style={{ padding: 16 }}>
                <Button color={"#1B4371"} title="У вас вже є акаунт? Увійти" />
              </View>
              <StatusBar style="auto" />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    // left: -205,
    height: 549,
    width: 410,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 92,
    paddingBottom: 66,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    width: 343,
    color: "#212121",
    padding: 16,
    textAlign: "left",
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 1.16,
    letterSpacing: 0.01,
    color: "#212121",
    textTransform: "uppercase",
    textAlign: "center",
  },
  form: {
    // marginHorizontal: 16,
  },
  button: {
    width: 343,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    borderRadius: 100,
    // backgroundColor: "#FF6C00",
    // ...Platform.select({
    //   ios: { backgroundColor: "transparent" },
    //   android: { backgroundColor: "#FF6C00" },
    // }),
    backgroundColor: Platform.OS === "ios" ? "#FF6C00" : "#FF6C00",
    // borderWidth: 1,
    // borderColor: Platform.OS === "ios" ? "transparenr" : "transparenr",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 1.18,
    color: "#FFFFFF",
  },
  avatarContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -150,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  buttonContainer: {
    position: "absolute",
    top: -70,
    right: 107,
  },
});
