import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '@/components/Themed';
import AddCategoryScreen from "@/app/(category)/add";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {string} from "prop-types";
import {useTranslation} from "react-i18next";
import React, {useContext} from "react";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {Input} from "@rneui/themed";
import {Button} from "@rneui/base";

export default function EditCategoryScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const {cid,name}= useLocalSearchParams<{ cid: string, name:string}>();
  const {t} = useTranslation();
  const {loadedItemsState} = useContext(LoadedItemsStateContext) as {
    loadedItemsState: storagedata.LoadedItems;
  }
  const inputName = React.createRef();
  const inputDescription = React.createRef();

  // 修改当前导航栏的标题
  navigation.setOptions({headerTitle: t("categoryEditWindowTitle")+': '+name});
  return (
    <View style={styles.container}>
      <Input
          placeholder={t("categoryInsetNameLabel")}
          errorStyle={{ color: 'pink' }}
          errorMessage={t("categoryInsetNameLength")}
      />
      <Input
          placeholder={t("categoryInsetDescriptionLabel")}
          errorStyle={{ color: 'pink' }}
          errorMessage={t("categoryInsetDescriptionLength")}
      />
      <Button
          title={t("categoryInsetOkButtonText")}
          buttonStyle={{
            borderColor: 'rgba(78, 116, 289, 1)',
          }}
          type="outline"
          titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});
