<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <template v-if="isLogin">
        <Login />
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ $t("page.root") }}
      </v-toolbar-title>
      {{ store.currentLanguage }}
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            {{ $t("language") }}:{{ $t("loc") }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItem"
            :key="index"
            :value="index"
            @click="$i18n.locale = item.value"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <el-config-provider
        :locale="$i18n.locale == 'zhHans' ? elloczh : ellocen"
      >
        <HelloWorld />
      </el-config-provider>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/LoginPage.vue";
import { ref } from "vue";
import { useAppStore } from "@/store/app";

import elzh from "element-plus/dist/locale/zh-cn.mjs";
import elen from "element-plus/dist/locale/en.mjs";

const elloczh = ref(elzh);
const ellocen = ref(elen);

const store = useAppStore();
const drawer = ref(false);
const isLogin = ref(false);
const menuItem = ref([
  { title: "English", value: "en" },
  { title: "中文", value: "zhHans" },
]);

store.currentLanguage = sessionStorage.getItem("langage") || "zhHans";
// interface locItem {
//   title: string;
//   value: string;
// }
const token = sessionStorage.getItem("token");
console.log("token", token);
if (token == null || token == "" || token == undefined) {
  drawer.value = true;
  isLogin.value = true;
}
</script>
