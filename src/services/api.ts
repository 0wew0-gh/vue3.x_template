import axios from "axios";
import { $t } from "@/locales";
import qs from "qs";

import { ElMessage } from "element-plus";
// import { el } from "element-plus/es/locale";
// import router from "@/router";

const api = "//127.0.0.1:20520";

export default {
  methods: {
    login(username: string, password: string) {
      return axios
        .post(
          api + "/login/",
          qs.stringify({
            usr: username,
            pwd: password,
          })
        )
        .then((res: any) => {
          if (res.status == 200) {
            ElMessage({
              message: $t("state.success"),
              type: "success",
            });
          } else {
            ElMessage.error($t("state.error") + res.data.msg);
          }
          console.log(res);
          return res;
        })
        .catch((error: any) => {
          this._errorhandling(error);
        });
    },

    _errorhandling(error: any, isbacklogin = true) {
      let err: string = error.message;
      let code = 0;
      const resp: any | null = error.response;
      let p = "";
      if (resp != null) {
        if (typeof resp.data !== "string") {
          err = error.response.data.msg;
          code = error.response.data.code;
          if (error.response.data.p) {
            p = error.response.data.p;
          }
          if (error.response.data.err) {
            p = error.response.data.err;
          }
        }
      }
      if (isbacklogin && (code == 4000 || code == 3900)) {
        this._backlogin(err);
      } else {
        ElMessage.error(err + (p == "" ? p : "[" + p + "]"));
      }
    },

    _backlogin(notifMsg = "") {
      if (notifMsg != "") {
        // ElNotification({
        //   title: $t("state.error"),
        //   message: notifMsg,
        //   type: "error",
        // });
      }
      sessionStorage.removeItem("exToken");
      // router.push({ name: "login" });
    },
  },
};
