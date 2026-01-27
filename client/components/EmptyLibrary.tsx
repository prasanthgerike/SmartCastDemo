import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";

const { width: screenWidth } = Dimensions.get("window");

export function EmptyLibrary() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/empty-library.png")}
        style={styles.illustration}
        resizeMode="contain"
      />
      <ThemedText type="h3" style={styles.title}>
        No Videos Available
      </ThemedText>
      <ThemedText type="body" style={styles.description}>
        Your video library is empty. Pull down to refresh and check for new
        content.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing["3xl"],
    paddingVertical: Spacing["5xl"],
  },
  illustration: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    marginBottom: Spacing["2xl"],
    opacity: 0.8,
  },
  title: {
    color: Colors.dark.text,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  description: {
    color: Colors.dark.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
