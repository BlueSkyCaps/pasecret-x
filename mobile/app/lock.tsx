import {Platform, Pressable, StyleSheet, useColorScheme} from 'react-native';
import { Text, View } from '@/components/Themed';
import {useTranslation} from "react-i18next";
import React, {useContext, useState} from "react";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {router} from "expo-router";

let addClickedCounter = 0;
let addClickedStr = "";
export default function LockScreen() {
    const colorScheme = useColorScheme();
    const {t} = useTranslation();
    const {loadedItemsState} = useContext(LoadedItemsStateContext) as {
        loadedItemsState: storagedata.LoadedItems;
    }
    const [percent, setPercent] = useState('');

    function numberPressed(number: string) {
        addClickedCounter++
        setPercent('* '.repeat(addClickedCounter))
        addClickedStr += number;
        if (addClickedCounter >= 6) {
            if (addClickedStr === "123456") {
                // 使用replace替换当前堆栈导航页，而不是push往后追加，tabs就是首页，后退即退出
                router.replace("/(tabs)/tabIndex")
                // end ignore all logic
            } else {
                alert("密码错误")
            }
            addClickedCounter = 0
            addClickedStr = "";
            setPercent('')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("lockLabelText")}</Text>
            <Text style={styles.title}>{percent}</Text>
            <View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => numberPressed('1')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-1-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                    <Pressable onPress={() => numberPressed('2')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-2-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                    <Pressable onPress={() => numberPressed('3')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-3-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => numberPressed('4')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-4-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                    <Pressable onPress={() => numberPressed('5')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-5-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                    <Pressable onPress={() => numberPressed('6')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-6-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => numberPressed('7')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-7-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                    <Pressable onPress={() => numberPressed('8')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-8-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                    <Pressable onPress={() => numberPressed('9')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-9-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => numberPressed('0')}>
                        {({pressed}) => (
                            <MaterialCommunityIcons name="numeric-0-circle-outline" size={80}
                                                    color={Colors[colorScheme ?? 'light'].text}
                                                    style={{opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                </View>
            </View>
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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});