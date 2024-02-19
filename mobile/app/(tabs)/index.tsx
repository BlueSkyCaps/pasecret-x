import {Alert, FlatList, Platform, Pressable, ScrollView, StyleSheet, ToastAndroid, useColorScheme} from 'react-native';

import {Icon, ListItem} from "@rneui/themed";
import {Button} from "@rneui/base";
import Colors from "@/constants/Colors";
import {AntDesign, Feather } from "@expo/vector-icons";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {router, useNavigation} from "expo-router";
import {_LoadedItems_Save} from "@/components/StoreData";
import {createAndWriteResourceD} from "@/components/Init";

// tabs默认第一页选项卡 显示的是归类夹列表
export default function TabIndexScreen() {
    const colorScheme = useColorScheme();
    const {t} = useTranslation();
    const {loadedItemsState} = useContext(LoadedItemsStateContext) as {
        loadedItemsState: storagedata.LoadedItems;
    }
    const categoryDelClicked = (id:string, name :string) => {
        // 提示内置归类夹不可删除
        if (parseInt(id)<=4){
            // 安卓 用toast提示，简单明了，ios用alert
            if (Platform.OS==='android'){
                ToastAndroid.showWithGravity(t("categoryCanNotDelTips"), ToastAndroid.SHORT, ToastAndroid.CENTER);
                return;
            }
            Alert.alert(t("dialogShowInformationTitle"), t("categoryCanNotDelTips"), [
                {
                    text: t("directoryInfoOkText"),
                }]
            );
        }
        // 显示确认删除对话框
        Alert.alert(t("dialogShowInformationTitle"), t("categoryDelConfirmMsg", {"name":name}), [
            {
                text: t("categoryDelConfirmCancelText"),
                style: 'cancel',
            },
            {text: t("categoryDelConfirmCancelText"),
                onPress: () =>{
                    // 删除归类夹及其所有密码项 并更新至本地存储
                    let deep_tmp_category:storagedata.Category[] = JSON.parse(JSON.stringify(_LoadedItems_Save.category));
                    let deep_tmp_data:storagedata.Data[] = JSON.parse(JSON.stringify(_LoadedItems_Save.data));
                    _LoadedItems_Save.category=_LoadedItems_Save.category.filter((item)=>item.id!==id)
                    _LoadedItems_Save.data = _LoadedItems_Save.data.filter((item)=>item.category_id!==id)
                    try {
                        createAndWriteResourceD(JSON.stringify(_LoadedItems_Save)).then(r => {
                            // 回调执行表示保存成功，同步执行渲染
                            loadedItemsState.category=loadedItemsState.category.filter((item)=>item.id!==id)
                            loadedItemsState.data = loadedItemsState.data.filter((item)=>item.category_id!==id)
                        });
                    }catch (err:any){
                        // 捕获异常，回滚全局数据
                        _LoadedItems_Save.category = deep_tmp_category
                        _LoadedItems_Save.data = deep_tmp_data
                        alert(err.message)
                    }
            }},
        ]);


    }
    const categoryEditClicked = (id:string, name:string) => {
        // 提示内置归类夹不可编辑
        if (parseInt(id)<=4){
            if (Platform.OS==='android'){
                ToastAndroid.showWithGravity(t("categoryCanNotEditTips"), ToastAndroid.SHORT, ToastAndroid.CENTER);
                return;
            }
            Alert.alert(t("dialogShowInformationTitle"), t("categoryCanNotEditTips"), [
                {
                    text: t("directoryInfoOkText"),
                    onPress: () => console.log('Ask me later pressed'),
                }]
            );
        }
        // 跳转编辑归类夹页
        router.push({pathname:'/(category)/edit', params:{id:id, name:name}})
    }
    // 点击了某个归类夹，导航到密码项列表页
    const categoryClicked = (id:string,name:string) => {
        // 导航到下一个屏幕，并传递数据
        // !!!注意索引页index命名，需要最后留`/`，而且不能出现`index`，`/`等于`index`!!!
        router.push({pathname:'/(category-item)/', params:{cid:id, name:name}})
    }

    const renderItem = ({item}:{item:storagedata.Category}) => {
        return (
            <ListItem.Swipeable
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
                            onPress={()=> categoryDelClicked(item.id, item.name)}
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
                            onPress={()=>{categoryEditClicked(item.id,item.name)}}
                        />
                    )}
                >
                <Pressable onPress={()=>{categoryClicked(item.id, item.name)}} style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgba(210, 230, 255, 0.5)'
                            : Colors[colorScheme ?? 'light'].background
                    },
                ]}>
                    <AntDesign name="folderopen" size={24} color={Colors[colorScheme ?? 'light'].text} style={{marginLeft:10, marginRight:10}}/>
                </Pressable>
                <ListItem.Chevron />
                <ListItem.Content style={{backgroundColor:Colors[colorScheme ?? 'light'].background}}>
                    <Pressable onPress={()=>{categoryClicked(item.id, item.name)}} style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgba(210, 230, 255, 0.5)'
                                : Colors[colorScheme ?? 'light'].background
                        },
                    ]}>
                        <ListItem.Title style={{color:Colors[colorScheme ?? 'light'].text, fontSize:20}}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={{color:Colors[colorScheme ?? 'light'].text}}>{item.description}</ListItem.Subtitle>
                    </Pressable>
                </ListItem.Content>
            </ListItem.Swipeable>
        )
    }
    return (
        <FlatList data={loadedItemsState.category}  renderItem={renderItem}/>
    );
}

const styles = StyleSheet.create({
});
