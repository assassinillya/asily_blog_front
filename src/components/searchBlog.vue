<template>
    <div>
        <div v-for="(post, index) in posts" :key="index" class="post-card" @click="toBlog(post._id)">
            <h3>{{ post.title }}</h3>
            <div class="info-container">
                <div class="date-container">
                    <img class="image" src="../assets/time.png" />
                    <p class="date">{{ formatDate(post.createdAt) }}</p> <!-- 使用格式化函数 -->
                </div>
                <div class="metrics">
                    <span class="metric-item">
                        <img class="metric-icon" src="../assets/eye.png" alt="views" />
                        <span>{{ post.views || 0 }}</span>
                    </span>
                    <span class="metric-item">
                        <img class="metric-icon" src="../assets/liked.png" alt="likes" />
                        <span>{{ post.likeCount ?? post.like ?? 0 }}</span>
                    </span>
                </div>
                <div class="tags">
                    <span v-for="(tag, tagIndex) in post.tags" :key="tagIndex">
                        <p5-text size="large">{{ tag }}</p5-text>
                    </span>
                </div>
            </div>
            <p class="content">{{ post.content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        posts: {
            type: Array,
            required: true,
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString); // 将字符串转换为日期对象
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`; // 返回格式化的日期
        },
        toBlog(_id){
            this.$router.push(`/blogId/${_id}`)
        }
    }
};
</script>

<style scoped>
.image {
    height: 20px;
    width: 20px;
    margin-right: 6px;
}

.info-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.date-container {
    display: flex;
    align-items: center; /* 使图片和时间垂直居中 */
}

.metrics {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 16px;
}

.metric-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: gray;
    font-size: 13px;
}

.metric-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
}

.post-card {
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 12px 14px;
    margin-bottom: 12px;
    transition: transform 0.3s; /* 添加平滑过渡效果 */
}

.post-card:hover {
    transform: scale(1.01); /* 鼠标悬停时放大 */
}

.post-card h3 {
    margin: 0 0 8px;
    font-size: 20px;
}

.date {
    color: gray;
    font-size: 14px;
}

.tags {
    margin-left: auto; /* 自动将标签挤压到时间的右侧 */
    padding-left: 12px; /* 增加一些左边距，让它稍微靠近时间 */
    flex-shrink: 0; /* 防止标签缩小 */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.tags span {
    display: inline-block;
    margin-left: 6px; /* 给标签间留出间隔 */
}

.content {
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.6;
}
</style>
