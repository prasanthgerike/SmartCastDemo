import React from "react";
import { View, StyleSheet, Pressable, Switch } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

interface SettingsRowProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  type: "toggle" | "navigation" | "info";
  value?: boolean | string;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function SettingsRow({
  icon,
  title,
  subtitle,
  type,
  value,
  onPress,
  onToggle,
  isFirst = false,
  isLast = false,
}: SettingsRowProps) {
  const handlePress = () => {
    if (type === "navigation" && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const handleToggle = (newValue: boolean) => {
    if (onToggle) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onToggle(newValue);
    }
  };

  const content = (
    <View
      style={[
        styles.container,
        isFirst && styles.firstRow,
        isLast && styles.lastRow,
      ]}
    >
      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} color={Colors.dark.accent} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <ThemedText type="body" style={styles.title}>
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText type="small" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
        {type === "toggle" ? (
          <Switch
            value={value as boolean}
            onValueChange={handleToggle}
            trackColor={{
              false: Colors.dark.backgroundTertiary,
              true: Colors.dark.accent,
            }}
            thumbColor={Colors.dark.text}
          />
        ) : null}
        {type === "navigation" ? (
          <View style={styles.navigationContainer}>
            {typeof value === "string" ? (
              <ThemedText type="small" style={styles.valueText}>
                {value}
              </ThemedText>
            ) : null}
            <Feather
              name="chevron-right"
              size={20}
              color={Colors.dark.textTertiary}
            />
          </View>
        ) : null}
        {type === "info" && typeof value === "string" ? (
          <ThemedText type="small" style={styles.infoText}>
            {value}
          </ThemedText>
        ) : null}
      </View>
      {!isLast ? <View style={styles.divider} /> : null}
    </View>
  );

  if (type === "navigation") {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.backgroundDefault,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    minHeight: 60,
  },
  firstRow: {
    borderTopLeftRadius: BorderRadius.sm,
    borderTopRightRadius: BorderRadius.sm,
  },
  lastRow: {
    borderBottomLeftRadius: BorderRadius.sm,
    borderBottomRightRadius: BorderRadius.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.dark.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: Colors.dark.text,
  },
  subtitle: {
    color: Colors.dark.textSecondary,
    marginTop: 2,
  },
  valueText: {
    color: Colors.dark.textSecondary,
    marginRight: Spacing.xs,
  },
  infoText: {
    color: Colors.dark.textSecondary,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 60,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.dark.divider,
  },
});
