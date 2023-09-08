// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  // data
  state: () => ({
    currentLanguage: "zhHans",
  }),
  // computed
  getters: {},
  // methods
  actions: {
    setCurrentLanguage(lang: string) {
      console.log(" ===== setCurrentLanguage ===== ");
      this.currentLanguage = lang;
      sessionStorage.setItem("langage", lang);
    }
  },
});
