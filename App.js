import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Provider store={store}>
        <Main />
      </Provider>
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

// import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";

// import { Provider } from "react-redux";

// import Apploading from "expo-app-loading";
// import * as SplashScreen from "expo-splash-screen";
// import * as Font from "expo-font";
// import { store } from "./redux/store";
// import Main from "./components/Main";

// SplashScreen.preventAutoHideAsync();

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//   });
// };

// export default function App() {
//   const [isReady, setIsReady] = useState(false);

//   if (!isReady) {
//     return (
//       <Apploading
//         startAsync={loadApplication}
//         onFinish={() => setIsReady(true)}
//         onError={console.warn}
//       />
//     );
//   }
//   return (
//     <View style={styles.container}>
//       <Provider store={store}>
//         <Main />
//       </Provider>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: "relative",
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
// });
