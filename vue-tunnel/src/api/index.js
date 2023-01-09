import axios from '../utils/request.js'
import base from './base.js'

const api = {
    // 获取登录信息
    getLogin(params){
        return axios.post(base.baseUrl+base.login,params)
    },
    //获取路由权限
    getAuthority(params){
        return axios.get(base.baseUrl+base.authority,{params})
    },
    //获取line图标
    getLine(){
        return axios.get(base.baseUrl+base.line)
    },
    //获取隧道信息
    getProjectInfo(params){
        return axios.get(base.baseUrl+base.projectInfo,{params})
    },
    //获取搜索接口
    getSearch(params){
        return axios.get(base.baseUrl+base.search,{params})
    },
    //获取数据总条数
    getTotal(params){
        return axios.get(base.baseUrl+base.total,{params})
    },
    //添加隧道信息
    getAddProject(params){
        return axios.get(base.baseUrl+base.addproject,{params})
    },
    //删除隧道信息
    getDelProject(params){
        return axios.get(base.baseUrl+base.delproject,{params})
    },
    //预更新隧道信息
    getPreProject(params){
        return axios.get(base.baseUrl+base.preproject,{params})
    },
    //更新隧道信息
    getUpdataProject(id,params){
        return axios.put(base.baseUrl+base.updataproject+id,params)
    },
    //隧道设计信息一级
    getTunnelList(){
        return axios.get(base.baseUrl+base.tunnellist)
    },
    //隧道设计信息二级
    getTunnelListChild(params){
        return axios.get(base.baseUrl+base.tunnellistchild,{params})
    },
    //隧道设计信息内容
    getTunnelContent(params){
        return axios.get(base.baseUrl+base.tunnelcontent,{params})
    },
    //隧道设计信息上传地址
    getUploadUrl(params){
        return axios.get(base.baseUrl+base.uploadurl,{params})
    },
    //PDF预览
    getPDFViews(params){
        return axios.get(base.baseUrl+base.pdfViews,{params})
    },
    //用户数据
    getUserList(params){
        return axios.get(base.baseUrl+base.userlist,{params})
    },
    //用户数据
    getUserSearch(params){
        return axios.get(base.baseUrl+base.userSearch,{params})
    },
    //用户添加
    getUserAdd(params){
        return axios.get(base.baseUrl+base.userAdd,{params})
    },
    //用户添加
    getUserDel(params){
        return axios.get(base.baseUrl+base.userDel,{params})
    },
    //用户预更新
    getUserPre(params){
        return axios.get(base.baseUrl+base.userPre,{params})
    },
    //用户预更新
    getUserUpdate(params){
        return axios.get(base.baseUrl+base.userUpdate,{params})
    },
}


export default api