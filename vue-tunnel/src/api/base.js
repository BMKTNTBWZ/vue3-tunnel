// 存放所有网络请求

const base = {
    baseUrl:"http://localhost:3000",
    login:'/api/login',                      //登录接口
    authority:'/api/authority',              //用户权限管理
    line:"/api/line",                        //图表地址
    projectInfo:'/api/project/all',          //隧道信息
    search:'/api/project/search',            //搜索接口
    total:'/api/project/total',              //数据总条数
    addproject:'/api/project/add',           //隧道信息添加
    delproject:"/api/project/delete",        //删除隧道信息
    preproject:"/api/project/pre",           //隧道信息预更新
    updataproject:"/api/project/updata/",    //隧道信息更新 
    tunnellist:"/api/tunnel/list",           //隧道设计信息一级
    tunnellistchild:"/api/tunnel/list/child",//隧道设计信息二级
    tunnelcontent:"/api/tunnel/content",     //隧道设计信息内容
    uploadurl:"/api/tunnel/content/url",     //隧道设计信息上传地址
    pdfViews:"/api/tunnel/pdf",              //PDF预览
    userlist:"/api/user/list",               //用户数据
    userSearch:"/api/user/search",           //用户模糊查询
    userAdd:"/api/user/add",                 //添加用户
    userDel:"/api/user/del",                 //删除用户
    userPre:"/api/user/pre",                 //用户预更新
    userUpdate:"'/api/user/updata",          //修改用户
}

export default base