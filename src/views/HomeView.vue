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
import api from '@/axios';
import { getList } from '@/apiResponse';

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
    this.fetchData();
  },
  watch: {
    '$route.query.searchWord': 'fetchData'
  },
  methods: {
    fetchData() {
      const searchWord = this.$route.query.searchWord;
      if (searchWord) {
        api.get('/blogs/search', {
          params: {
            q: searchWord,
          }
        })
          .then(rep => {
            this.searchRep = getList(rep).map(post => ({
              ...post,
              content: post.content || '',
            }));
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.init();
      }
    },
    init(){
      api.get('/blogs', {
        params: {
          page: 1,
          limit: 10000000,
        }
      })
        .then(rep=>{
          this.searchRep = getList(rep).map(post => ({
            ...post,
            content: post.content || '',
          }));
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
  align-items: flex-start;
  gap: 18px;
  max-width: 1160px;
  margin: 0 auto;
  padding: 20px 24px 0;
}

.info {
  width: 220px;
  display: flex;
  flex-shrink: 0;
  margin-top: -6px;
  margin-left: -28px;
}

.msg {
  flex: 1;
  max-width: 860px;
}

.info :deep(.page-container) {
  align-items: flex-start;
}

.info :deep(.background-container) {
  width: 220px;
  height: 300px;
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 0;
  border-radius: 12px;
}

.info :deep(.card-container) {
  width: 220px;
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding: 16px;
  border-radius: 12px;
}

.info :deep(.avatar) {
  width: 84px;
  height: 84px;
}

.info :deep(.image) {
  width: 42px;
  height: 42px;
}
</style>
