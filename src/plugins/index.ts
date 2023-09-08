/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { createI18n, useI18n } from "vue-i18n";
import pinia from "../store";
import router from "../router";

// 自建的I18n插件
import locZhCn from "@/assets/i18n/zh-CN";
import locEn from "@/assets/i18n/en";

// import elementlangZhCn from "element-plus/lib/locale/lang/zh-cn";
// import elementlangEn from "element-plus/lib/locale/lang/en";
import "element-plus/theme-chalk/index.css";
import "element-plus/theme-chalk/display.css";
// import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// import en from "element-plus/dist/locale/en.mjs";

// Types
import type { App } from "vue";

const messages = {
  zhHans: {
    ...locZhCn,
    // ...zhCn,
  },
  en: {
    ...locEn,
    // ...en,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: sessionStorage.getItem("lang") || "zhHans",
  messages,
});
const vuetify = createVuetify({
  components: {},
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify).use(pinia).use(router).use(i18n)
  // .use(ElementPlus, {
  //   locale:i18n.? zhCn:en,
  // });
}
