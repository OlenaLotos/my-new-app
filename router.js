import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

import { Feather } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native-web";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ title: "Start screen" }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      {/* <View style={styles.button}> */}
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      {/* </View> */}
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    paddingVertical: 13,
  },
});
