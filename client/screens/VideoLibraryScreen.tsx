import React, { useCallback } from "react";
import { FlatList, StyleSheet, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { VideoCard } from "@/components/VideoCard";
import { VideoCardSkeleton } from "@/components/VideoCardSkeleton";
import { EmptyLibrary } from "@/components/EmptyLibrary";
import { Colors, Spacing } from "@/constants/theme";
import type { Video } from "@/types/video";
import type { RootStackParamList } from "@/navigation/RootStackNavigator";

export default function VideoLibraryScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  const {
    data: videos,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const handleVideoPress = useCallback(
    (video: Video) => {
      navigation.navigate("VideoPlayer", { video });
    },
    [navigation]
  );

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
    refetch();
  }, [queryClient, refetch]);

  const renderItem = useCallback(
    ({ item }: { item: Video }) => (
      <VideoCard video={item} onPress={() => handleVideoPress(item)} />
    ),
    [handleVideoPress]
  );

  const renderSkeleton = () => (
    <View>
      <VideoCardSkeleton />
      <VideoCardSkeleton />
      <VideoCardSkeleton />
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return renderSkeleton();
    }
    return <EmptyLibrary />;
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xl,
        },
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      data={videos || []}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          tintColor={Colors.dark.accent}
          colors={[Colors.dark.accent]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
});
