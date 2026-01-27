import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useVideoPlayer, VideoView } from "expo-video";
import { Feather } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useKeepAwake } from "expo-keep-awake";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/RootStackNavigator";

type VideoPlayerRouteProp = RouteProp<RootStackParamList, "VideoPlayer">;

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoPlayerScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<VideoPlayerRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { video } = route.params;

  useKeepAwake();

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.duration);
  const [isBuffering, setIsBuffering] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);

  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const player = useVideoPlayer(video.videoUrl, (p) => {
    p.loop = false;
    p.play();
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (event) => {
      setIsPlaying(event.isPlaying);
      if (event.isPlaying) {
        setIsBuffering(false);
      }
    });

    const timeSubscription = player.addListener("timeUpdate", (event) => {
      setCurrentTime(event.currentTime);
      if (event.currentLiveDate) {
        setDuration(player.duration);
      }
    });

    return () => {
      subscription.remove();
      timeSubscription.remove();
    };
  }, [player]);

  useEffect(() => {
    ScreenOrientation.unlockAsync();

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  const hideControlsDelayed = useCallback(() => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        Animated.timing(controlsOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setControlsVisible(false));
      }
    }, 3000);
  }, [isPlaying, controlsOpacity]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    hideControlsDelayed();
  }, [controlsOpacity, hideControlsDelayed]);

  const handleScreenPress = () => {
    if (controlsVisible) {
      Animated.timing(controlsOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setControlsVisible(false));
    } else {
      showControls();
    }
  };

  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    showControls();
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleSeek = (direction: "forward" | "backward") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const seekAmount = direction === "forward" ? 10 : -10;
    player.seekBy(seekAmount);
    showControls();
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.container}>
      <Pressable style={styles.videoContainer} onPress={handleScreenPress}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
        />

        {isBuffering ? (
          <View style={styles.bufferingOverlay}>
            <ActivityIndicator size="large" color={Colors.dark.accent} />
          </View>
        ) : null}

        <Animated.View
          style={[styles.controlsOverlay, { opacity: controlsOpacity }]}
          pointerEvents={controlsVisible ? "auto" : "none"}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent", "rgba(0,0,0,0.7)"]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={[styles.topBar, { paddingTop: insets.top + Spacing.sm }]}>
            <Pressable
              onPress={handleBack}
              style={styles.backButton}
              hitSlop={20}
            >
              <Feather name="chevron-left" size={28} color={Colors.dark.text} />
            </Pressable>
            <View style={styles.topBarSpacer} />
            <Pressable style={styles.airplayButton} hitSlop={20}>
              <Feather name="airplay" size={22} color={Colors.dark.text} />
            </Pressable>
          </View>

          <View style={styles.centerControls}>
            <Pressable
              onPress={() => handleSeek("backward")}
              style={styles.seekButton}
              hitSlop={20}
            >
              <Feather name="rotate-ccw" size={28} color={Colors.dark.text} />
              <ThemedText type="caption" style={styles.seekLabel}>
                10
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={handlePlayPause}
              style={styles.playPauseButton}
              hitSlop={20}
            >
              <Feather
                name={isPlaying ? "pause" : "play"}
                size={40}
                color={Colors.dark.text}
              />
            </Pressable>

            <Pressable
              onPress={() => handleSeek("forward")}
              style={styles.seekButton}
              hitSlop={20}
            >
              <Feather name="rotate-cw" size={28} color={Colors.dark.text} />
              <ThemedText type="caption" style={styles.seekLabel}>
                10
              </ThemedText>
            </Pressable>
          </View>

          <View
            style={[
              styles.bottomBar,
              { paddingBottom: insets.bottom + Spacing.sm },
            ]}
          >
            <ThemedText type="caption" style={styles.timeText}>
              {formatTime(currentTime)}
            </ThemedText>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progress * 100}%` },
                  ]}
                />
              </View>
            </View>
            <ThemedText type="caption" style={styles.timeText}>
              {formatTime(duration)}
            </ThemedText>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  bufferingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarSpacer: {
    flex: 1,
  },
  airplayButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  centerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing["5xl"],
  },
  seekButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  seekLabel: {
    color: Colors.dark.text,
    position: "absolute",
    bottom: 6,
    fontSize: 10,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 107, 53, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  timeText: {
    color: Colors.dark.text,
    minWidth: 50,
  },
  progressBarContainer: {
    flex: 1,
    height: 24,
    justifyContent: "center",
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
});
