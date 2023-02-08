import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

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

  const PressLike = async (like, id) => {
    const newLike = like + 1;
    const updatePosts = doc(db, "posts", id);
    await updateDoc(updatePosts, {
      like: newLike,
    });
  };

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
              <Text style={styles.textComment}>{item.comment}</Text>
            </View>
            <View style={styles.linksWrapper}>
              <TouchableOpacity
                style={styles.comment}
                onPress={() =>
                  navigation.navigate("Comments", {
                    id: item.id,
                    photo: item.photo,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#FF6C00" />
                <Text style={styles.text}>
                  {item.commentLength ? item.commentLength : 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => PressLike(item.like, item.id)}
                style={{
                  marginRight: 150,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <EvilIcons name="like" size={32} color="FF6C00" />
                <Text style={styles.text}>{item.like ? item.like : 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", {
                    latitude: item.latitude,
                    longitude: item.longitude,
                  })
                }
              >
                <Text style={{ fontSize: 16 }}>
                  <Feather name="map-pin" size={24} color="bdbdbd" />
                  {item.textLocation}
                </Text>
              </TouchableOpacity>
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
    marginHorizontal: 16,
  },
  image: {
    // marginHorizontal: 16,
    height: 240,

    // marginTop: 32,
  },

  textComment: {
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 11,
  },

  linksWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  comment: {
    top: 0,
    // marginRight: 27,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#212121",
  },
});
