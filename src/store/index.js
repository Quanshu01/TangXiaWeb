import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: sessionStorage.getItem("token"),
        user: JSON.parse(sessionStorage.getItem("user")),
        room: null, // 保存选中的机房
        jfprms: JSON.parse(sessionStorage.getItem("jfprms")),
        aidata: JSON.parse(sessionStorage.getItem("aidata")),
        aiparams: JSON.parse(sessionStorage.getItem("aiparams")),
        aitempparams: JSON.parse(sessionStorage.getItem("aitempparams")),
        userrow: JSON.parse(sessionStorage.getItem("userrow")), //暂存修改前的用户信息
        lrtdNormal: JSON.parse(sessionStorage.getItem("lrtdNormal")), //暂存修改前的冷热通道正常温度
        ktNormal: JSON.parse(sessionStorage.getItem("ktNormal")), //暂存修改前的空调正常参数范围

        hotpointriskall:[],
        ktdataall:JSON.parse(sessionStorage.getItem("ktdataall")),
        realtimefwqltdwdsmall:[],
        realtimefwqltdwdbig:[],
        realtimefwqrtdwdsmall:[],
        realtimefwqrtdwdbig:[],
        fwqltdwdDownMaxIndex:[],
        fwqltdwdUpMaxIndex:[],
        realtimefwqpower:[],
    },
    mutations: {
        // set
        SET_TOKENN: (state, token) => {
            state.token = token
            sessionStorage.setItem("token", token)
        },
        SET_USER: (state, user) => {
            state.user = user
            sessionStorage.setItem("user", JSON.stringify(user))
        },
        SET_ROOM(state, room) {
            state.room = room;
            sessionStorage.setItem("room", JSON.stringify(room))
        },
        SET_JFPRMS(state, jfprms) {
            state.jfprms = jfprms;
            sessionStorage.setItem("jfprms", JSON.stringify(jfprms))
        },
        SET_AIDATA(state, aidata) {
            state.aidata = aidata;
            sessionStorage.setItem("aidata", JSON.stringify(aidata))
        },
        SET_AIPARAMS(state, aiparams) {
            state.aiparams = aiparams;
            sessionStorage.setItem("aiparams", JSON.stringify(aiparams))
        },
        SET_AITEMPPARAMS(state, aitempparams) {
            state.aitempparams = aitempparams;
            sessionStorage.setItem("aitempparams", JSON.stringify(aitempparams))
        },
        SET_USERROW(state, userrow) {
            state.userrow = userrow;
            sessionStorage.setItem("userrow", JSON.stringify(userrow))
        },
        SET_LRTDNORMAL(state, lrtdNormal) {
            state.lrtdNormal = lrtdNormal;
            sessionStorage.setItem("lrtdNormal", JSON.stringify(lrtdNormal))
        },
        SET_KTNORMAL(state, ktnormal) {
            state.ktnormal = ktnormal;
            sessionStorage.setItem("ktnormal", JSON.stringify(ktnormal))
        },
        SET_HOTPOINTRISKALL(state, hotpointriskall) {
            state.hotpointriskall = hotpointriskall;
            sessionStorage.setItem("hotpointriskall", JSON.stringify(hotpointriskall));
        },
        SET_KTDATAALL(state, ktdataall) {
            state.ktdataall = ktdataall;
            sessionStorage.setItem("ktdataall", JSON.stringify(ktdataall));
        },
        SET_SERVERNEW(state, realtimefwqltdwdsmall,realtimefwqltdwdbig,realtimefwqrtdwdsmall,realtimefwqrtdwdbig,fwqltdwdDownMaxIndex,fwqltdwdUpMaxIndex,realtimefwqpower) {
            state.realtimefwqltdwdsmall = realtimefwqltdwdsmall;
            state.realtimefwqltdwdbig = realtimefwqltdwdbig;
            state.realtimefwqrtdwdsmall = realtimefwqrtdwdsmall;
            state.realtimefwqrtdwdbig = realtimefwqrtdwdbig;
            state.fwqltdwdDownMaxIndex = fwqltdwdDownMaxIndex;
            state.fwqltdwdUpMaxIndex = fwqltdwdUpMaxIndex;
            state.realtimefwqpower = realtimefwqpower;
            sessionStorage.setItem("realtimefwqltdwdsmall", JSON.stringify(realtimefwqltdwdsmall));
            sessionStorage.setItem("realtimefwqltdwdbig", JSON.stringify(realtimefwqltdwdbig));
            sessionStorage.setItem("realtimefwqrtdwdsmall", JSON.stringify(realtimefwqrtdwdsmall));
            sessionStorage.setItem("realtimefwqrtdwdbig", JSON.stringify(realtimefwqrtdwdbig));
            sessionStorage.setItem("fwqltdwdDownMaxIndex", JSON.stringify(fwqltdwdDownMaxIndex));
            sessionStorage.setItem("fwqltdwdUpMaxIndex", JSON.stringify(fwqltdwdUpMaxIndex));
            sessionStorage.setItem("realtimefwqpower", JSON.stringify(realtimefwqpower));
        },
    },
    getters: {
        getHotpointRiskAll: state => {
            return state.hotpointriskall;
        },
        getKtDataAll: state => {
            return state.ktdataall;
        },
    },
    actions:{
    },
    modules: {
    }
})