<template>
  <div class="content">

    <div class="center">
      <div class="info">
        <profile />
      </div>
      <div class="msg">
        <comments v-if="blogId" :blogId="blogId" />
      </div>
    </div>



  </div>

</template>


<script>
import NavTop from '../components/navTop.vue';
import Profile from '../components/profile.vue';
import Comments from '../components/comments.vue';
export default {
  components: {
    NavTop,
    Profile,
    Comments
  },
  data() {
    return {
      blogId: '',
      props:''
    }
  },
  methods: {
    toGithub() {
      window.open('https://github.com')
    },
    toBili() {
      window.open('https://www.bilibili.com')
    }
  },
  created(){
    this.blogId = this.$route.params.blogId;
    console.log(this.blogId)
  },

}
</script>

<style scoped>
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
  /* position: fixed; */
  margin-top: -180px;
  width: 400px;
  display: flex;
  z-index: 1;
}

.msg {
  /* position: fixed; */
  z-index: 1;
  flex: 1;
  width: 400px;

}
</style>