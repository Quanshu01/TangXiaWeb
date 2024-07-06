<template>
    <body id="login-page">
        <div class="login-all">
            <div class="login-pic">
                <h4 class="sys-title">数据中心智慧自动化控制系统</h4>
                <img src="@/assets/icons/loginCover.svg" />
            </div>
            <div class="login-container">
                <div class="login-sysName">
                </div>
                <div class="login-form" v-if="noRegister">
                    <el-form label-position="right" :inline="true">
                        <h3 class="login_title">登 录</h3>
                        <div></div>
                        <el-form-item label="登陆身份" v-model=loginForm.role>
                            <el-radio-group v-model="loginForm.role" @change="changeRole()">
                                <el-radio label="普通用户"></el-radio>
                                <el-radio label="运维人员"></el-radio>
                                <el-radio label="超管员"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div></div>
                        <el-form-item label="账号">
                            <el-input
                                type="text"
                                prefix-icon="el-icon-user"
                                v-model="loginForm.loginName"
                                auto-complete="off"
                                placeholder="账号"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <div></div>
                        <el-form-item label="密码">
                            <el-input
                                type="password"
                                prefix-icon="el-icon-lock"
                                v-model="loginForm.password"
                                auto-complete="off"
                                placeholder="密码"
                                show-password>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选择机房" v-model=loginForm.room>
                            <el-radio-group v-model="loginForm.room" @change="changeRoom()">
                                <el-radio label="201"></el-radio>
                                <el-radio label="202"></el-radio>
                                <el-radio label="203"></el-radio>
                                <el-radio label="204"></el-radio>
                                <el-radio label="205"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div style="display:flex;width: 100%; justify-content: center; align-items: center;">
                            <el-button
                                type="primary" plain
                                style="width: 60%;"
                                @click="login">登录
                            </el-button>
                        </div>
                    </el-form>
                </div>
                <div class="login-sysName-end">
                    <h4 class="sys-title-end">AUTO-AI</h4>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import { userLogin } from "@/api/user";

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                loginName: "",
                password: "",
                room:'202',
                role:"普通用户",
            },
            registerForm: {
                registerName: "",
                registerPassword: "",
                registerRole:"普通用户",
            },
            role2en:{
                '超管员':'root',
                '运维人员':'operator',
                '普通用户':'normal',
            },
            noRegister:true,
        };
    },
    methods: {
        login () {
            var _this = this;
            
            // 假设通过登录逻辑验证用户信息
            const selectedRoom = this.loginForm.room; // 获取用户选择的机房
            this.$store.commit('SET_ROOM', selectedRoom); // 将机房信息保存到 Vuex
            
            // post用户信息以登陆
            userLogin({
                loginName: this.loginForm.loginName,
                password: this.loginForm.password,
                role:this.role2en[this.loginForm.role],
            })
            .then((resp) => {
                let code=resp.data.code;
                if(code===200){
                    let data=resp.data.data;
                    let token=data.token;
                    let user=data.user;
                    //存储token和用户信息
                    _this.$store.commit('SET_TOKENN', token);
                    _this.$store.commit('SET_USER', user);

                    var path = this.$route.query.redirect
                    this.$router.replace({path: path === '/now-status' || path === undefined ? '/now-status' : path})
                    setTimeout(function() {
                        location.reload() //登陆成功页面整体刷新一下
                    },100)
                }
                else{
                    this.$notify.error({
                        title: '密码错误',
                        message: '您输入的账号和密码不符合'
                    });
                }
            })
        },
        changeRole(){
            this.loginForm.loginName=""
            this.loginForm.password=""
        },
        changeRoom(){
            // console.log('change room',this.loginForm.room)
        },
        register(){
            
        }
    },
};
</script>

<style scoped>
#login-page {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sys-title{
    font-size:1rem;
}
.sys-title-end{
    font-size: 0.6rem;
    text-align: right;
    margin: 2% 0 2% 86%;
    zoom:0.9;
    color: #cac6c6;
}
body {
    margin: 0px;
}
.login-all{
    height: 60vh;
    width: 60vw;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color:white;
    border-radius: 15px;
    box-shadow: 0 0 0.5rem #cac6c6;
}
.login-pic{
    width: 25vw;
    height:100%;
    background-color: #f4f4f4;
    border-radius: 15px 0 0 15px;
    display: grid;
    justify-content: center;
    align-items: center;
}
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    width: 35vw;
    height:100%;
}
.login-cover{
    height:50vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-sysName{
    width: 35vw;
    height:5vh;
}
.login-sysName-end{
    width: 35vw;
    height:8vh;
    display: flex;
    align-items: center;
    bottom:0;
}
.login-form{
    width: 35vw;
    height:48vh;
}
.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    font-size: 1.2rem;
    color: #505458;
}
</style>