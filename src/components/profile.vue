<template>
    <div class="page-container">
        <div class="background-container">
            <img class="avatar" src="https://q.qlogo.cn/g?b=qq&nk=1664962271&s=160" alt="头像">

            <div class="profile">
                <p5-text size="large">アンタが書いた杜撰なコード，ばっか持てはやすユーザーよ。</p5-text>
            </div>
            <div>
                <a href="https://space.bilibili.com/7206334?spm_id_from=333.1007.0.0" target="_blank"
                    rel="noopener noreferrer">
                    <img style="margin-left: -50px;" class="image" src="../assets/bilibili.png" alt="Bilibili">
                </a>
                <a href="https://github.com/assassinillya" target="_blank" rel="noopener noreferrer">
                    <img style="margin-left: 50px; width: 110px;" class="image" src="../assets/GitHub.png"
                        alt="Bilibili">
                </a>
            </div>
        </div>

        <div class="card-container">
            <div class="category">
                <h3>分类</h3>
                <div v-for="(count, category) in categories" :key="category">
                    <p>{{ category }} <span>{{ count }}</span></p>
                </div>
            </div>

            <div class="tags">
                <h3>标签</h3>
                <div class="tag-list">
                    <span class="p5-hover-animation-mix" v-for="tag in tags" :key="tag.name" @click="handleTagClick(tag.name)">{{ tag.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { P5Text } from 'p5-ui'
import axios from 'axios'
export default {
    components: {
        P5Text
    },
    data() {
        return {
            // 分类导航的数据
            categories: {
                '文章': 7,
            },
            // 标签数组
            tags: [
                { name: "golang", count: 2 },
                { name: "mygo", count: 4 },
            ]
        }
    },
    methods: {
        handleTagClick(tag) {
            // console.log('标签点击:', tag);
            this.$router.push({ path: '/home', query: { searchWord: tag } });
        },
        fetchTags() {
            axios.get('/tags')
                .then(rep => {
                    const tagData = rep.data.message;
                    this.tags = tagData.filter(tag => tag.count !== 0);
                }).catch(error => {
                    console.log('error: ' + error)
                })
        },
        getBlogCount(){
            axios.get('/blog/getBlogs/count')
                .then(rep => {
                    const tagData = rep.data.message;
                    this.categories.文章 = tagData
                }).catch(error => {
                    console.log('error: ' + error)
                })
        },
    },
    created() {
        this.fetchTags()
        this.getBlogCount()
    }
}
</script>
<style scoped>
.page-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    flex-direction: column;
    /* 纵向排列 */
}

.background-container {
    border-radius: 10px;
    /* 边框圆角 */
    display: inline-block;
    width: 300px;
    height: 400px;
    background-image: url('../assets/profileBackground.png');
    background-size: cover;
    /* 确保图片覆盖整个 div */
    background-position: center;
    position: relative;
    margin-bottom: 10px;
    /* 调整 margin-bottom 正值，防止元素叠加 */
    margin-left: 15%;
    /* 让它靠左 */
    margin-right: auto;
    /* 确保右侧留有空间 */
    margin-top: 8%;
    /* 控制向下移动 */
    padding-left: 10px;
    /* 如果需要左侧留一点内边距 */
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    /* 圆形头像 */
    position: absolute;
    /* 使用绝对定位 */
    top: 20%;
    /* 垂直居中 */
    left: 50%;
    /* 水平居中 */
    transform: translate(-50%, -50%);
    /* 精确居中 */
}

.profile {
    position: absolute;
    /* 使用绝对定位 */
    top: 45%;
    /* 调整文本位置，使其在头像下方 */
    left: 50%;
    /* 水平居中 */
    transform: translate(-50%, 0);
    /* 水平居中，无需垂直修正 */
    width: 90%;
    /* 控制文本容器宽度，防止文字溢出 */
    text-align: center;
    /* 文本居中对齐 */
}

.image {
    width: 50px;
    height: 50px;
    position: absolute;
    /* 使用绝对定位 */
    top: 75%;
    /* 调整文本位置，使其在头像下方 */
    left: 50%;
    /* 水平居中 */
    transform: translate(-50%, 0);
    /* 水平居中，无需垂直修正 */
}


.card-container {
    display: inline-block;
    margin-top: 1%;
    /* 设置上方的外边距，使其与背景元素保持一定的距离 */
    padding: 20px;
    /* 内边距，控制内容和卡片边框之间的距离 */
    background-color: #f9f9f9;
    /* 卡片的背景颜色 */
    border-radius: 10px;
    /* 边框圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 添加阴影，使卡片看起来有浮动效果 */
    width: 270px;
    /* 设置卡片的宽度 */
    margin-left: 15%;
    /* 卡片的左外边距，控制它在页面中的水平位置 */
    margin-right: auto;
    /* 自动调整右边距，确保卡片保持与左边距的比例 */
}

.category h3,
.tags h3 {
    font-size: 18px;
    /* 设置标题的字体大小 */
    color: #333;
    /* 设置标题的文本颜色 */
    margin-bottom: 10px;
    /* 设置标题与下方内容之间的距离 */
}

.category p,
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
    display: flex;
    /* 使用 flex 布局来排列标签 */
    flex-wrap: wrap;
    /* 允许标签在行末换行 */
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
</style>