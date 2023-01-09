<template>
    <div class="add-user">
        <span>用户状态：</span>
        <el-input class="input" v-model="userInfo" @keyup.enter="SearchHandle" size="large" placeholder="请输入要搜索的用户">
        </el-input>
        <el-button class="button" type="primary" @click="SearchHandle" plain>搜索</el-button>
        <el-button class="button" type="primary" @click="AddHandle" plain>添加</el-button>
    </div>
    <el-table :data="userlist.list" style="width:100%">
        <el-table-column label="ID" prop="id" width="180"></el-table-column>
        <el-table-column label="用户名" prop="username" width="200"></el-table-column>
        <el-table-column label="用户权限" prop="permission" width="200">
            <template #default="scope">
                <div>{{ scope.row.permission === 'admin' ? '管理员' : '普通用户' }}</div>
            </template>
        </el-table-column>
        <el-table-column label="联系方式" prop="phone" width="200"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="default" @click="EditorHandler(scope.$index, scope.row)">编辑权限</el-button>
                <el-button size="small" type="danger"
                    @click="DeleteUserHandler(scope.$index, scope.row)">删除用户</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加用户 -->
    <div>
        <el-dialog v-model="dialogAddVisible" title="添加用户" width="36%" center>
            <el-form :model="userForm" status-icon label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permission">
                    <el-radio-group v-model="userForm.permission" size="large">
                        <el-radio-button @click="permissionHandler('admin')" label="管理员" />
                        <el-radio-button @click="permissionHandler('vip')" label="普通用户" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="userForm.phone" type="text"></el-input>
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
    <!-- 修改用户 -->
    <div>
        <el-dialog v-model="dialogUpdateVisible" title="添加用户" width="36%" center>
            <el-form :model="updateuserForm" status-icon label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <h3>{{ updateuserForm.username }}</h3>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="updateuserForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permission">
                    <el-radio-group v-model="updateuserForm.permission" size="large">
                        <el-radio-button @click="updatepermissionHandler('admin')" label="管理员" />
                        <el-radio-button @click="updatepermissionHandler('vip')" label="普通用户" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="updateuserForm.phone" type="text"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogUpdateVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureEditorHandler">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import api from '../../api';
import { onMounted, reactive, ref } from 'vue';

//搜索事件
const SearchHandle = () => {
    api.getUserSearch({
        search: userInfo.value
    }).then(res => {
        if (res.data.status === 200) {
            console.log(res.data);
            userlist.list = res.data.result
        } else {
            userlist.list = []
        }
    }).catch(err => {
        console.log(err)
    })
}
//用户列表
const userlist = reactive({
    list: []
})

const userInfo = ref("")

//添加对话框显示与隐藏
const dialogAddVisible = ref(false)

//修改(预更新)对话框显示与隐藏
const dialogUpdateVisible = ref(false)

const EditorId = ref(0)


const userForm = reactive({
    username: "",
    password: "",
    permission: "",
    phone: ""
})

const updateuserForm = reactive({
    username: "",
    password: "",
    permission: "",
    phone: ""
})


//用户权限选择
const permissionHandler = (data) => {
    userForm.permission = data
}
//用户修改权限选择
const updatepermissionHandler = (data) => {
    updateuserForm.permission = data
    console.log(data);
}

onMounted(() => {
    http()
})

const http = () => {
    api.getUserList().then(res => {
        if (res.data.status === 200) {
            userlist.list = res.data.result
        } else {
            userlist.list = []
        }
    }).catch(err => {
        console.log(err);
    })
}

const EditorHandler = (index, row) => {
    EditorId.value = row.id
    if(row.id === 1){
        ElMessage.warning("不能修改")
        return
    }
    dialogUpdateVisible.value = true
    api.getUserPre({id:row.id}).then(res=>{
        if(res.data.status === 200){
            updateuserForm.username = res.data.result[0].username
            updateuserForm.password = res.data.result[0].password
            updateuserForm.permission = res.data.result[0].permission
            updateuserForm.phone = res.data.result[0].phone
        }
    })

}
const DeleteUserHandler = (index, row) => {
    ElMessageBox.confirm(
        '确定要删除当前用户么?',
        '删除用户',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 确定删除
        api.getUserDel({ id: row.id }).then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
                ElMessage({
                    type: 'success',
                    message: res.data.msg,
                })
                // 刷新UI
                http()
            } else {
                ElMessage({
                    type: 'error',
                    message: res.data.msg,
                })
            }
        })

    }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

//添加对话框
const AddHandle = () => {
    dialogAddVisible.value = true
}

//确认添加事件
const sureHandler = () => {
    api.getUserAdd({
        username: userForm.username,
        password: userForm.password,
        permission: userForm.permission,
        phone: userForm.phone
    }).then(res => {
        if (res.data.status === 200) {
            dialogAddVisible.value = false
            http()
            ElMessage.success(res.data.msg)
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(err => {
        console.log(err);
    })
}

//确认修改用户信息
const sureEditorHandler = ()=>{
    updateuserForm.permission === '管理员' ? updateuserForm.permission = 'admin' : updateuserForm.permission = 'vip'
    api.getUserUpdate({
        id:EditorId.value,
        password:updateuserForm.password,
        permission:updateuserForm.permission,
        phone:updateuserForm.phone
    }).then(res=>{
        if(res.data.status === 200){
            http()
            dialogUpdateVisible.value = false
            ElMessage.success(res.data.msg)
        }else{
            ElMessage.error(res.data.msg)
        }
    })
}
</script>

<style scoped>
.add-user {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background: #fff;
}

.add-user span {
    font-weight: 700;
}

.add-user .input {
    width: 300px;
    margin-right: 10px;
}
</style>