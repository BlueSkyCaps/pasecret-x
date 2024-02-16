import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import {Link} from "expo-router";
import {useContext, useEffect, useState} from "react";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {isNullOrWhitespace} from "@/components/utils";
import {useTranslation} from "react-i18next";
import SetLockScreen from "@/app/(setting)/setLock";
import LockScreen from "@/app/lock";

export default function IndexScreen() {
  const { t, i18n } = useTranslation();
  const {loadedItemsState,setLoadedItemsState} = useContext(LoadedItemsStateContext) as {
      loadedItemsState: storagedata.LoadedItems;
      setLoadedItemsState: React.Dispatch<React.SetStateAction<storagedata.LoadedItems>>;
  }
    useEffect(() => {
        console.log("加载语言",loadedItemsState.preferences.localLang)
        i18n.changeLanguage(loadedItemsState.preferences.localLang)
    }, []);

  if (isNullOrWhitespace(i18n.language)){
      return null
  }
  // 渲染非堆栈导航，因此不会有标题栏。相当于在当前页渲染 路由仍处于当前页
  if (isNullOrWhitespace(loadedItemsState.preferences.lockPwd)){
    // 渲染 首次运行未设置启动密码，先设置启动密码
    return <LockScreen/>
      // return <SetLockScreen/>
  }
  // 渲染 解锁界面
  return (
      <LockScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
