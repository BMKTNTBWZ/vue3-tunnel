<template>
    <div class="tunnel-container">
        <div class="tunnel-list">
            <h3>选择断面</h3>
            <el-tree :load="loadNode" lazy :props="defaultProps" @node-click="handleNodeClick" />
        </div>
        <div class="tunnel-content">
            <el-table :data="tunnelContent.data" style="width:100%">
                <el-table-column label="序号" prop="id"></el-table-column>
                <el-table-column label="隧道名称" prop="tunnelname"></el-table-column>
                <el-table-column label="图名" prop="imagename"></el-table-column>
                <el-table-column label="图号" prop="num"></el-table-column>
                <el-table-column label="图片" prop="urlName"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="preViewHandler(scope.$index,scope.row)">预览</el-button>
                        <el-button size="small" type="success" @click="updataHandler(scope.$index,scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- 上传对话框 start -->
    <el-dialog destroy-on-close center v-model="dialogUploadVisible" title="上传文件" width="30%">
        <el-upload 
            v-model:file-list="fileList" 
            action="http://localhost:3000/api/upload" 
            :limit="1" 
            class="upload"
            :on-success="handlePDFSuccess"
            :on-exceed="handleExceed"
            :destroy-on-close="destroy-on-close"
            >
            <el-button type="primary">点击上传</el-button>
        </el-upload>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogUploadVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogUploadVisible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 上传对话框 end -->
</template>

<script setup>
import api from '../../api';
import { reactive ,ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const fileList = ref([])

const dialogUploadVisible = ref(false)

const currentID = ref(0)

const tunnelContent = reactive({
    data:[]
})

const defaultProps = {
    children: 'children',
    label: 'name',
}

const handleNodeClick = (data) => {
    api.getTunnelContent({content:data.content}).then(res=>{
        if(res.data.status === 200){
            tunnelContent.data = res.data.result
        }else{
            tunnelContent.data = []
        }
    }).catch(error=>{
        console.log(error);
    })
}

const loadNode = (node, resolve) => {
    // 一级节点
    if (node.level === 0) {
        api.getTunnelList().then(res=>{
            if(res.data.status === 200){
                resolve(res.data.result)
            }else{
                resolve([])
            }
        })
    }
    // 二级节点
    if (node.level === 1) {
        api.getTunnelListChild({
            cid:node.data.cid
        }).then(res=>{
            if(res.data.status === 200){
                resolve(res.data.result)
            }else{
                resolve([])
            }
        })
    }
    //更多节点
    if (node.level > 1) {
        resolve([])
    }
}

//预览
const preViewHandler=(index,row)=>{
    router.push('/pdf/'+row.id)
}

//上传
const updataHandler=(index,row)=>{
    currentID.value = row.id
    dialogUploadVisible.value=true
}

//上传文件超出
const handleExceed =()=>{
    ElMessage.error('上传文件超出')
}

//上传文件成功
const handlePDFSuccess = (response,uploadFile)=>{
    api.getUploadUrl({
        id:currentID.value,
        urlName:response.url.substr(7)
    }).then(res=>{
        if(res.data.status === 200){
            ElMessage.success(res.data.msg)
            location.reload()
        }else{
            ElMessage.error(res.data.msg)
        }
    }).catch(error=>{
        console.log(error);
    })
}
</script>

<style scoped>
.tunnel-container {
    display: flex;
}
 
.tunnel-list {
    width: 250px;
    background-color: #fff;
    padding: 10px;
    margin-right: 20px;
}
 
.tunnel-list h3 {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0;
}
 
.tunnel-content {
    flex: 1;
}

.upload {
    display: inline-block;
}
</style>