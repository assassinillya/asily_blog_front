<template>
    <div class="message-board">
        <blogs :blogId="this.blogId" />
        <div class="message-list">
            <h2>留言板</h2>
            <div class="message" v-for="(message, index) in messages" :key="index">
                <img :src="message.avatar" alt="avatar" class="avatar">
                <div class="message-content">
                    <button class="reply-button" @click="replyTo(message.username)">回复</button>

                    <div class="message-header">
                        <span class="username">{{ message.username }}</span>
                        <span class="date">{{ message.date }}</span>
                        
                        <img :src="message.isLike?likedImage:unlikedImage" @click="like(message)" class ="like-icon" >
                        <p5-text size="medium">{{ message.liked }}</p5-text>
                    </div>
                    <v-md-preview class="message-body" :text="message.content"></v-md-preview>
                </div>
            </div>
            <div class="pagination">
                <el-pagination v-model:current-page="currentPage2" v-model:page-size="pageSize2"
                    :page-sizes="[5, 10, 50, 100]" :size="size" :background="background"
                    layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>

        <div class="message-form">
            <p5-title content="发布评论" size="large" font_color="#ff0022" selected_font_color="#000"
                selected_bg_color="#ff0022"></p5-title>
            <textarea v-if="useMarkdown == false" style="width: 780px;" v-model="newMessageContent"
                placeholder="*评论内容"></textarea>
            <v-md-editor v-else v-model="newMessageContent" height="400px"></v-md-editor>
            <input style="width: 780px;" v-model="newMessageUsername" type="text" placeholder="*昵称" />
            <input style="width: 780px;" v-model="newMessageQQ" type="email" placeholder="*邮箱/QQ号" />
            <div class="form-actions">
                <p5-title content="Markdown编辑器" size="medium"></p5-title>
                <input class="check" type="checkbox" v-model="useMarkdown" />
                <el-button :disabled="isDisabled" @click="submitMessage">
                    <p5-title class="p5-hover-animation-mix" content="发送" size="extra-large"></p5-title>
                </el-button>

            </div>
        </div>
    </div>
</template>
<script>
import blogs from './blogs.vue';
import axios from 'axios';
export default {
    components: { blogs },
    props: ['blogId'],
    created() {
        this.getComments()
        this.getcommentsCount()
    },
    data() {
        return {
            total: this.total,
            blogId: this.blogId,
            messages: [
                {
                    id:"123",
                    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg',
                    username: 'sensei',
                    content: 'ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧ヽ(๑•̀ㅂ•́)و✧',
                    date: '2022-6-15',
                    liked:10,
                    isLike:false,
                },
                {
                    id:"123",
                    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg',
                    username: 'xiao',
                    content: ` #include <cstdio>
#include <iostream>
#include <algorithm>
#include <queue>
#include <cmath>
`,
                    date: '2022-8-28',
                    isLike:false,
                    liked:10,
                },
                {
                    id:"123",
                    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1145367854&spec=640&img_type=jpg',
                    username: 'man',
                    content: 'so cool太棒了 (๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧太棒了！(๑•̀ㅂ•́)و✧',
                    date: '2022-8-29',
                    isLike:false,
                    liked:10,
                }
            ],
            newMessageContent: '',
            newMessageUsername: '',
            newMessageQQ: '',
            useMarkdown: false,
            total: 100,
            page: 1,
            limit: 10,
            likedImage: require('@/assets/liked.png'),   // 点赞后的图片路径
            unlikedImage: require('@/assets/unliked.png'), // 未点赞的图片路径
        }
    },
    methods: {
        like(message){
            console.log(message)
            if (message.isLike === false){
                axios.put('/comments/like',{
                    "_id":message.id
                }).then(()=>{
                    message.isLike=true
                    message.liked++
                }).catch(error=>{
                    console.log(error)
                })
            }else{
                axios.put('/comments/unlike',{
                    "_id":message.id
                }).then(()=>{
                    message.isLike=false
                    message.liked--
                }).catch(error=>{
                    console.log(error)
                })
            }
            
        },
        getcommentsCount() {
            axios.get(`/comments/get/count/${this.blogId}`)
                .then(rep => {
                    this.total = rep.data.count
                }).catch(error => {
                    console.log(error)
                })
        },
        submitMessage() {
            if (this.newMessageContent !== '' && this.newMessageUsername !== '' && this.newMessageQQ !== '') {
                this.addComment()
            }
            // this.$forceUpdate();
        },
        replyTo(username) {
            this.newMessageContent = `回复 @${username}：`;
        },
        handleCurrentChange(newPage) {
            this.page = newPage
            this.getComments()
        },
        handleSizeChange(newLimit) {
            this.limit = newLimit
            this.getComments()
        },
        addComment() {
            axios.post('/comments/add', {
                _id: this.blogId,
                content: this.newMessageContent,
                QQ: this.newMessageQQ,
                username: this.newMessageUsername
            }).then(() => {
                this.getComments()
            }).catch(error => {
                console.log(error)
            })

            this.newMessageContent = '';
            this.newMessageUsername = '';
            this.newMessageQQ = '';
        },
        linkToqq(url) {
            const qqMatch = url.match(/dst_uin=(\d+)/);
            const qq = qqMatch ? qqMatch[1] : null;
            return qq
        },
        getComments() {
            axios.get(`/comments/get/${this.blogId}/${this.page}/${this.limit}`)
                .then(rep => {
                    const response = rep.data.comments

                    this.messages = response.map(comment => ({
                        id:comment.id,
                        avatar: `http://q.qlogo.cn/headimg_dl?dst_uin=${comment.qq}&spec=640&img_type=jpg`,
                        username: comment.username,
                        content: comment.content,
                        date: new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        }),
                        isLike:false,
                        liked: comment.like,
                    }))
                }).catch(error => {
                    console.log('Error:', error);
                })
        }
    },
    computed: {
        isDisabled() {
            return this.newMessageUsername == '' || this.newMessageQQ == '' || this.newMessageContent == ''
        },
    }
}
</script>
<style scoped>
.like-icon{
    cursor: pointer; /* 鼠标悬停时变成手形 */
    width: 25px;
    height: 25px;
}

.like-active {
    filter: hue-rotate(180deg); /* 点赞后图标变红 */
}



.check {
    margin-left: -480px;
    margin-top: 10px
}

.message-board {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 2.2%;
    height: 915px;
    /* 保证留言表单在页面底部 */
    padding: 20px;
    background-size: cover;
}

.message-list {
    width: 800px;
    padding: 800px;
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
}

.message {
    height: auto;
    display: flex;
    margin-bottom: auto;
}

.avatar {
    height: 80px;
    border-radius: 25%;
}

.message-content {
    /* margin-top: -1; */
    flex-grow: 1;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.username {
    margin-top: -100px;
    margin-left: -75px;
    font-weight: bold;
}

.badge {
    background-color: #3498db;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    margin-left: 10px;
}

.date {
    margin-left:645px;
    color: #888;
}

.message-body {
    margin-top: 5px;
    text-align: left;
    word-wrap: break-word; /* 自动换行 */
    white-space: normal; /* 让内容正常换行，不保持单行 */
    overflow-wrap: break-word; /* 支持长单词换行 */
    max-width: 100%; /* 设置最大宽度以防止溢出 */
}

.reply-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 25px;
    cursor: pointer;
    margin-left: 670px;
    margin-top: -25px;
}

.message-form {
    width: 790px;
    top: auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 20px;
    border-top: 1px solid #ccc;
}

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
}

input {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.blog {
    display: flex;
    color: #2ecc71;
}

.page {
    float: right;
}
</style>