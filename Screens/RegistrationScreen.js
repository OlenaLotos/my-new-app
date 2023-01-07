import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
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
import Apploading from "expo-app-loading";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function RegistrationScreen() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      //   Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
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
      <ImageBackground
        style={styles.image}
        source={require("../images/backgraund.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              style={{
                ...styles.container,
                top: isShowKeyboard ? -300 : -128,
                width: dimensions,
                left: dimensions < 500 ? -195 : -368,
              }}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}></View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Image
                    style={styles.photo}
                    source={require("../images/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                style={{ ...styles.input, width: dimensions < 500 ? 343 : 543 }}
                value={state.login}
                placeholder="Логін"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
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
                secureTextEntry={true}
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
                  onPress={keyboardHide}
                  style={styles.button}
                  color={"#fff"}
                  title="Зареєструватись"
                />
              </View>
              <View style={{ padding: 16 }}>
                <Button color={"#1B4371"} title="У вас вже є акаунт? Увійти" />
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
    // bottom: 10,
    // left: 0,
    // height: 610,
    // width: 50,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 92,
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
    width: 25,
    height: 25,
    top: -70,
    left: 47,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    position: "absolute",
    top: -10,
    fontSize: 30,
    color: "#FF6C00",
  },
});

//   return (
//     <TouchableWithoutFeedback onPress={keyboardHide}>
//       <ImageBackground
//         style={styles.image}
//         source={require("../images/backgraund.png")}
//       >
//         <View style={styles.background}>
//           <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//           >
//             <TouchableWithoutFeedback onPress={keyboardHide}>
//               <View
//                 style={{
//                   ...styles.form,
//                   marginBottom: isShowKeyboard ? 32 : 66,
//                   width: dimensions,
//                 }}
//               >
//                 <View style={styles.avatarContainer}>
//                   <View style={styles.avatar}></View>
//                   <TouchableOpacity style={styles.buttonContainer}>
//                     <Image
//                       style={styles.photo}
//                       source={require("../images/add.png")}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 {/* <View style={styles.header}> */}
//                 <Text style={styles.headerTitle}>Реєстрація</Text>
//                 {/* </View> */}

//                 <View style={{ marginBottom: 16 }}>
//                   <TextInput
//                     onFocus={() => setIsShowKeyboard(true)}
//                     style={styles.input}
//                     textAlign="left"
//                     placeholder="Логін"
//                     placeholderTextColor="#BDBDBD"
//                     value={state.login}
//                     onChangeText={(value) =>
//                       setState((prevState) => ({
//                         ...prevState,
//                         login: value,
//                       }))
//                     }
//                   />
//                 </View>
//                 <View style={{ marginBottom: 16 }}>
//                   <TextInput
//                     onFocus={() => setIsShowKeyboard(true)}
//                     style={styles.input}
//                     textAlign="left"
//                     placeholder="Адреса електронної пошти"
//                     placeholderTextColor="#BDBDBD"
//                     value={state.email}
//                     onChangeText={(value) =>
//                       setState((prevState) => ({
//                         ...prevState,
//                         email: value,
//                       }))
//                     }
//                   />
//                 </View>
//                 <View style={{ marginBottom: 43 }}>
//                   <TextInput
//                     onFocus={() => setIsShowKeyboard(true)}
//                     style={styles.input}
//                     textAlign="left"
//                     secureTextEntry={true}
//                     placeholder="Пароль"
//                     placeholderTextColor="#BDBDBD"
//                     value={state.password}
//                     onChangeText={(value) =>
//                       setState((prevState) => ({
//                         ...prevState,
//                         password: value,
//                       }))
//                     }
//                   />
//                 </View>
//                 <View style={styles.button}>
//                   <Button
//                     //               // activeOpacity={0.8}
//                     style={styles.button}
//                     onPress={keyboardHide}
//                     title="Зареєструватись"
//                     color={"#fff"}
//                   ></Button>
//                 </View>
//                 <View style={{ padding: 16 }}>
//                   <Button
//                     color={"#1B4371"}
//                     title="У вас вже є акаунт? Увійти"
//                   />
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </KeyboardAvoidingView>
//         </View>
//       </ImageBackground>
//       {/* </View> */}
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//     // justifyContent: "center",
//     alignItems: "center",
//   },
//   background: {
//     position: "absolute",
//     // left: -205,
//     height: 549,
//     width: 410,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     paddingTop: 92,
//     paddingBottom: 66,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   input: {
//     fontFamily: "Roboto-Regular",
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//     backgroundColor: "#F6F6F6",
//     borderRadius: 8,
//     height: 50,
//     width: 343,
//     color: "#212121",
//     padding: 16,
//     textAlign: "left",
//   },
//   //   header: {
//   //     alignItems: "center",
//   //     marginBottom: 33,
//   //   },
//   headerTitle: {
//     fontFamily: "Roboto-Medium",
//     fontSize: 30,
//     lineHeight: 1.16,
//     letterSpacing: 0.01,
//     color: "#212121",
//     textTransform: "uppercase",
//     textAlign: "center",
//   },
//   form: {
//     // marginHorizontal: 16,
//   },
//   button: {
//     width: 343,
//     height: 51,
//     justifyContent: "center",
//     alignItems: "center",
//     color: "#FFFFFF",
//     borderRadius: 100,
//     // backgroundColor: "#FF6C00",
//     // ...Platform.select({
//     //   ios: { backgroundColor: "transparent" },
//     //   android: { backgroundColor: "#FF6C00" },
//     // }),
//     backgroundColor: Platform.OS === "ios" ? "#FF6C00" : "#FF6C00",
//     // borderWidth: 1,
//     // borderColor: Platform.OS === "ios" ? "transparenr" : "transparenr",
//   },
//   btnTitle: {
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     lineHeight: 1.18,
//     color: "#FFFFFF",
//   },
//   avatarContainer: {
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatar: {
//     position: "absolute",
//     top: -150,
//     width: 120,
//     height: 120,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//   },
//   buttonContainer: {
//     position: "absolute",
//     top: -70,
//     right: 107,
//   },
// });
