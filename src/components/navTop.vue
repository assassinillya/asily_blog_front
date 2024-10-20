<template>
    <div class="nav-top-ctn">
        <div class="menu-item-ctn">
            <img class="menu-icon" src="..\assets\h_top.png" alt="menu icon">
            <el-input style="width: 240px;height: 35px" v-model="search" @keyup.enter="fetchSearch" placeholder="搜索博客">
                <template #prefix>
                    <img style="width: 50px;height: 40px" src="..\assets\find.png">
                </template>
            </el-input>
            <router-link to="/home">
                <p5-text size="extra-large" style="cursor:pointer;">主页</p5-text>
            </router-link>
            <router-link to="/blogCategory">
                <p5-text size="extra-large" style="cursor:pointer;">博客分类</p5-text>
            </router-link>

            <a href="#/friends">
                <p5-text size="extra-large">我的朋友</p5-text>
            </a>

        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            search: '',
        }
    },
    components: {
        // P5Text
    },
    methods: {
        fetchSearch() {
            this.$router.push({ path: '/home', query: { searchWord: this.search } });
            // TODO 跳转到查询页面
        }
    }
}
</script>
<style scoped>
a {
    color: black;
    /* 设置链接的默认颜色 */
    text-decoration: none;
    /* 禁用下划线 */
}

a:visited {
    color: black;
    /* 设置访问过的链接颜色和未访问的一致 */
}

a:hover {
    color: #3498db;
    /* 鼠标悬停时的颜色 */
}

a:active {
    color: #2980b9;
    /* 点击时的颜色 */
}


.menu-icon {
    height: 80px;
    object-fit: contain;
    /* margin-right: ; */
}

.menu-item-ctn {
    display: flex;
    width: 1000px;
    margin-top: 20px;
    justify-content: space-around;
}

.nav-top-ctn {
    z-index: 9999;
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80px;
    top: 0;
    left: 0;
    background: url(../assets/menu_bg.png) no-repeat;
    background-size: cover;
}

.bg {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    z-index: -1;
}

.github-corner {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
}

.github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {

    0%,
    100% {
        transform: rotate(0)
    }

    20%,
    60% {
        transform: rotate(-25deg)
    }

    40%,
    80% {
        transform: rotate(10deg)
    }
}

@media (max-width:500px) {
    .github-corner:hover .octo-arm {
        animation: none
    }

    .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }
}
</style>