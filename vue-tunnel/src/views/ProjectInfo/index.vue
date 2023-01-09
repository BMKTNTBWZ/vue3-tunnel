<template>
    <!-- 隧道信息的搜索与添加 -->
    <div class="search">
        <span>信息查询：</span>
        <el-input class="input" v-model="searchInfo" @keyup.enter="SearchHandle" size="large" placeholder="请输入要搜索的信息">
        </el-input>
        <el-button class="button" type="primary" @click="SearchHandle" plain>搜索</el-button>
        <el-button class="button" type="primary" @click="AddHandle" plain>添加</el-button>
    </div>
    <!-- 表格信息展示 -->
    <el-table :data="ProjectInfo.lists" :header-cell-style="HeaderClass" style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="150" />
        <el-table-column prop="number" label="项目编码" width="100" />
        <el-table-column prop="money" label="项目金额" width="120" />
        <el-table-column prop="address" label="项目地址" width="120" />
        <el-table-column prop="duration" label="项目工期(月)" width="120" />
        <el-table-column :formatter="value => dateFormater(Number(value.startTime))" prop="startTime" label="开工时间"
            width="150" />
        <el-table-column :formatter="value => dateFormater(Number(value.endTime))" prop="endTime" label="终止时间"
            width="150" />
        <el-table-column prop="quantity" label="隧道数量" width="120" />
        <el-table-column prop="status" label="项目状态" width="120">
            <template #default="scope">
                <el-tag :type="scope.row.status === '1' ? '' : 'success'">
                    {{ scope.row.status === '1' ? '施工中' : '已完工' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="remark" label="备注">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="135">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
        <el-pagination background layout="prev, pager, next, jumper" :total="total" :default-page-size="defaultPage"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <div class="tips">
        <el-dialog v-model="dialogAddVisible" title="添加隧道信息" width="36%" center>
            <el-form :inline="true" :model="addFormInfo">
                <el-form-item label="项目名称">
                    <el-input v-model="addFormInfo.name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目编码">
                    <el-input v-model="addFormInfo.number" placeholder="请输入项目编码"></el-input>
                </el-form-item>
                <el-form-item label="项目金额">
                    <el-input v-model="addFormInfo.money" placeholder="请输入项目金额"></el-input>
                </el-form-item>
                <el-form-item label="项目地址">
                    <el-input v-model="addFormInfo.address" placeholder="请输入项目地址"></el-input>
                </el-form-item>
                <el-form-item label="项目工期">
                    <el-input v-model="addFormInfo.duration" placeholder="请输入项目工期"></el-input>
                </el-form-item>
                <el-form-item label="开工时间">
                    <!-- <el-input v-model="addFormInfo.startTime" placeholder="请输入开工时间"></el-input> -->
                    <el-date-picker value-format="x" v-model="addFormInfo.startTime" type="date" placeholder="请输入开工时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="终止时间">
                    <!-- <el-input v-model="addFormInfo.endTime" placeholder="请输入终止时间"></el-input> -->
                    <el-date-picker value-format="x" v-model="addFormInfo.endTime" type="date" placeholder="请输入终止时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="隧道数量">
                    <el-input v-model="addFormInfo.quantity" placeholder="请输入隧道数量"></el-input>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-input v-model="addFormInfo.status" placeholder="'1' 施工中  -  '0' 已完工"></el-input>
                </el-form-item>
                <el-form-item label="项目备注">
                    <!-- <el-input v-model="addFormInfo.remark" placeholder="请输入项目备注"></el-input> -->
                    <TinymceEditor :options="options" @onDataEvent="getInfoEditorHandler" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureHandler">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <div class="tipsEnditor">
        <!-- destroy-on-close:销毁数据 -->
        <el-dialog destroy-on-close v-model="dialogEditorVisible" title="编辑隧道信息" width="36%" center>
            <el-form :inline="true" :model="EditorFormInfo">
                <el-form-item label="项目名称">
                    <el-input v-model="EditorFormInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="项目编码">
                    <el-input v-model="EditorFormInfo.number"></el-input>
                </el-form-item>
                <el-form-item label="项目金额">
                    <el-input v-model="EditorFormInfo.money"></el-input>
                </el-form-item>
                <el-form-item label="项目地址">
                    <el-input v-model="EditorFormInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="项目工期">
                    <el-input v-model="EditorFormInfo.duration"></el-input>
                </el-form-item>
                <el-form-item label="开工时间">
                    <el-date-picker value-format="x" v-model="EditorFormInfo.startTime" type="date">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="终止时间">
                    <el-date-picker value-format="x" v-model="EditorFormInfo.endTime" type="date">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="隧道数量">
                    <el-input v-model="EditorFormInfo.quantity"></el-input>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-input v-model="EditorFormInfo.status"></el-input>
                </el-form-item>
                <el-form-item label="项目备注">
                    <TinymceEditor :EditorID="EditorID" :remark="EditorFormInfo.remark" :options="options" @onDataEvent="updateEditorHandler" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogEditorVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureEditorHandler">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>

import api from '../../api/index'
import { reactive, onMounted, ref } from 'vue'
import { dateFormater } from "../../utils/utils"
import TinymceEditor from '../../components/Tinymce/index.vue'
const ProjectInfo = reactive({
    lists: []
})

onMounted(() => {
    http(1)
})

onMounted(() => {
    api.getTotal().then(res => {
        if (res.data.status === 200) {
            total.value = res.data.result[0]['count(*)']
        } else {
            total.value = 0
        }
    })
})

//信息查询初始化
const searchInfo = ref("")

//初始化总条数
const total = ref(0)

//初始化分页展示条数
const defaultPage = ref(15)

//添加对话框的显示与隐藏
const dialogAddVisible = ref(false)

//编辑对话框的显示与隐藏
const dialogEditorVisible = ref(false)

//富文本编辑器ID
const EditorID = ref(0)

//添加对话框 确认事件
const sureHandler = () => {
    api.getAddProject({
        name: addFormInfo.name,
        number: addFormInfo.number,
        money: addFormInfo.money,
        address: addFormInfo.address,
        duration: addFormInfo.duration,
        startTime: addFormInfo.startTime,
        endTime: addFormInfo.endTime,
        quantity: addFormInfo.quantity,
        status: addFormInfo.status,
        remark: addFormInfo.remark
    }).then(res => {
        if (res.data.status === 200) {
            dialogAddVisible.value = false
            // 刷新页面
            http(1)
            ElMessage.success(res.data.msg)
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(error => {
        console.log(error);
    })
}

//搜索事件
const SearchHandle = () => {
    api.getSearch({ search: searchInfo.value }).then(res => {
        if (res.data.status === 200) {
            ProjectInfo.lists = res.data.result
        } else {
            ProjectInfo.lists = res.data.msg
        }
    }).catch(error => {
        console.log(error);
    })
}

//添加事件
const AddHandle = () => {
    dialogAddVisible.value = true
}

//初始化对话框状态
const addFormInfo = reactive({
    name: "",
    number: "",
    money: "",
    address: "",
    duration: "",
    startTime: "",
    endTime: "",
    quantity: "",
    status: "",
    remark: ""
})

//编辑对话框状态
const EditorFormInfo = reactive({
    name: "",
    number: "",
    money: "",
    address: "",
    duration: "",
    startTime: "",
    endTime: "",
    quantity: "",
    status: "",
    remark: ""
})

//网络请求
const http = (page) => {
    api.getProjectInfo({ page }).then(res => {
        if (res.data.status === 200) {
            ProjectInfo.lists = res.data.result
        }
    }).catch(error => {
        console.log(error);
    })
}

//设置表头样式
const HeaderClass = () => {
    return {
        color: "#666",
        background: "#dcdcdc",
        fontWeight: 700
    }
}

//编辑表格操作
const handleEdit = (index, row) => {
    dialogEditorVisible.value = true
    EditorID.value = row.id
    api.getPreProject({ id:row.id }).then(res =>{
        if(res.data.status === 200){
            EditorFormInfo.name = res.data.result.name
            EditorFormInfo.number = res.data.result.number
            EditorFormInfo.money = res.data.result.money
            EditorFormInfo.address = res.data.result.address
            EditorFormInfo.duration = res.data.result.duration
            // 修改事件日期格式
            EditorFormInfo.startTime = Number(res.data.result.startTime)
            EditorFormInfo.endTime = Number(res.data.result.endTime)
            EditorFormInfo.quantity = res.data.result.quantity
            EditorFormInfo.status = res.data.result.status
            EditorFormInfo.remark = res.data.result.remark
        }else{
            ElMessage.error(res.data.msg)
        }
    }).catch(error =>{
        console.log(error);
    })
}

//确认编辑表格
const sureEditorHandler = ()=>{
    api.getUpdataProject(EditorID.value,{
        name: EditorFormInfo.name,
        number: EditorFormInfo.number,
        money: EditorFormInfo.money,
        address: EditorFormInfo.address,
        duration: EditorFormInfo.duration,
        startTime: EditorFormInfo.startTime,
        endTime: EditorFormInfo.endTime,
        quantity: EditorFormInfo.quantity,
        status: EditorFormInfo.status,
        remark: EditorFormInfo.remark  // 富文本编辑器中的数据
    }).then(res =>{
        if(res.data.status === 200){
            dialogEditorVisible.value = false;
            http(1)
            ElMessage.success(res.data.msg)
        }else{
            ElMessage.error(res.data.msg)
        }
    })
}

//删除表格操作
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '确定要删除当前数据么?',
        '删除数据',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 确定删除
        api.getDelProject({ id: row.id }).then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
                ElMessage({
                    type: 'success',
                    message: res.data.msg,
                })
                // 刷新UI
                http(1)
            } else {
                ElMessage({
                    type: 'error',
                    message: res.data.msg,
                })
            }
        })

    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })

}

//分页
const handleSizeChange = (val) => {
    http(val)
}
const handleCurrentChange = (val) => {
    http(val)
}

//设置富文本编辑器的宽高
const options = {
    width: "600px",
    height: "350px"
}

//富文本编辑器数据获取
const getInfoEditorHandler = (data) => {
    addFormInfo.remark = data
}

//修改富文本编辑器数据
const updateEditorHandler = (data)=>{
    EditorFormInfo.remark = data
}

</script>

<style scoped>
.search {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background: #fff;
}

.search span {
    font-weight: 700;
}

.search .input {
    width: 300px;
    margin-right: 10px;
}

.page {
    position: fixed;
    top: 850px;
    right: 20px;
}
</style>