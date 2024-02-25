import {StyleSheet, useColorScheme} from 'react-native';

import {View} from '@/components/Themed';
import {useLocalSearchParams, useNavigation} from "expo-router";
import {useTranslation} from "react-i18next";
import React, {createRef, useContext, useRef, useState} from "react";
import {LoadedItemsStateContext} from "@/app/_layout";
import {storagedata} from "@/components/Models";
import {Input} from "@rneui/themed";
import {Button} from "@rneui/base";
import {isNullOrWhitespace} from "@/components/utils";

export default function EditCategoryScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const {id,name}= useLocalSearchParams<{ id: string, name:string}>();
  const {t} = useTranslation();
  const {loadedItemsState} = useContext(LoadedItemsStateContext) as {
    loadedItemsState: storagedata.LoadedItems;
  }
  const category = loadedItemsState.category.find(c => c.id === id);
  const inputName:any = createRef();
  const inputDescription:any = createRef();

  // 编辑状态下 首次进入编辑 不要先显示错误提示文本
  const [inputNameErrormsg,setInputNameErrormsg]:any = useState();
  const [inputDescriptionErrormsg,setInputDescriptionErrormsg]:any = useState();

  const [passed,setPassed] =useState<{ [_: string]: boolean }>({
      // 编辑状态下 首次进入编辑 这些属性一定是初始化有值的
      inputName: true,
      inputDescription: true,
  });

    // 修改当前导航栏的标题
    navigation.setOptions({headerTitle: t("categoryEditWindowTitle")+': '+name});

    // 验证输入的值满足条件与否
    function rulesHandler(inputRef:any, text:string) {
        console.log(text)
        inputRef.current.value = text;
        switch (inputRef.current.props.labelProps.refName) {
            case  "inputName":
                setInputNameErrormsg('')
                passed.inputName=false
                setPassed(passed)
                if (isNullOrWhitespace(inputRef.current.value)||inputRef.current.value.length>10) {
                    setInputNameErrormsg(t(inputRef.current.props.labelProps.tKey))
                    return;
                }
                passed.inputName=true
                setPassed(passed)
                break;
            case  "inputDescription":
                setInputDescriptionErrormsg('')
                passed.inputDescription=false
                setPassed(passed)
                if (isNullOrWhitespace(inputRef.current.value)||inputRef.current.value.length>24){
                    setInputDescriptionErrormsg(t(inputRef.current.props.labelProps.tKey))
                    return;
                }
                passed.inputDescription=true
                setPassed(passed)
                break;
            default:
                break;
        }
        console.log(inputRef.current.props.errorMessage)
    }

    function submitHandler() {
        console.log(passed)
        // 需要验证规则的 有一个为false 则不通过
        for (let key in passed) {
            if(!passed[key]){
                alert("没通过")
                return
            }
        }
    }

    return (
    <View style={styles.container}>
      <Input
          defaultValue={category?.name}
          ref={inputName}
          labelProps={{refName:"inputName", tKey: "categoryInsetNameLength"}}
          placeholder={t("categoryInsetNameLabel")}
          errorStyle={{ color: 'pink' }}
          errorMessage={inputNameErrormsg}
          onChangeText={(text)=>{rulesHandler(inputName, text)}}
      />
      <Input
          defaultValue={category?.description}
          ref={inputDescription}
          labelProps={{refName:"inputDescription", tKey: "categoryInsetDescriptionLength"}}
          placeholder={t("categoryInsetDescriptionLabel")}
          errorStyle={{ color: 'pink' }}
          errorMessage={inputDescriptionErrormsg}
          onChangeText={(text)=>{rulesHandler(inputDescription, text)}}
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
          onPress={()=>{submitHandler()}}
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
