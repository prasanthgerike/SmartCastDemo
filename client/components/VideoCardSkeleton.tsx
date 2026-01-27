import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

import { Colors, Spacing, BorderRadius } from "@/constants/theme";

const { width: screenWidth } = Dimensions.get("window");
const cardWidth = screenWidth - Spacing.lg * 2;
const thumbnailHeight = (cardWidth * 9) / 16;

export function VideoCardSkeleton() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.thumbnail, { opacity }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />
        <Animated.View style={[styles.descriptionSkeleton, { opacity }]} />
        <View style={styles.metadataRow}>
          <Animated.View style={[styles.metadataSkeleton, { opacity }]} />
          <Animated.View
            style={[styles.metadataSkeleton, styles.metadataShort, { opacity }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.backgroundDefault,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    marginBottom: Spacing.lg,
  },
  thumbnail: {
    width: "100%",
    height: thumbnailHeight,
    backgroundColor: Colors.dark.backgroundSecondary,
  },
  content: {
    padding: Spacing.lg,
  },
  titleSkeleton: {
    height: 22,
    width: "80%",
    backgroundColor: Colors.dark.backgroundSecondary,
    borderRadius: BorderRadius.xs,
  },
  descriptionSkeleton: {
    height: 16,
    width: "100%",
    backgroundColor: Colors.dark.backgroundSecondary,
    borderRadius: BorderRadius.xs,
    marginTop: Spacing.sm,
  },
  metadataRow: {
    flexDirection: "row",
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  metadataSkeleton: {
    height: 14,
    width: 80,
    backgroundColor: Colors.dark.backgroundSecondary,
    borderRadius: BorderRadius.xs,
  },
  metadataShort: {
    width: 50,
  },
});
