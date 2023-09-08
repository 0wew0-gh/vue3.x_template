import { createI18n } from "vue-i18n";
// const { createI18n } = require("vue-i18n");
// import elementlangZhCn from "element-plus/lib/locale/lang/zhHans";
// import elementlangEn from "element-plus/lib/locale/lang/en";
import locZhCn from "./zh-CN";
import locEn from "./en";

const messages = {
  "zhHans": {
    ...locZhCn,
    // ...elementlangZhCn,
  },
  en: {
    ...locEn,
    // ...elementlangEn,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: sessionStorage.getItem("lang") || "zhHans",
  messages,
});

export default i18n;

