<template>
  <v-container class="fill-height">
    <v-row align="center" no-gutters style="height: 150px">
      <v-col cols="12" style="text-align: center; padding-bottom: 15px">
        <v-avatar color="surface-variant">
          <v-icon icon="$vuetify"></v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="fromLogin.username" :label="$t('form.name')" />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="fromLogin.password" :label="$t('form.pw')" />
      </v-col>
      <v-col cols="12" style="text-align: center">
        <v-btn color="primary" @click="login">{{ $t("button.login") }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import api from "@/services/api";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const fromLogin = reactive({
      username: "",
      password: "",
    });

    return { fromLogin };
  },
  methods: {
    login() {
      console.log(this.fromLogin);
      api.methods.login(this.fromLogin.username, this.fromLogin.password);
    },
  },
});
</script>
