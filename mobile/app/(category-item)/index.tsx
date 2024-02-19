import {FlatList, Platform, Pressable, StyleSheet, useColorScheme} from 'react-native';

import {router, useLocalSearchParams, useNavigation} from "expo-router";
import {useRoute} from "@react-navigation/core";
import {string} from "prop-types";
import {useTranslation} from "react-i18next";
import React, {useContext} from "react";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {ListItem} from "@rneui/themed";
import Colors from "@/constants/Colors";
import {Button} from "@rneui/base";
import {AntDesign, Feather} from "@expo/vector-icons";

export default function IndexCategoryItems() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const {cid,name}= useLocalSearchParams<{ cid: string, name:string}>();
  const {t} = useTranslation();
  const {loadedItemsState} = useContext(LoadedItemsStateContext) as {
    loadedItemsState: storagedata.LoadedItems;
  }
  const items = loadedItemsState.data.filter(item => item.category_id === cid);
  // 修改当前导航栏的标题
  navigation.setOptions({headerTitle: name});

    function itemDelClicked(id: string, cid: string) {
        alert('del')
    }

    function itemEditClicked(id: string, cid: string) {
        alert('ed')
    }

    function itemCopyClicked(id: string, cid: string) {
        alert('copy')
    }

    const renderItem = ({item}:{item:storagedata.Data}) => {
        return (
            <ListItem.Swipeable
                key={item.id}
                bottomDivider={true}
                containerStyle={{backgroundColor:Colors[colorScheme ?? 'light'].background}}
                leftWidth={80}
                rightWidth={90}
                leftContent={() => (
                    <Button
                        containerStyle={{
                          flex: 1,
                          justifyContent: "center",
                          backgroundColor: Colors[colorScheme ?? 'light'].background,
                        }}
                        type="clear"
                        icon={<AntDesign name="delete" size={24} color={Colors[colorScheme ?? 'light'].text} />}
                        onPress={()=> itemDelClicked(item.id, item.category_id)}
                    />
                )}
                rightContent={() => (
                    <Button
                        containerStyle={{
                            flex: 1,
                            justifyContent: "center",
                            backgroundColor: Colors[colorScheme ?? 'light'].background,
                        }}
                        type="clear"
                        icon={<AntDesign name="delete" size={24} color={Colors[colorScheme ?? 'light'].text} />}
                        onPress={()=> itemDelClicked(item.id, item.category_id)}
                    />
                )}
            >
              <Pressable onPress={()=>{itemCopyClicked(item.id, item.category_id)}} style={({ pressed }) => [
                  {
                      backgroundColor: pressed
                          ? 'rgba(210, 230, 255, 0.6)'
                          : Colors[colorScheme ?? 'light'].background
                  },
              ]}>
                <Feather name="copy" size={24} color={Colors[colorScheme ?? 'light'].text} style={{marginLeft:10,marginRight:10}} />
              </Pressable>
              <ListItem.Chevron />
              <Pressable onPress={()=>{itemEditClicked(item.id, item.category_id)}}>
                <ListItem.Content  style={{backgroundColor:Colors[colorScheme ?? 'light'].background, marginLeft:10}}>
                    <Pressable  onPress={()=>{itemEditClicked(item.id, item.category_id)}} style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgba(210, 230, 255, 0.6)'
                                : Colors[colorScheme ?? 'light'].background
                        },
                    ]}>
                        <ListItem.Title style={{color:Colors[colorScheme ?? 'light'].text, fontSize:18}}>{item.name}</ListItem.Title>
                    </Pressable>
                </ListItem.Content>
              </Pressable>
            </ListItem.Swipeable>
        )
  }
  return (
      <FlatList data={items} renderItem={renderItem}/>
  );
}
const styles = StyleSheet.create({
    textContainer: {
        overflow: "hidden",
    },
});
