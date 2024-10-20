<template>
    <div class="main">
        <div class="button-container">
            <div class="profile">
                <profile />
            </div>
            <div class="content">
                <div class="link-button" v-for="(item, index) in buttons" @click="clicklink(item.url)" :key="index">
                    <a :href="item.url" class="avatar-link">
                        <img :src="item.avatar" alt="avatar" class="avatar">
                    </a>
                    <div class="text-content">
                        <a :href="item.url" class="link-title">{{ item.name }}</a>
                        <p class="description">{{ item.description }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>



<script>
import Profile from '../components/profile.vue';
import axios from 'axios';
export default {
    components: {
        Profile // 注册组件
    },
    data() {
        return {
            buttons: [
                // { text: 'Google', link: 'https://www.google.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1664962271&spec=640&img_type=jpg', description: "Search the world's information." },
                // { text: 'Facebook', link: 'https://www.facebook.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2854197898&spec=640&img_type=jpg', description: 'Connect with friends and the world around you.' },
                // { text: 'Twitter', link: 'https://www.twitter.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=212744261&spec=640&img_type=jpg', description: 'Join the conversation in short messages.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },
                // { text: 'GitHub', link: 'https://www.github.com', avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg', description: 'A community for developers to share code.' },

            ]
        };
    },
    methods: {
        clicklink(link) {
            window.open(link);
        }
    },
    created() {
        // 获取评论
        axios.get(`/friendLink/get/${1}/${1000}`)
            .then(rep => {
                // TODO 还没赋值 total有点问题 明天再搞
                this.buttons=rep.data.message
                console.log(this.buttons)
            }).catch(error => {
                console.log('error: ' + error)
            })
    }
}
</script>

<style scoped>
.main {
    display: flex;
    margin: auto;
    margin-top: 80px;
}

.button-container {
    display: flex;
    /* 允许换行 */
    margin: auto;
}

.profile {
    margin-top: -5px;
    display: flex;
    width: 400px;
}

.content {
    display: flex;
    width: 1300px;
    flex: 1;
    flex-wrap: wrap;
}

.link-button {
    margin-right: 100px;
    display: flex;
    /* 保持内部元素并排显示 */
    align-items: center;
    /* 垂直居中对齐 */
    margin: 20px;
    /* 使用 margin 以确保间距 */
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    /* 控制每个按钮的宽度 */
    height: 100px;
    /* 控制每个按钮的高度 */
    transition: all 0.5s ease;
    overflow: hidden;
    position: relative;
}

.avatar-link {
    margin-right: 20px;
    /* 确保图片与文字之间有间距 */
}

.avatar {
    width: 100px;
    /* 图片宽度 */
    height: 100px;
    /* 图片高度 */
    border-radius: 50%;
    /* 圆形头像 */
    transition: all 0.5s ease;
}

.text-content {
    display: flex;
    /* 可以添加这个设置，以确保文本内容的格式化 */
    flex-direction: column;
    /* 垂直排列文本内容 */
    transition: all 0.5s ease;
}

.link-button:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.link-button:hover .avatar {
    transform: translateX(-150%);
    /* 鼠标悬停时将图片向左移出 */
}

.link-button:hover .text-content {
    transform: translateX(-100px);
    /* 鼠标悬停时让文本向左移 */
}

.link-title {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}

.description {
    font-size: 14px;
    color: #666;
    margin: 0;
    padding: 0;
}
</style>
