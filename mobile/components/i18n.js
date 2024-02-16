import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {i18nResources} from "@/constants/InitResource";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: i18nResources,
        // android报错解决：强制执行旧行为，您可以在 i18next init 调用上启用兼容性JSON = 'v3'
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        // 设置默认语言，避免警告弹出。具体语言由后续changeLanguage控制
        lng: "zh",
    });

export default i18n;