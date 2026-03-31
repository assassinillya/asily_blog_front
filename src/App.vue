<template>
  <p5-crowd ref="crowd_dom1" :config="config1" class="crowd-background"></p5-crowd>
  <div class="top">
    <nav-top />
  </div>
  <div class="back-top-wrapper">
    <p5-backTop :right="24" :scroll_height="100"></p5-backTop>
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
    handleResize() {
      this.config1.width = window.innerWidth
      this.config1.height = window.innerHeight
    },
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
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.top{
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
}

.back-top-wrapper {
  position: fixed;
  top: 104px;
  right: 28px;
  z-index: 10001;
}

.router{
  z-index: 1;
  padding-top: 92px;
}

.crowd-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
