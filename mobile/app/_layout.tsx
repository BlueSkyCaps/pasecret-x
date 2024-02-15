import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {useColorScheme} from "react-native";
import { useInit} from "@/components/Init";
import {storagedata} from "@/components/Models";
import {_LoadedItems} from "@/components/StoreData";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
// 呈现启动画面 你可以选择等待资源加载完毕后隐藏 启动画面在app.json中设置
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 使用首选配色方案钩子
  const colorScheme = useColorScheme();
  // 异步加载所需字体
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const inited = useInit()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    // 字体加载完毕时 loaded为true
    // 处死化数据文件完毕时 inited为true
    if (loaded && inited){
      SplashScreen.hideAsync();
      console.log(_LoadedItems)
    }
  }, [loaded, inited]);

  if (!loaded)
  {
    return null;
  }

  return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: true }} />
            {/*app 此次不设置是否显示顶部标题栏，由其内部具体自主设置 */}
            <Stack.Screen name="category" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
  );
}


