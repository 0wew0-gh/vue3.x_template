/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

import api from "./services/api";

const app = createApp(App);

app.config.globalProperties.$api = api;
app.config.errorHandler = function (err: unknown) {
  console.log(" ===== err ===== ");
  console.log(err);
  // ElNotification({
  //   title: i18n.global.t("state.error"),
  //   message: err as string,
  //   type: "error",
  // });
};

registerPlugins(app);

app.mount("#app");
