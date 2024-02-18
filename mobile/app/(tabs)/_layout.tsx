import React from 'react';
import { Link, Tabs } from 'expo-router';
import {Pressable, StyleSheet, useColorScheme, View} from 'react-native';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons,Feather,Ionicons,AntDesign    } from '@expo/vector-icons';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const colorScheme = useColorScheme();
    return (
    <Tabs
      screenOptions={{
        //  设置tabs标签激活icon显示的激活颜色；拒绝硬编码，可根据主题自动切换
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // 是否显示标签页顶部栏
        headerShown:false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
            // 设置标签页顶栏 标题的样式
            headerTitleStyle:{display:"none"},
            headerShown:true,
            // 是否显示标签页底部标题
            tabBarShowLabel:false,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-edit" size={24} color={color} />,
            // 设置标签页顶栏 右部分显示的样式
            headerRight: () => (
                <View style={styles.container}>
                    <Link href="/(category)/add" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <Ionicons name="add-circle-outline" size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>
                            )}
                        </Pressable>
                    </Link>
                    <Link href="/search" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <AntDesign name="search1" size={23} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 20, opacity: pressed ? 0.5 : 1 }} />
                            )}
                        </Pressable>
                    </Link>
                </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tabSetting"
        options={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // 水平排列
        justifyContent: 'center', // 在水平方向居中
        alignItems: 'center', // 在垂直方向居中
    },
});