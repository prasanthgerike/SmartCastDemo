import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { HeaderButton } from "@react-navigation/elements";

import VideoLibraryScreen from "@/screens/VideoLibraryScreen";
import VideoPlayerScreen from "@/screens/VideoPlayerScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { Colors } from "@/constants/theme";
import type { Video } from "@/types/video";

export type RootStackParamList = {
  VideoLibrary: undefined;
  VideoPlayer: { video: Video };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="VideoLibrary"
        component={VideoLibraryScreen}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderTitle title="SmartCast" />,
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.navigate("Settings")}
              pressColor="transparent"
              pressOpacity={0.6}
            >
              <Feather name="settings" size={22} color={Colors.dark.text} />
            </HeaderButton>
          ),
          headerRight: () => (
            <HeaderButton
              onPress={() => {}}
              pressColor="transparent"
              pressOpacity={0.6}
            >
              <Feather name="airplay" size={22} color={Colors.dark.text} />
            </HeaderButton>
          ),
        })}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
    </Stack.Navigator>
  );
}
