<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div>{{ $t("loc") }}</div>
      <v-btn variant="outlined" @click="increment(2)">
        {{ object.name }}-{{ state.count }}
      </v-btn>
      <p>Has published books:</p>
      <span>{{ author.books.length > 0 ? "Yes" : "No" }}</span>
      <span>{{ publishedBooksMessage }}</span>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="firstName" label="First name" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="lastName" label="Last name" />
        </v-col>
      </v-row>
      <p :class="[state.count > 10 ? activeClass : '', errorClass]">
        {{ fullName }}
      </p>
      <el-date-picker
        v-model="picker"
        type="datetimerange"
        :shortcuts="utils.methods.getShortcuts()"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD HH:mm"
        value-format="YYYY-MM-DD HH:mm"
        :default-time="utils.methods.getDefaultTime()"
      />
      <p>
        <v-btn variant="outlined" @click="console.log(picker)">
          Date Picker
        </v-btn>
      </p>
      <Editor v-model="editorData" />
      <div class="sizedbox"></div>
      <v-btn variant="outlined" @click="showEditorData()"> Editor </v-btn>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { ref, reactive, nextTick, computed, defineComponent } from "vue";
import Editor from "@/components/editor.vue";
import utils from "@/services/utils";

export default defineComponent({
  name: "HelloWorld",
  components: {},
  setup() {
    let fileMap: any = {};

    const picker = ref([new Date(), new Date()]);

    const object = ref({ count: 0, name: "none" });
    const state = reactive({ count: 0 });

    const otherCount = ref(2);
    console.log("otherCount.value", otherCount.value);
    state.count = otherCount.value;
    console.log("state.count", state.count);
    state.count += 1;
    otherCount.value += 2;
    console.log(
      "state.count",
      state.count,
      "otherCount.value",
      otherCount.value
    );
    // computed 依赖其他响应式对象的计算属性
    // 如果计算属性依赖的响应式对象发生改变，则计算属性会重新计算，否则不会重新计算
    // 避免直接修改计算属性值
    const author = reactive({
      name: "John Doe",
      books: [
        "Vue 2 - Advanced Guide",
        "Vue 3 - Basic Guide",
        "Vue 4 - The Mystery",
      ],
    });
    // 一个计算属性 ref
    const publishedBooksMessage = computed(() => {
      return author.books.length > 0 ? "Yes" : "No";
    });

    const firstName = ref("John");
    const lastName = ref("Doe");

    const fullName = computed({
      // getter
      get() {
        return firstName.value + " " + lastName.value;
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [firstName.value, lastName.value] = newValue.split(" ");
      },
    });

    const activeClass = ref("active");
    const errorClass = ref("text-danger");

    const editorData = ref(
      '<table><tbody><tr><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p></p></th></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p>dsa</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>das</p></td></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p>asf</p></td></tr></tbody></table><p>Example Text 2</p><p>Or add completely custom input rules. We added a custom extension here that replaces smilies like <code>:-D</code>, <code><3</code> or <code>>:P</code> with emojis. Try it out:</p><p></p><p>You can also teach the editor new things. For example to recognize hex colors and add a color swatch on the fly: #FFF, #0D0D0D, #616161, #A975FF, #FB5151, #FD9170, #FFCB6B, #68CEF8, #80cbc4, #9DEF8F</p>'
    );
    return {
      fileMap,
      editorData,
      state,
      object,
      author,
      publishedBooksMessage,
      firstName,
      lastName,
      fullName,
      activeClass,
      errorClass,
      picker,
      utils,
    };
  },
  methods: {
    async showEditorData() {
      this.fileMap = {};
      const val = this.editorData;
      const parser = new DOMParser();
      const doc = parser.parseFromString(val, "text/html");
      const imgs = doc.getElementsByTagName("img");
      await this.handleElements(imgs);
      const videos = doc.getElementsByTagName("video");
      await this.handleElements(videos);
      const audios = doc.getElementsByTagName("audio");
      await this.handleElements(audios);
      const sources = doc.getElementsByTagName("source");
      await this.handleElements(sources);

      const serializer = new XMLSerializer();
      const str = serializer.serializeToString(doc);
      console.log(str);
      console.log(this.fileMap);
    },

    async handleElements(
      elements:
        | HTMLCollectionOf<HTMLImageElement>
        | HTMLCollectionOf<HTMLVideoElement>
        | HTMLCollectionOf<HTMLAudioElement>
        | HTMLCollectionOf<HTMLSourceElement>
    ) {
      for (const Ii in elements) {
        if (Object.prototype.hasOwnProperty.call(elements, Ii)) {
          const element = elements[Ii];
          const keys = Object.keys(this.fileMap);
          if (element instanceof HTMLVideoElement) {
            if (element.poster.startsWith("data:")) {
              const fmLen = this.baseToExt(element.poster, keys);
              this.fileMap[fmLen] = element.poster;
              element.poster = fmLen.toString();
              continue;
            }
            const response = await fetch(element.poster);
            const blob = await response.blob();
            const base64 = await this.blobToBase64(blob);
            const fmLen = this.baseToExt(base64, keys);
            this.fileMap[fmLen] = base64;
            element.poster = fmLen.toString();
            continue;
          }
          if (element.src.startsWith("data:")) {
            const fmLen = this.baseToExt(element.src, keys);
            this.fileMap[fmLen] = element.src;
            element.src = fmLen.toString();
            continue;
          }
          const response = await fetch(element.src);
          const blob = await response.blob();
          const base64 = await this.blobToBase64(blob);
          const fmLen = this.baseToExt(base64, keys);
          this.fileMap[fmLen] = base64;
          element.src = fmLen.toString();
        }
      }
    },

    baseToExt(base64: string, keys: string[]): string {
      const tempL = base64.split(";");
      let ext = "";
      if (tempL.length > 1) {
        const tempL2 = tempL[0].split("/");
        if (tempL2.length > 1) {
          ext = tempL2[1];
        }
      }
      return keys.length + "." + ext;
    },

    async blobToBase64(blob: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },

    async increment(i: number) {
      this.state.count += i;
      this.object.count += i;
      this.object.name = "increment" + this.object.count;
      await nextTick(); //状态更改后等待 DOM 更新完成，更改数据后当你想立即使用js操作新的视图的时候需要使用它
      // 现在 DOM 已经更新了
    },
  },
});
</script>

<style scoped>
.active {
  color: red;
}
.text-danger {
  font-size: 20px;
}
.element {
  width: 100%;
  /* height: 100px; */
  border: 1px solid #ccc;
}
.sizedbox {
  width: 100%;
  height: 20px;
}
</style>
