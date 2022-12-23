import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function App() {
  console.log(Platform.OS);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./images/backgraund.png")}
      >
        {/* <View style={styles.background}> */}
        <Text style={styles.header}>Реєстрація </Text>
        <View style={styles.form}>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={styles.input}
              textAlign="left"
              placeholder="Логін"
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={styles.input}
              textAlign="left"
              placeholder="Адреса електронної пошти"
            />
          </View>
          <View style={{ marginBottom: 43 }}>
            <TextInput
              style={styles.input}
              textAlign="left"
              secureTextEntry={true}
              placeholder="Пароль"
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.btnTitle}>Зареєструватись</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
        {/* </View> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "flex-end",
    justifyContent: "center",
  },
  background: {
    backgroundColor: "#FFFFFF",
    // height: 500,
    width: "100%",
    zIndex: 10,
    // borderRadius: 25 25 0 0,
  },
  input: {
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
    // fontFamily: "Roboto",
    // fontStyle: normal,
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 1.16,
    // letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
    textTransform: "uppercase",
    textAlign: "center",
  },
  form: {
    marginHorizontal: 16,
  },
  button: {
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
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#FF6C00",
    // borderWidth: 1,
    // borderColor: Platform.OS === "ios" ? "transparenr" : "transparenr",
  },
  btnTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.18,
    color: "#FFFFFF",
  },
});
