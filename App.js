import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Apploading from "expo-app-loading";
import * as Font from "expo-font";
import { useRoute } from "./router";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute({});
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
    <View style={styles.container}>
      <NavigationContainer>{routing}</NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
