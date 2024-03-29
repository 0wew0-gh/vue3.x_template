import { $t, setLocale } from "@/locales";

export default {
  data() {
    return {
      maxDownLoadCount: 2,
      loginDialogVisible: false,
      //表单验证
      rules: {
        name: [
          {
            required: true,
            message: $t("form.rules.name"),
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: $t("form.rules.len"),
            trigger: "blur",
          },
        ],
        pw: [
          {
            required: true,
            message: $t("form.rules.pw"),
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: $t("form.rules.len"),
            trigger: "blur",
          },
        ],
      },
      loginFrom: {
        name: "",
        pw: "",
      },
      formLabelWidth: 80,
      //初始值设置
      colors: [
        { color: "#f56c6c", percentage: 30 },
        { color: "#FF7F50", percentage: 60 },
        { color: "#E6A23C", percentage: 80 },
        { color: "#81CC5C", percentage: 100 },
      ],
    };
  },
  methods: {
    getDefaultTime(): Date[] {
      return [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)];
    },
    getShortcuts(): any {
      return [
        {
          text: "Last week",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "Last month",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "Last 3 months",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ];
    },
    setloc(routeloc: string) {
      let loc: string = routeloc;
      if (loc == "zh" || loc == "zhHans" || loc == "zh_cn" || loc == "zh_CN") {
        loc = "zhHans";
      }
      if (loc != "en" && loc != "zhHans") {
        loc = "zhHans";
      }
      localStorage.setItem("lang", loc);
      setLocale(loc as "zhHans" | "en");
    },

    setDark(isdark = false) {
      const html = document.getElementsByTagName("html");
      if (isdark) {
        html[0].className = "dark";
      } else {
        html[0].className = "";
      }
    },

    showTopMenu() {
      const vContainer: HTMLDivElement | null = document.getElementById(
        "view-container"
      ) as HTMLDivElement | null;
      const fixedMenu: HTMLDivElement = document.getElementById(
        "fixed-menu-bar"
      ) as HTMLDivElement;
      if (vContainer != null) {
        vContainer.addEventListener("scroll", scrollHandler);
      }
      function scrollHandler() {
        if (vContainer != null && vContainer.scrollTop < 200) {
          fixedMenu.style.opacity = "0";
          fixedMenu.style.display = "none";
        } else if (vContainer != null && vContainer.scrollTop < 500) {
          fixedMenu.style.display = "block";
          fixedMenu.style.opacity = (
            (vContainer.scrollTop - 200) /
            300
          ).toString();
        } else {
          fixedMenu.style.display = "block";
          fixedMenu.style.opacity = "1";
        }
      }
    },

    displayMenu() {
      const vContainer: HTMLDivElement | null = document.getElementById(
        "view-container"
      ) as HTMLDivElement | null;
      const fixedMenu: HTMLDivElement = document.getElementById(
        "fixed-menu-bar"
      ) as HTMLDivElement;
      if (vContainer != null) {
        vContainer.removeEventListener("scroll", scrollremoveHandler);
      }
      function scrollremoveHandler() {
        fixedMenu.style.opacity = "0";
        fixedMenu.style.display = "none";
      }
    },

    cancelDL(store: any, fhash: string) {
      for (let i = 0; i < store.state.progressList.length; i++) {
        const e = store.state.progressList[i];
        if (this.isundefined(e)) {
          continue;
        }
        if (
          Object.prototype.hasOwnProperty.call(e, "hash") &&
          e.hash == fhash
        ) {
          e.canT.cancel("cancel");
          break;
        }
      }
    },

    isundefined(str: any): boolean {
      if (str == null || str == undefined || str == "undefined") {
        return true;
      }
      return false;
    },

    listIsHave(list: any[], lkey: string, item: any, ikey: string): boolean {
      let ish = false;
      list.forEach((e) => {
        if (e[lkey] == item[ikey]) {
          ish = true;
        }
      });
      return ish;
    },
  },
};
