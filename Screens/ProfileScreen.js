import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import { authSignOutUser } from "../redux/auth/authOperations";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <Octicons name="sign-out" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
