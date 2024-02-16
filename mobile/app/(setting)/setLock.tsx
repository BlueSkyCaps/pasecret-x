import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {Link} from "expo-router";

export default function SetLockScreen() {
    const { t, i18n } = useTranslation();
    const {loadedItemsState,setLoadedItemsState} = useContext(LoadedItemsStateContext) as {
        loadedItemsState: storagedata.LoadedItems;
        setLoadedItemsState: React.Dispatch<React.SetStateAction<storagedata.LoadedItems>>;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("lockPwdSetTipShowConfirm")}</Text>
            <Text style={styles.title}>{loadedItemsState.category[0].name}</Text>
            <Link href="/search">to</Link>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
        fontSize: 14,
        margin: 20,
        fontWeight: "normal",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
