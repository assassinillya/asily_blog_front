<template>
    <div class="title">
        <div>
            <p5-text size="extra-large" v-model="title">
                {{ title }}
            </p5-text>
        </div>

        <div>
            <p5-text size="large">
                {{ time }} <img class="eye" src="../assets/eye.png" alt="eye">{{ reading }}
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
import axios from 'axios';

export default {
    props: ['blogId'],
    data() {
        return {
            blogId: this.blogId,
            title: '标题',
            reading: 233,
            tags: ['c++', '树形dp'],
            time: '2024/10/12 14:02',
            markdownContent: `

# AcWing 1072. 树的最长路径
## 题目链接: https://www.acwing.com/problem/content/1074/
~~听y总的课听睡着了, 直接看的题解琢磨了下, 感觉挺简单的~~
## 题意
给你一棵树, 找到这棵树的最长路径

## 题解
~~先说屁话~~, 感觉能用最长路写, 最短路改改就好了
**当然这是个树形dp的模板题这里讲解树形dp的做法**

与其说是树形dp, 我觉得更像是dfs遍历了一遍树而已, 感觉没什么状态转移的特点在里面。

直接讲dfs的过程, 存图用前向星, 前向星的基础知识就不讲了。

因为是树的最长路径, 所以中间不能断开(~~废话~~)，所以对于每个子节点, 必须和他的父亲节点相连, 我们要找的是最长路径, 从根节点开始搜的话需要找到 **距离根节点** <u>最长和次长</u>的路径。

在每次dfs时, 遍历此节点的所有儿子, 获取其儿子到叶子结点的最长路径, 每次遍历都更新维护一个最长路径和次长路径。

当dfs回到根节点时, 此时维护的最长路径和次长路径就是 **<u>叶子结点到达根节点的路径</u>**。

整理一下输出最大值(是最长路径和次长路径的最大值)即可。
注意最后一个最长路径和次长路径的和不一定是最大的, **因为最长路径不一定会经过根节点!!!**

\`\`\`cpp
ll cnt,n,m,t,ans,ant;
const int N=1e4+10;
const int INF=0x3f3f3f3f;
const ll llINF=0x3f3f3f3f3f3f3f3f;
ll h[N],e[N*2],w[N*2],ne[N*2],idx;
string str;

void add(ll a,ll b,ll c)
{
    w[idx]=c;
    e[idx]=b;
    ne[idx]=h[a];
    h[a]=idx++;
}

ll dfs(ll u,ll fa)//当前节点和父节点
{
    ll dist=0;
    ll d1=0,d2=0;//最长路和次长路

    for(ll i=h[u];i!=-1;i=ne[i])
    {
        ll j=e[i];
        if(j==fa) continue;
        ll d=dfs(j,u)+w[i];//路径总长度
        dist=max(dist,d);//路径最大值
        if(d>=d1) 
        {
            d2=d1;
            d1=d;
        }else d2=max(d,d2);
    }

    ans=max(ans,d1+d2);
    return dist;
}

void solve()
{
    memset(h,-1,sizeof h);
    cin>>n;
    repr(i,1,n)
    {
        ll a,b,w;
        cin>>a>>b>>w;
        add(a,b,w);
        add(b,a,w);//无向边
    }
    
    dfs(1,-1);
    cout<<ans<<endl;
    
    return;
}
\`\`\`
`,
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
        axios.get('/blog/getBlog/' + this.blogId)
            .then(rep => {
                this.title = rep.data.message.title
                this.markdownContent = rep.data.message.content
                this.tags = rep.data.message.tags
                this.time = this.formatDate(rep.data.message.createdAt)
                this.reading = rep.data.message.views
            }).catch(error => {
                console.log('error: ' + error)
            })
    }
}
</script>
<style scoped>
.title {
    margin-block: 10px;
    display: inline-block;
    margin-top: 5px;
    /* 设置上方的外边距，使其与背景元素保持一定的距离 */
    padding: 20px;
    /* 内边距，控制内容和卡片边框之间的距离 */
    background-color: #f9f9f9;
    /* 卡片的背景颜色 */
    border-radius: 10px;
    /* 边框圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 添加阴影，使卡片看起来有浮动效果 */
    width: 790px;
    /* 设置卡片的宽度 */
    margin-right: auto;
    /* 自动调整右边距，确保卡片保持与左边距的比例 */
}

.eye {
    width: 15px;
    height: 15px;
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
    margin: auto;
    display: flex;
    /* 使用 flex 布局来排列标签 */
    flex-wrap: wrap;
    /* 允许标签在行末换行 */
    justify-content: center;
    /* 水平居中对齐标签 */
    align-items: center;
    /* 垂直居中对齐标签 */
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