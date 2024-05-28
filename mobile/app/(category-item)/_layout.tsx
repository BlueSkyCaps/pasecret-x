import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Link, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {View, useColorScheme, Pressable, StyleSheet} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function CategoryLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();

  return (
        <Stack>
          {/*  该堆栈导航 由(tabs)/index也就是归类夹列表页导航出现*/}
          <Stack.Screen name="index" options={{
              headerShown: true,
              // 设置标签页顶栏 右部分显示的样式
              headerRight: () => (
                  <View style={styles.container}>
                      <Link href="/(category-item)/add" asChild>
                          <Pressable>
                              {({ pressed }) => (
                                  <Ionicons name="add-circle-outline" size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>
                              )}
                          </Pressable>
                      </Link>
                  </View>
              ),
          }} />
          <Stack.Screen name="add" options={{ headerShown: true }} />
          <Stack.Screen name="edit" options={{ headerShown: true }} />
        </Stack>
  );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // 水平排列
        justifyContent: 'center', // 在水平方向居中
        alignItems: 'center', // 在垂直方向居中
    },
});