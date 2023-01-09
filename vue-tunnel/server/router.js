const express = require('express');
const router = express.Router();
const url = require('url');
const SQLconnect = require('./SQLconnect');
const jwt = require('jsonwebtoken')
const jwtSecret = require('./jwtSecret')
const adminData = require('./data/admin')
const vipData = require('./data/vip')
const lineData = require('./data/line')
const multer = require('multer')
const fs = require('fs')
//接口

//登录
router.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body;
    const sql = 'select * from user where username=? and password=?';
    SQLconnect(sql, [username, password], result => {
        if (result.length > 0) {
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username,
                permission: result[0].permission
            }, jwtSecret.Secret)
            res.send({
                status: 200,
                username: result[0].username,
                permission: result[0].permission,
                token
            })
        } else {
            res.send({
                status: 500,
                msg: "用户名密码错误"
            })
        }
    })

})

router.get('/authority', (req, res) => {
    const user = url.parse(req.url,true).query.user
    switch (user) {
        case "admin":
            res.send({
                status: 200,
                menuData: adminData
            })
            break;
        case "vip":
            res.send({
                status: 200,
                menuData: vipData
            })
            break;
        default:
            res.send({
                status: 200,
                menuData: vipData
            })
            break;
    }
})

//图表接口
router.get('/line',(req,res)=>{
    res.send({
        status:200,
        result:lineData
    })
})

//隧道信息查询
router.get('/project/all',(req,res)=>{
    //分页
    var page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from project order by id desc limit 15 offset " + (page-1)*15;
    SQLconnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

//隧道信息模糊查询
router.get('/project/search',(req,res)=>{
    var search = url.parse(req.url,true).query.search
    //sql模糊查询语句
    const sql = "select * from project where concat(`name`,`address`,`remark`) like '%" + search +"%'"
    SQLconnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})
//获取数据总页数
router.get('/project/total',(req,res)=>{
    const sql = "select count(*) from project where id"
    SQLconnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    }) 
})

//对话框添加
router.get("/project/add", (req, res) => {
    var name = url.parse(req.url, true).query.name || "";
    var number = url.parse(req.url, true).query.number || "";
    var money = url.parse(req.url, true).query.money || "";
    var address = url.parse(req.url, true).query.address || "";
    var duration = url.parse(req.url, true).query.duration || "";
    var startTime = url.parse(req.url, true).query.startTime || "";
    var endTime = url.parse(req.url, true).query.endTime || "";
    var quantity = url.parse(req.url, true).query.quantity || "";
    var status = url.parse(req.url, true).query.status || "";
    var remark = url.parse(req.url, true).query.remark || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,?,?,?,?)";
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark]
    SQLconnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

//删除隧道信息
router.get('/project/delete',(req,res)=>{
    var id = url.parse(req.url,true).query.id
    const sql = "delete from project where id=?"
    SQLconnect(sql,[id],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败"
            })
        }
    })
})

//隧道信息预更新
router.get('/project/pre',(req,res)=>{
    var id = url.parse(req.url,true).query.id
    const sql = "select * from project where id=?"
    SQLconnect(sql,[id],result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result:result[0]
            })
        }else{
            res.send({
                status:500,
                msg:"预更新失败"
            })
        }
    })
})

//修改数据
router.put('/project/updata/:id',(req,res)=>{
    const id = req.params.id;
    const { name, number, money, address, duration, startTime, endTime, quantity, status, remark } = req.body;
    const sql = "update project set name=?,number=?,money=?,address=?,duration=?,startTime=?,endTime=?,quantity=?,status=?,remark=? where id=?";
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark, id]
    SQLconnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

//隧道设计信息 tree 一级
router.get('/tunnel/list',(req,res)=>{
    const sql = "select * from tunnel"
    SQLconnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

//隧道设计信息 tree 一级
router.get('/tunnel/list/child',(req,res)=>{
    var cid = url.parse(req.url,true).query.cid
    const sql = "select * from tunnelchild where cid=?"
    SQLconnect(sql,[cid],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})
//隧道设计信息 内容
router.get('/tunnel/content',(req,res)=>{
    const content = url.parse(req.url,true).query.content
    const sql = "select * from tunnelcontent where content=?"
    SQLconnect(sql,[content],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

//文件上传
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
 
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
 
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
 
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

//文件上传url
router.get('/tunnel/content/url',(req,res)=>{
    const id = url.parse(req.url,true).query.id
    const urlName = url.parse(req.url,true).query.urlName
    const sql = "update tunnelcontent set urlName=? where id=?"
    SQLconnect(sql,[urlName,id],result=>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "上传成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "上传失败"
            })
        }
    })
})

//预览
router.get('/tunnel/pdf',(req,res)=>{
    const id = url.parse(req.url,true).query.id
    const sql = "select * from tunnelcontent where id=?"
    SQLconnect(sql,[id],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result:result[0]
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

//用户列表
router.get('/user/list',(req,res)=>{
    const sql = "select * from user"
    SQLconnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

//用户模糊查询
router.get('/user/search',(req,res)=>{
    var search = url.parse(req.url,true).query.search
    //sql模糊查询语句
    const sql = "select * from user where concat(`username`,`permission`,`phone`) like '%" + search +"%'"
    SQLconnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})
//添加用户
router.get('/user/add',(req,res)=>{
    const username = url.parse(req.url,true).query.username
    const password = url.parse(req.url,true).query.password
    const permission = url.parse(req.url,true).query.permission
    const phone = url.parse(req.url,true).query.phone
    const sql = "insert into user values (null,?,?,?,?)"
    const arr = [username,password,permission,phone]
    SQLconnect(sql,arr,result=>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

//用户删除
router.get('/user/del',(req,res)=>{
    const id = url.parse(req.url,true).query.id
    if(id == 1)return;
    const sql = "delete from user where id=?"
    SQLconnect(sql,[id],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败"
            })
        }
    })
})

//用户预更新
router.get('/user/pre',(req,res)=>{
    var id = url.parse(req.url,true).query.id
    const sql = "select * from user where id=?"
    SQLconnect(sql,[id],result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result:result
            })
        }else{
            res.send({
                status:500,
                msg:"预更新失败"
            })
        }
    })
})

//修改用户数据
router.get("/user/update",(req,res) =>{
    const id = url.parse(req.url,true).query.id;
    const password = url.parse(req.url,true).query.password;
    const permission = url.parse(req.url,true).query.permission;
    const phone = url.parse(req.url,true).query.phone;
    const sql = "update user set password=?,permission=?,phone=? where id=?"
    SQLconnect(sql,[password,permission,phone,id],result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"修改成功"
            })
        }else{
            res.send({
                status:500,
                msg:"修改失败"
            })
        }
    })
})
module.exports = router;