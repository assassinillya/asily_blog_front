<template>
  <div class="center">
    <div class="info">
      <profile />
    </div>
    <div class="msg">
      <SearchBlog :posts="searchRep" />
    </div>
  </div>
</template>

<script>
import SearchBlog from '@/components/searchBlog.vue';
import profile from '@/components/profile.vue';
import axios from 'axios';

export default {
  data() {
    return {
      searchRep: [],
    };
  },
  components: {
    SearchBlog,
    profile,
  },
  created() {
    // 初始加载数据
    this.fetchData();
  },
  created() {
    this.init()
  },
  watch: {
    // 监听路由变化，重新加载数据
    '$route.query.searchWord': 'fetchData'
  },
  methods: {
    fetchData() {
      const searchWord = this.$route.query.searchWord;
      if (searchWord) {
        axios.post('/blog/getBlogs/search', {
          search: searchWord,
        })
          .then(rep => {
            this.searchRep = rep.data.blogs;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.init()
      }
    },
    init(){
      axios.get(`/blog/getBlogs/${1}/${10000000}`)
        .then(rep=>{
          this.searchRep = rep.data.blogs;
        }).catch(error => {
            console.log(error);
      });
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: flex-start;
  /* 确保内容从左到右排列 */
  align-items: flex-start;
  /* 确保内容在顶部对齐 */
  padding-top: 20px;
}

.info {
  width: 300px;
  /* 设置左边 profile 的宽度 */
  display: flex;
  flex-shrink: 0;
  /* 保证 profile 宽度不被压缩 */
  margin-right: 100px;
  margin-top: -27px;
}

.msg {
  flex: 1;
  /* overflow: auto; */
}
</style>
