<template>
    <div class="title">
        <div>
            <p5-text size="extra-large" v-model="title">
                {{ title }}
            </p5-text>
        </div>

        <div>
            <p5-text size="large">
                <span class="meta-row">
                    <span>{{ time }}</span>
                    <span class="meta-item">
                        <img class="eye" src="../assets/eye.png" alt="eye">{{ reading }}
                    </span>
                    <span class="meta-item">
                        <img class="eye" src="../assets/liked.png" alt="like">{{ likes }}
                    </span>
                </span>
                <div class="tag-list">
                    <span v-for="tag in tags" :key="tag">{{ tag }}</span>
                </div>

            </p5-text>

        </div>

        <div class="markdown-content">
            <v-md-preview :text="markdownContent"></v-md-preview>
        </div>

    </div>

</template>
<script>
import api from '@/axios';
import { getPayload } from '@/apiResponse';

export default {
    props: ['blogId'],
    data() {
        return {
            blogId: this.blogId,
            title: '',
            reading: 0,
            likes: 0,
            tags: [],
            time: '',
            markdownContent: '',
        }
    },
    components: {
    },
    methods: {
        formatDate(isoString) {
            // 创建 Date 对象
            const date = new Date(isoString);

            // 获取各个部分
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需加 1
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // 格式化为 "YYYY/MM/DD HH:mm"
            return `${year}/${month}/${day} ${hours}:${minutes}`;
        }
    },
    created() {
        // 获取博客
        api.get(`/blogs/${this.blogId}`)
            .then(rep => {
                const blog = getPayload(rep)
                this.title = blog.title || ''
                this.markdownContent = blog.content || ''
                this.tags = blog.tags || []
                this.time = blog.createdAt ? this.formatDate(blog.createdAt) : ''
                this.reading = blog.views || 0
                this.likes = blog.likeCount ?? blog.like ?? 0
            }).catch(error => {
                console.log('error: ' + error)
            })
    }
}
</script>
<style scoped>
.title {
    margin-block: 10px;
    display: block;
    margin-top: 5px;
    padding: 18px 20px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 920px;
    margin-right: 0;
    text-align: left;
}

.eye {
    width: 16px;
    height: 16px;
}

.meta-row {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
}

.meta-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.tag-list span {
    font-size: 16px;
    /* 设置分类项和标签项的字体大小 */
    color: #555;
    /* 设置文本颜色 */
    display: flex;
    /* 使用 flex 布局，使文本和数量间距自动调整 */
    justify-content: space-between;
    /* 在分类项的文本和数量之间增加空间，使它们左右对齐 */
    padding: 5px 0;
    /* 设置上下的内边距，增加行间距 */
}

.tag-list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}


.tag-list span {
    background-color: #e0e7ff;
    /* 设置标签的背景颜色 */
    color: #333;
    /* 设置标签的文本颜色 */
    border-radius: 10px;
    /* 设置标签的圆角 */
    padding: 5px 10px;
    /* 设置标签内文本的内边距，增加空白区域 */
    margin: 5px;
    /* 设置标签之间的外边距 */
    font-size: 14px;
    /* 设置标签文本的字体大小 */
}

.markdown-content :not(.title) {
    justify-content: left;
    text-align: left;

}
</style>
