<template>
  <div class="content">
    <div class="center">
      <div class="msg">
        <comments v-if="blogId" :blogId="blogId" />
      </div>
    </div>
  </div>
</template>


<script>
import Comments from '../components/comments.vue';
export default {
  components: {
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
  z-index: 1;
  padding: 0 24px 24px;
  text-align: center;
}

.center {
  max-width: 980px;
  margin: 0 auto;
}

.msg {
  z-index: 1;
  width: 100%;
}
</style>
