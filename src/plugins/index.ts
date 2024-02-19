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
import { useI18n } from "vue-i18n";
import i18n from "@/locales";

import pinia from "@/store";
import router from "@/router";

// Types
import type { App } from "vue";

import "element-plus/theme-chalk/index.css";
import "element-plus/theme-chalk/display.css";

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
  app.use(vuetify).use(pinia).use(router).use(i18n);
  // .use(ElementPlus, {
  //   locale:i18n.? zhCn:en,
  // });
}
