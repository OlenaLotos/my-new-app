import React, { useState, useEffect } from "react";

import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  //   TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperations";
const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      // Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <ImageBackground
        style={styles.image}
        source={require("../images/backgraund.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View
              style={{
                ...styles.container,
                top: isShowKeyboard ? -240 : -120,
                width: dimensions,
                left: dimensions < 500 ? -190 : -368,
              }}
            >
              <Text style={styles.text}>Увійти</Text>
              <TextInput
                style={{ ...styles.input, width: dimensions < 500 ? 343 : 543 }}
                value={state.email}
                placeholder="Адреса електронної пошти"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, width: dimensions < 500 ? 343 : 543 }}
                value={state.password}
                placeholder="Пароль"
                secureTextEntry={"true"}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <View
                style={{
                  ...styles.button,
                  width: dimensions < 500 ? 343 : 543,
                }}
              >
                <Button
                  onPress={handleSubmit}
                  style={styles.button}
                  color={"#fff"}
                  title="Увійти"
                />
              </View>
              <View style={{ padding: 16 }}>
                <Button
                  onPress={() => navigation.navigate("Registration")}
                  color={"#1B4371"}
                  title="Немає акаунта? Зареєструватись"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 550,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 66,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    fontSize: 30,
    marginBottom: 33,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    paddingVertical: 8,
  },
});
