import React from "react";
import { moduleName } from "react-native";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "./nestedScreens/DefaultScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="map-pin" size={24} color="black" />
          ),
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
