import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";
// import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import * as SplashScreen from "expo-splash-screen";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  // const getAllPosts = async () => {
  //   const q = query(collection(db, "posts"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const posts = [];
  //     querySnapshot.forEach((doc) => {
  //       posts.push({ ...doc.data(), id: doc.id });
  //     });
  //     setPosts(posts);
  //     return posts;
  //   });
  // };

  const getAllPosts = async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  //відмальовуваємо всі пости на сторінці
  useEffect(() => {
    getAllPosts();
  }, []);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await getAllPosts();

  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

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
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="go to map"
                onPress={() =>
                  navigation.navigate("Map", {
                    latitude: item.latitude,
                    longitude: item.longitude,
                  })
                }
              />
              <Button
                title="go to comments"
                onPress={() => navigation.navigate("Comments")}
              />
            </View>
          </View>
        )}
      ></FlatList>
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
