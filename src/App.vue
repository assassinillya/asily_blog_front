<template>
  <p5-crowd ref="crowd_dom1" :config="config1" class="crowd-background"></p5-crowd>
  <div class="content">
    <div class="top">
      <nav-top />
    </div>
    <p5-backTop style="z-index: 99;" :right="160" :scroll_height="100"></p5-backTop>
  </div>
  
  <div class="router">
    <router-view></router-view>
  </div>

</template>


<script>
import NavTop from './components/navTop.vue';
import Profile from './components/profile.vue';
import { ref, reactive } from 'vue'
import Comments from './components/comments.vue';
import Blog from './views/blog.vue';
export default {
  components: {
    NavTop,
    Profile,
    Comments,
    Blog,
  },
  data() {
    return {
      crowd_dom1: ref(null), // 定义 DOM 引用
      config1: reactive({
        width: window.innerWidth,
        height: window.innerHeight,
        step: 8
      })
    }
  },
  methods: {
    toGithub() {
      window.open('https://github.com')
    },
    toBili() {
      window.open('https://www.bilibili.com')
    },
    pauseAnimation() {
      this.crowd_dom1.pause(); // 调用暂停方法
    },
    resumeAnimation() {
      this.crowd_dom1.resume(); // 调用继续方法
    }
  }
}
</script>

<style scoped>
.top{
  position: fixed; 
  z-index: 9999;
}

.router{
  /* overflow: hidden; */
  z-index: 1;
}

.crowd-background {
  position: fixed;
  top: 0;
  left: 0;
  /* width: auto; */
  /* 让动画充满整个视口宽度 */
  /* height: auto; */
  /* 让动画充满整个视口高度 */
  z-index: -1;
  /* 确保它在所有内容的下方 */
}

.content {
  position: relative;
  /* 相对定位，确保内容覆盖在动画上 */
  z-index: 1;
  /* 内容层级高于背景 */
  padding: 20px;
  text-align: center;
}

.center {
  display: flex;
  margin: auto;
  margin-top: 70px;
  justify-content: center;
  width: 1300px;
}

.info {
  width: 400px;
  display: flex;
}

.msg {
  flex: 1;
  width: 400px;
}
</style>
