import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Linking, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { SettingsRow } from "@/components/SettingsRow";
import { Colors, Spacing } from "@/constants/theme";
import type { Settings } from "@/types/video";

const SETTINGS_KEY = "@smartcast_settings";
const APP_VERSION = "1.0.0";

const defaultSettings: Settings = {
  autoPlayNext: true,
  qualityPreference: "auto",
};

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const handleAutoPlayToggle = (value: boolean) => {
    saveSettings({ ...settings, autoPlayNext: value });
  };

  const handleOpenGitHub = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const url = "https://github.com";
    if (Platform.OS !== "web") {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error("Failed to open URL:", error);
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xl,
        },
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
    >
      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionHeader}>
          PLAYBACK
        </ThemedText>
        <View style={styles.sectionContent}>
          <SettingsRow
            icon="play-circle"
            title="Auto-Play Next"
            subtitle="Automatically play the next video"
            type="toggle"
            value={settings.autoPlayNext}
            onToggle={handleAutoPlayToggle}
            isFirst
            isLast
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionHeader}>
          DISPLAY
        </ThemedText>
        <View style={styles.sectionContent}>
          <SettingsRow
            icon="moon"
            title="Theme"
            type="info"
            value="Dark"
            isFirst
            isLast
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="caption" style={styles.sectionHeader}>
          ABOUT
        </ThemedText>
        <View style={styles.sectionContent}>
          <SettingsRow
            icon="info"
            title="Version"
            type="info"
            value={APP_VERSION}
            isFirst
          />
          <SettingsRow
            icon="github"
            title="GitHub Repository"
            subtitle="View source code"
            type="navigation"
            onPress={handleOpenGitHub}
            isLast
          />
        </View>
      </View>

      <View style={styles.footerSection}>
        <ThemedText type="caption" style={styles.footerText}>
          SmartCastDemo
        </ThemedText>
        <ThemedText type="caption" style={styles.footerSubtext}>
          A portfolio demonstration of native iOS video streaming
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionHeader: {
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
    letterSpacing: 0.5,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: "hidden",
  },
  footerSection: {
    marginTop: Spacing["2xl"],
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  footerText: {
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
  },
  footerSubtext: {
    color: Colors.dark.textTertiary,
    textAlign: "center",
  },
});
