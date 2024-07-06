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
        realtimefwqltdwdsmall:JSON.parse(sessionStorage.getItem("realtimefwqltdwdsmall")),
        realtimefwqltdwdbig:JSON.parse(sessionStorage.getItem("realtimefwqltdwdbig")),
        realtimefwqrtdwdsmall:JSON.parse(sessionStorage.getItem("realtimefwqrtdwdsmall")),
        realtimefwqrtdwdbig:JSON.parse(sessionStorage.getItem("realtimefwqrtdwdbig")),
        fwqltdwdDownMaxIndex:JSON.parse(sessionStorage.getItem("fwqltdwdDownMaxIndex")),
        fwqltdwdUpMaxIndex:JSON.parse(sessionStorage.getItem("fwqltdwdUpMaxIndex")),
        realtimefwqpower:JSON.parse(sessionStorage.getItem("realtimefwqpower")),
        faultdata:JSON.parse(sessionStorage.getItem("faultdata")),

        ktChangedValue:JSON.parse(sessionStorage.getItem("faultdata")),
        ktChangedSFValue:JSON.parse(sessionStorage.getItem("faultdata")),
        preltdmax:JSON.parse(sessionStorage.getItem("faultdata")),
        ifprecmd: Boolean,

        hotpointriskalldata:[],

        carbinetktdata:JSON.parse(sessionStorage.getItem("carbinetktdata")),
        carbinetserverdata:JSON.parse(sessionStorage.getItem("carbinetserverdata")),
        
        carbinetCount:JSON.parse(sessionStorage.getItem("carbinetCount")),
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
            sessionStorage.setItem("ktnormal", JSON.stringify(ktnormal));
        },
        SET_HOTPOINTRISKALL(state, hotpointriskall) {
            state.hotpointriskall = hotpointriskall;
            sessionStorage.setItem("hotpointriskall", JSON.stringify(hotpointriskall));
        },
        SET_KTDATAALL(state, ktdataall) {
            state.ktdataall = ktdataall;
            sessionStorage.setItem("ktdataall", JSON.stringify(ktdataall));
        },
        SET_FWQLTDWDSMALL(state, realtimefwqltdwdsmall){
            state.realtimefwqltdwdsmall = realtimefwqltdwdsmall;
            sessionStorage.setItem("realtimefwqltdwdsmall", JSON.stringify(realtimefwqltdwdsmall));
        },
        SET_FWQLTDWDBIG(state,realtimefwqltdwdbig){
            state.realtimefwqltdwdbig = realtimefwqltdwdbig;
            sessionStorage.setItem("realtimefwqltdwdbig", JSON.stringify(realtimefwqltdwdbig));
        },
        SET_FWQRTDWDSMALL(state,realtimefwqrtdwdsmall){
            state.realtimefwqrtdwdsmall = realtimefwqrtdwdsmall;
            sessionStorage.setItem("realtimefwqrtdwdsmall", JSON.stringify(realtimefwqrtdwdsmall));
        },
        SET_FWQRTDWDBIG(state,realtimefwqrtdwdbig){
            state.realtimefwqrtdwdbig = realtimefwqrtdwdbig;
            sessionStorage.setItem("realtimefwqrtdwdbig", JSON.stringify(realtimefwqrtdwdbig));
        },
        SET_FWQLTDWDDOUWNMAXINDEX(state, fwqltdwdDownMaxIndex){
            state.fwqltdwdDownMaxIndex = fwqltdwdDownMaxIndex;
            sessionStorage.setItem("fwqltdwdDownMaxIndex", JSON.stringify(fwqltdwdDownMaxIndex));
        },
        SET_FWQLTDWDUPMAXINDEX(state, fwqltdwdUpMaxIndex){
            state.fwqltdwdUpMaxIndex = fwqltdwdUpMaxIndex;
            sessionStorage.setItem("fwqltdwdUpMaxIndex", JSON.stringify(fwqltdwdUpMaxIndex));
        },
        SET_FWQPOWER(state, realtimefwqpower){
            state.realtimefwqpower = realtimefwqpower;
            sessionStorage.setItem("realtimefwqpower", JSON.stringify(realtimefwqpower));
        },
        SET_FAULTDATA(state, faultdata){
            state.faultdata = faultdata;
            sessionStorage.setItem("faultdata", JSON.stringify(faultdata));
        },
        SET_KTCHANGEDVALUE(state, ktChangedValue){
            state.ktChangedValue = ktChangedValue;
            sessionStorage.setItem("ktChangedValue", JSON.stringify(ktChangedValue));
        },        
        SET_KTCHANGEDSFVALUE(state, ktChangedSFValue){
            state.ktChangedSFValue = ktChangedSFValue;
            sessionStorage.setItem("ktChangedSFValue", JSON.stringify(ktChangedSFValue));
        },        
        SET_PRELTDMAX(state, preltdmax){
            state.preltdmax = preltdmax;
            sessionStorage.setItem("preltdmax", JSON.stringify(preltdmax));
        },        
        SET_IFPRECMD(state, ifprecmd) {
            state.ifprecmd = ifprecmd;
            sessionStorage.setItem("ifprecmd", JSON.stringify(ifprecmd));
        },
        SET_HOTPOINTRISKALLDATA(state, hotpointriskalldata){
            state.hotpointriskalldata = hotpointriskalldata;
            sessionStorage.setItem("hotpointriskalldata", JSON.stringify(hotpointriskalldata));
        },

        SET_CARBINETKTDATA(state, carbinetktdata){
            state.carbinetktdata = carbinetktdata;
            sessionStorage.setItem("carbinetktdata", JSON.stringify(carbinetktdata));
        },
        SET_CARBINETSERVERDATA(state, carbinetserverdata){
            state.carbinetserverdata = carbinetserverdata;
            sessionStorage.setItem("carbinetserverdata", JSON.stringify(carbinetserverdata));
        },
        SET_CARBINETCOUNT(state, carbinetCount) {
            state.carbinetCount = carbinetCount;
            sessionStorage.setItem("carbinetCount", JSON.stringify(carbinetCount));
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