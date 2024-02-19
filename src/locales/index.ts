import { createI18n } from "vue-i18n";

import locZhCn from "./zh-CN";
import locEn from "./en";
// import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// import en from "element-plus/dist/locale/en.mjs";

const messages = {
  zhHans: {
    ...locZhCn,
    // ...(zhCn as any),
  },
  en: {
    ...locEn,
    // ...(en as any),
  },
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "zhHans",
  fallbackLocale: "zhHans",
  messages,
});

export default i18n;

export const $t = i18n.global.t;

export function setLocale(locale: "zhHans" | "en") {
  i18n.global.locale.value = locale;
}

export function getLocale() {
  return i18n.global.locale.value;
}
