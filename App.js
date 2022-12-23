import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./images/backgraund.png")}
      >
        {/* <View style={styles.background}> */}
        <Text style={styles.header}>Реєстрація </Text>
        <View style={styles.form}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <Button
            style={styles.button}
            title="Зареєструватись"
            color={"#FF6C00"}
          />
          <StatusBar style="auto" />
          {/* </View> */}
        </View>
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
    textAlign: "left",
    padding: 16,
    marginBottom: 16,
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
    // color: "#FFFFFF",
    borderRadius: 100,
    height: 100,
  },
});
