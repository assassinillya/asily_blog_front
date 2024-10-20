import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import P5UI from "p5-ui";
import "p5-ui/dist/style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
// highlightjs
import hljs from "highlight.js";
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

import axiosInstance from './axios';

// app.config.globalProperties.$axios = axiosInstance;

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(VMdPreview)
  .use(VueMarkdownEditor)
  .use(P5UI)
  .use(router)
  .mount("#app");
