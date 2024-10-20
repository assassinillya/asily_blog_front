<template>
    <div class="container">
        <h1>标签</h1>
        <div class="tag-box">
            <p5-title v-for="(tag, index) in tags" :key="index" :content="tag.name + ' ' + tag.count" size="extra-large"
                :font_color="getRandomColor()" selected_bg_color="#f0f0f0" selected_font_color="#000" animation
                @click="clickTag(tag)" class="tag">
            </p5-title>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            tags: [],
            colors: ['#dc3545', '#17a2b8', '#ffc107', '#fd7e14', '#28a745', '#007bff', '#6f42c1'],
        };
    },
    methods: {
        clickTag(tag) {
            // console.log(tag.text)
            this.$router.push({ path: '/home', query: { searchWord: tag.text } });
        },
        getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const avg = (r + g + b) / 3;
            // 增加饱和度，确保颜色不会太暗
            return `rgb(${Math.floor(r + (255 - avg) * 0.5)}, ${Math.floor(g + (255 - avg) * 0.5)}, ${Math.floor(b + (255 - avg) * 0.5)})`;
        }
    },
    created() {
        axios.get('/tags')
            .then(rep => {
                const tagData = rep.data.message;
                // const excludedColors = [];

                tagData.forEach(tag => {
                    if (tag.count > 0) {
                        // const color = this.getRandomColor(excludedColors);
                        // excludedColors.push(color); // 记录已使用的颜色
                        this.tags.push({ name: tag.name, count: tag.count });
                    }
                });
            }).catch(error => {
                console.log('error: ' + error);
            });

    }
};
</script>

<style scoped>
.container {
    text-align: center;
    padding: 20px;
}

h1 {
    font-size: 36px;
    color: #ffffff;
}

.tag-box {
    border: 2px dashed #5bc0de;
    padding: 20px;
    border-radius: 10px;
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
}

.tag {
    margin: 10px;
    font-size: 18px;
    font-weight: bold;
}
</style>
