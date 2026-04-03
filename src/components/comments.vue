<template>
    <div class="message-board">
        <blogs :blogId="blogId" />
        <div class="message-list">
            <h2>评论区（主楼 + 楼中楼）</h2>
            <div v-for="(floor, floorIndex) in floors" :key="floor._id" class="floor-card">
                <div class="comment-row">
                    <img :src="floor.avatar" alt="avatar" class="avatar">
                    <div class="comment-main">
                        <div class="comment-header">
                            <span class="username">{{ floor.username }}</span>
                            <span class="floor-tag">{{ floorIndex + 1 }} 楼</span>
                            <span class="date">{{ floor.date }}</span>
                        </div>
                        <v-md-preview class="message-body" :text="floor.displayContent || floor.content"></v-md-preview>
                        <div class="comment-actions">
                            <button class="reply-button" @click="setReplyTarget(floor)">
                                回复
                            </button>
                            <img :src="floor.isLike ? likedImage : unlikedImage" @click="toggleLike(floor)" class="like-icon">
                            <p5-text size="medium">{{ floor.liked }}</p5-text>
                        </div>
                        <div v-if="replyTargetId === floor._id" class="inline-reply">
                            <input v-model="replyUsername" type="text" placeholder="*昵称" class="inline-reply-meta-input" />
                            <input v-model="replyQQ" type="email" placeholder="*邮箱/QQ号" class="inline-reply-meta-input" />
                            <textarea
                                ref="inlineReplyTextarea"
                                v-model="replyDraftContent"
                                class="inline-reply-input"
                                rows="3"
                                :placeholder="inlineReplyPlaceholder"
                            />
                            <div class="inline-reply-actions">
                                <el-button size="small" @click="cancelReply">取消</el-button>
                                <el-button size="small" type="primary" :disabled="isReplySubmitDisabled" @click="submitReply">
                                    发送
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reply-list" v-if="floor.replies && floor.replies.length > 0">
                    <div v-for="reply in floor.replies" :key="reply._id" class="reply-row">
                        <img :src="reply.avatar" alt="avatar" class="reply-avatar">
                        <div class="reply-main">
                            <div class="comment-header">
                                <span class="username">{{ reply.username }}</span>
                                <span class="date">{{ reply.date }}</span>
                            </div>
                            <v-md-preview class="message-body" :text="reply.displayContent || reply.content"></v-md-preview>
                            <div class="comment-actions">
                                <button class="reply-button" @click="setReplyTarget(reply)">
                                    回复
                                </button>
                                <img :src="reply.isLike ? likedImage : unlikedImage" @click="toggleLike(reply)" class="like-icon">
                                <p5-text size="medium">{{ reply.liked }}</p5-text>
                            </div>
                            <div v-if="replyTargetId === reply._id" class="inline-reply inline-reply-nested">
                                <input v-model="replyUsername" type="text" placeholder="*昵称" class="inline-reply-meta-input" />
                                <input v-model="replyQQ" type="email" placeholder="*邮箱/QQ号" class="inline-reply-meta-input" />
                                <textarea
                                    ref="inlineReplyTextarea"
                                    v-model="replyDraftContent"
                                    class="inline-reply-input"
                                    rows="3"
                                    :placeholder="inlineReplyPlaceholder"
                                />
                                <div class="inline-reply-actions">
                                    <el-button size="small" @click="cancelReply">取消</el-button>
                                    <el-button size="small" type="primary" :disabled="isReplySubmitDisabled" @click="submitReply">
                                        发送
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pagination">
                <el-pagination
                    :current-page="page"
                    :page-size="limit"
                    :page-sizes="[5, 10, 20, 50]"
                    layout="sizes, prev, pager, next"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>

        <div class="message-form">
            <p5-title
                content="发布主楼评论"
                size="large"
                font_color="#ff0022"
                selected_font_color="#000"
                selected_bg_color="#ff0022"
            />
            <textarea
                v-if="useMarkdown === false"
                ref="commentTextarea"
                v-model="newMessageContent"
                @input="autoResizeTextarea"
                placeholder="输入主楼评论内容"
            />
            <v-md-editor v-else v-model="newMessageContent" height="260px" />
            <input v-model="newMessageUsername" type="text" placeholder="*昵称" />
            <input v-model="newMessageQQ" type="email" placeholder="*邮箱/QQ号" />
            <div class="form-actions">
                <label class="markdown-switch">
                    <span>Markdown编辑器</span>
                    <input class="check" type="checkbox" v-model="useMarkdown" />
                </label>
                <div class="form-buttons">
                    <el-button :disabled="isMainDisabled" type="primary" @click="submitMainComment">
                        发送
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import blogs from './blogs.vue'
import api from '@/axios'
import { getList, getPagination } from '@/apiResponse'

export default {
    components: { blogs },
    props: ['blogId'],
    data() {
        return {
            floors: [],
            newMessageContent: '',
            newMessageUsername: '',
            newMessageQQ: '',
            replyUsername: '',
            replyQQ: '',
            replyDraftContent: '',
            useMarkdown: false,
            total: 0,
            page: 1,
            limit: 10,
            replyTargetId: '',
            replyTargetName: '',
            likedImage: require('@/assets/liked.png'),
            unlikedImage: require('@/assets/unliked.png'),
            defaultAvatar: '/docs/b_2b0fe1cc658f87153c005bc947b4530d.jpg',
        }
    },
    computed: {
        isMainDisabled() {
            return this.newMessageUsername === '' || this.newMessageQQ === '' || this.newMessageContent === ''
        },
        isReplySubmitDisabled() {
            return this.replyUsername.trim() === '' || this.replyQQ.trim() === '' || this.replyDraftContent.trim() === ''
        },
        inlineReplyPlaceholder() {
            return '回复被回复人'
        },
    },
    created() {
        this.getComments()
    },
    methods: {
        getQQNumber(input) {
            if (!input) return null

            const normalized = String(input).trim()
            const qqNumberMatch = normalized.match(/^\d{5,12}$/)
            if (qqNumberMatch) return qqNumberMatch[0]

            const qqEmailMatch = normalized.match(/^(\d{5,12})@qq\.com$/i)
            if (qqEmailMatch) return qqEmailMatch[1]

            return null
        },
        getAvatarByQQInput(input) {
            const qqNumber = this.getQQNumber(input)
            if (qqNumber) {
                return `http://q.qlogo.cn/headimg_dl?dst_uin=${qqNumber}&spec=640&img_type=jpg`
            }
            return this.defaultAvatar
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })
        },
        normalizeReply(reply) {
            return {
                ...reply,
                avatar: this.getAvatarByQQInput(reply.qq),
                date: this.formatDate(reply.createdAt),
                liked: reply.like || 0,
                isLike: false,
            }
        },
        normalizeFloor(floor) {
            const replies = Array.isArray(floor.replies) ? floor.replies : []
            const sortedReplies = [...replies].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

            return {
                ...floor,
                avatar: this.getAvatarByQQInput(floor.qq),
                date: this.formatDate(floor.createdAt),
                liked: floor.like || 0,
                isLike: false,
                replies: sortedReplies.map(this.normalizeReply),
            }
        },
        getComments() {
            api.get(`/comments/${this.blogId}`, {
                params: {
                    page: this.page,
                    limit: this.limit,
                },
            }).then(rep => {
                const list = getList(rep) || []
                const pagination = getPagination(rep) || {}
                const sortedFloors = [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                this.floors = sortedFloors.map(this.normalizeFloor)
                this.total = pagination.total || 0
            }).catch(error => {
                console.log('Error:', error)
            })
        },
        handleCurrentChange(newPage) {
            this.page = newPage
            this.getComments()
        },
        handleSizeChange(newLimit) {
            this.limit = newLimit
            this.page = 1
            this.getComments()
        },
        setReplyTarget(targetComment) {
            this.replyTargetId = targetComment._id
            this.replyTargetName = targetComment.username
            this.replyDraftContent = ''
            this.replyUsername = this.newMessageUsername
            this.replyQQ = this.newMessageQQ
            this.$nextTick(() => {
                const el = this.$refs.inlineReplyTextarea
                const ta = Array.isArray(el) ? el[0] : el
                if (ta && typeof ta.focus === 'function') {
                    ta.focus()
                }
            })
        },
        cancelReply() {
            this.replyTargetId = ''
            this.replyTargetName = ''
            this.replyDraftContent = ''
            this.replyUsername = ''
            this.replyQQ = ''
        },
        submitMainComment() {
            if (this.isMainDisabled) return

            const payload = {
                blogId: this.blogId,
                content: this.newMessageContent,
                qq: this.newMessageQQ,
                username: this.newMessageUsername,
            }

            api.post('/comments', payload).then(() => {
                this.newMessageContent = ''
                this.getComments()
                this.$nextTick(() => {
                    this.autoResizeTextarea()
                })
            }).catch(error => {
                console.log(error)
            })
        },
        submitReply() {
            if (this.isReplySubmitDisabled || !this.replyTargetId) return

            const payload = {
                blogId: this.blogId,
                parentId: this.replyTargetId,
                content: this.replyDraftContent,
                qq: this.replyQQ,
                username: this.replyUsername,
            }

            api.post('/comments', payload).then(() => {
                this.replyDraftContent = ''
                this.cancelReply()
                this.getComments()
            }).catch(error => {
                console.log(error)
            })
        },
        toggleLike(commentNode) {
            const endpoint = commentNode.isLike ? '/comments/unlike' : '/comments/like'
            api.put(endpoint, { _id: commentNode._id }).then(() => {
                commentNode.isLike = !commentNode.isLike
                if (commentNode.isLike) {
                    commentNode.liked += 1
                } else {
                    commentNode.liked = Math.max(0, commentNode.liked - 1)
                }
            }).catch(error => {
                console.log(error)
            })
        },
        autoResizeTextarea() {
            const textarea = this.$refs.commentTextarea
            if (!textarea) return
            textarea.style.height = 'auto'
            textarea.style.height = `${Math.max(textarea.scrollHeight, 120)}px`
        },
    },
}
</script>

<style scoped>
.message-board {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 920px;
    padding: 12px 0 20px;
    box-sizing: border-box;
}

.message-list {
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

.floor-card {
    border-bottom: 1px solid #f0f0f0;
    padding: 14px 0;
}

.comment-row,
.reply-row {
    display: flex;
    gap: 12px;
}

.reply-row {
    margin-top: 10px;
}

.reply-list {
    margin-left: 48px;
    margin-top: 8px;
}

.avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
}

.reply-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

.comment-main,
.reply-main {
    flex: 1;
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
}

.username {
    font-weight: 700;
}

.floor-tag {
    font-size: 12px;
    color: #409eff;
    background: #ecf5ff;
    border-radius: 10px;
    padding: 2px 8px;
}

.date {
    color: #888;
    font-size: 12px;
}

.message-body {
    text-align: left;
    margin-top: 6px;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.comment-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
}

.reply-button {
    border: none;
    border-radius: 18px;
    padding: 4px 10px;
    cursor: pointer;
    color: #fff;
    background-color: #409eff;
}

.like-icon {
    cursor: pointer;
    width: 22px;
    height: 22px;
}

.pagination {
    margin-top: 14px;
    display: flex;
    justify-content: flex-end;
}

.message-form {
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 20px;
    box-sizing: border-box;
}

textarea,
input {
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    box-sizing: border-box;
}

textarea {
    min-height: 120px;
    resize: none;
    overflow: hidden;
}

.message-form :deep(.v-md-editor) {
    width: 100%;
    margin-top: 10px;
}

.form-actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.markdown-switch {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 14px;
}

.form-buttons {
    display: flex;
    gap: 8px;
}

.inline-reply {
    margin-top: 10px;
    padding: 10px 12px;
    background: #f7f8fa;
    border-radius: 8px;
    border: 1px solid #eee;
}

.inline-reply-nested {
    margin-left: 0;
}

.inline-reply-input {
    width: 100%;
    margin-top: 0;
    border-radius: 6px;
    border: 1px solid #ddd;
    padding: 8px 10px;
    box-sizing: border-box;
    resize: vertical;
    min-height: 72px;
    font-size: 14px;
}

.inline-reply-meta-input {
    width: 100%;
    margin-top: 0;
    margin-bottom: 8px;
    border-radius: 6px;
    border: 1px solid #ddd;
    padding: 8px 10px;
    box-sizing: border-box;
    font-size: 14px;
}

.inline-reply-input::placeholder {
    color: #999;
}

.inline-reply-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
}
</style>
