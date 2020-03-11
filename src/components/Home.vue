<template>
    <el-container class="home-container">
        <!--头部区域-->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--页面主体区域-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollpased ? '64px' :'240px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!--侧边菜单区域-->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF"
                         unique-opened :collapse="isCollpased" :collapse-transition="false" router :default-active=activePath>
                    <!--一级菜单-->
                    <el-submenu :index="item.id + '' " v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>

                        <!--二级菜单-->
                        <el-menu-item :index="'/' + subitem.path " v-for="subitem in item.children" :key="subitem.id"
                                      @click="saveNavStatus('/' + subitem.path)">
                            <i class="el-icon-menu"></i>
                            <span>{{subitem.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--内容区域-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menuList: [],
                iconsObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                isCollpased: false,
                activePath: ''
            }
        },
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            async getMenuList() {
                const {data : res} =await this.$http.get('menus');
                if(res.meta.status != 200) return this.$message.error(res.meta.msg)
                this.menuList = res.data
            },
            toggleCollapse() {
                this.isCollpased = !this.isCollpased
            },
            saveNavStatus(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
            }
        },
        created() {
            this.getMenuList()
            this.activePath = window.sessionStorage.getItem('activePath')
        }
    }
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}

.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: white;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        > span{
            margin-left: 15px;
        }
    }
}

.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: 0;
    }
}

.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    color: #fff;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.el-main{
    background-color: #EAEDF1;
}

.iconfont{
    margin-right: 10px;
}
</style>