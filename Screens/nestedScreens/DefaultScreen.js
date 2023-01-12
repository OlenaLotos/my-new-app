import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";
// import { Feather } from "@expo/vector-icons";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 8,
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Image style={styles.image} source={{ uri: item.photo }} />
          </View>
        )}
      ></FlatList>
      <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to comments"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    marginHorizontal: 16,
    height: 240,

    // marginTop: 32,
  },
});
