import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Redirect, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from "react-native";
import { useInit} from "@/components/Init";
import {storagedata} from "@/components/Models";
import {_LoadedItems} from "@/components/StoreData";
import {isNullOrEmpty} from "@/components/utils";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
// 呈现启动画面 你可以选择等待资源加载完毕后隐藏 启动画面在app.json中设置
SplashScreen.preventAutoHideAsync();

// 创建全局数据更新访问上下文
export const LoadedItemsStateContext =
    createContext<{loadedItemsState: any, setLoadedItemsState: any}>({loadedItemsState:null, setLoadedItemsState: null});

export default function RootLayout() {
  // 初始化完成获取到的数据，后续组件通过context访问更新
  const [loadedItemsState,setLoadedItemsState]
      = useState<storagedata.LoadedItems | any>();
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
    // 初始化化数据文件完毕时 inited为true
    if (loaded && inited){
      SplashScreen.hideAsync();
      setLoadedItemsState(_LoadedItems)
    }
  }, [loaded, inited]);

  if (!(loaded && inited))
  {
    return null;
  }

  // setLoadedItemsState没那么快更新值，加个判断
  if (isNullOrEmpty(loadedItemsState))
  {
    return null;
  }

  console.log("RootLayout render")
  return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <LoadedItemsStateContext.Provider value={{loadedItemsState, setLoadedItemsState}}>
            {/*配置app堆栈屏幕活动*/}
            <Stack>
              {/*注意 必须设置一个index命名的索引组件，expo才能找到，否则报路由找不到错误 注意不要//注释 initialRouteName没效果*/}
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="search" options={{ headerShown: true }} />
              {/*选项卡*/}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/*app 此处不设置是否显示顶部标题栏，由其内部具体自主设置 */}
              <Stack.Screen name="(category)" options={{ headerShown: false }} />
              <Stack.Screen name="(setting)/setLock" options={{ headerShown: false }} />
            </Stack>
          </LoadedItemsStateContext.Provider>
        </ThemeProvider>
  );
}


