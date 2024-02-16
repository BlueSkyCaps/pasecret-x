import {FlatList, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '@/components/Themed';
import {Icon, ListItem} from "@rneui/themed";
import {Button} from "@rneui/base";
import Colors from "@/constants/Colors";
import {AntDesign, Feather } from "@expo/vector-icons";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";

// tabs默认第一页选项卡 显示的是归类夹列表
export default function TabIndexScreen() {
    const colorScheme = useColorScheme();
    const {t} = useTranslation();
    const {loadedItemsState} = useContext(LoadedItemsStateContext) as {
        loadedItemsState: storagedata.LoadedItems;
    }
    const categoryDelClicked = (id:string) => {

    }
    const categoryEditClicked = (id:string) => {

    }
    const renderItem = ({item}:{item:storagedata.Category}) => {
        return <ListItem.Swipeable
            key={item.id}
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
                    onPress={()=> categoryDelClicked(item.id)}
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
                    icon={<Feather name="edit" size={24} color={Colors[colorScheme ?? 'light'].text} />}
                    onPress={()=>{categoryEditClicked(item.id)}}
                />
            )}
        >
            <AntDesign name="folderopen" size={24} color={Colors[colorScheme ?? 'light'].text} style={{margin:20}}/>
            <ListItem.Content style={{backgroundColor:Colors[colorScheme ?? 'light'].background}}>
                <ListItem.Title style={{color:Colors[colorScheme ?? 'light'].text, fontSize:20}}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{color:Colors[colorScheme ?? 'light'].text}}>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem.Swipeable>

    }
    return (
        <FlatList data={loadedItemsState.category}  renderItem={renderItem}/>
    );
}

const styles = StyleSheet.create({
});
