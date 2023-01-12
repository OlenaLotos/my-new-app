import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: "",
          longitude: "",
          latitudeDelta: "0.1",
          longitudeDelta: "0.1",
        }}
      >
        <Marker coordinate={{ latitude: "", longitude: "" }} title="my photo" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
