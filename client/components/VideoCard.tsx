import React, { useRef } from "react";
import { View, StyleSheet, Pressable, Dimensions, Animated } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import type { Video } from "@/types/video";

interface VideoCardProps {
  video: Video;
  onPress: () => void;
}

const { width: screenWidth } = Dimensions.get("window");
const cardWidth = screenWidth - Spacing.lg * 2;
const thumbnailHeight = (cardWidth * 9) / 16;

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function VideoCard({ video, onPress }: VideoCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}
        testID={`video-card-${video.id}`}
      >
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: video.thumbnailUrl }}
            style={styles.thumbnail}
            contentFit="cover"
            placeholder={require("../../assets/images/placeholder-thumbnail.png")}
            transition={300}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.thumbnailGradient}
          />
          <View style={styles.durationBadge}>
            <ThemedText type="caption" style={styles.durationText}>
              {formatDuration(video.duration)}
            </ThemedText>
          </View>
          <View style={styles.playIconOverlay}>
            <View style={styles.playIconCircle}>
              <Feather name="play" size={24} color={Colors.dark.text} />
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <ThemedText type="h4" numberOfLines={2} style={styles.title}>
              {video.title}
            </ThemedText>
            <Feather
              name="chevron-right"
              size={20}
              color={Colors.dark.textSecondary}
            />
          </View>
          <ThemedText
            type="small"
            numberOfLines={2}
            style={styles.description}
          >
            {video.description}
          </ThemedText>
          <View style={styles.metadataRow}>
            <ThemedText type="caption" style={styles.metadata}>
              {formatDate(video.uploadDate)}
            </ThemedText>
            <View style={styles.metadataDot} />
            <ThemedText type="caption" style={styles.metadata}>
              {video.resolution}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.backgroundDefault,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    marginBottom: Spacing.lg,
  },
  thumbnailContainer: {
    width: "100%",
    height: thumbnailHeight,
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: thumbnailHeight * 0.5,
  },
  durationBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.dark.overlay,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  durationText: {
    color: Colors.dark.text,
  },
  playIconOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  playIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 107, 53, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 3,
  },
  content: {
    padding: Spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    color: Colors.dark.text,
  },
  description: {
    color: Colors.dark.textSecondary,
    marginTop: Spacing.sm,
  },
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.md,
  },
  metadata: {
    color: Colors.dark.textTertiary,
  },
  metadataDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.dark.textTertiary,
    marginHorizontal: Spacing.sm,
  },
});
