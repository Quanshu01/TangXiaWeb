<template>
  <div class="user-manage">
    <el-row>
      <el-col :span="24">
        <h2>超级管理员用户管理</h2>
      </el-col>
    </el-row>
    <div class="add-user">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <el-table :data="users" style="width: 100%" stripe @row-click="handleRowClick">
          <el-table-column label="用户身份" prop="role"></el-table-column>
          <el-table-column label="用户账号" prop="userName"></el-table-column>
          <el-table-column label="用户密码" prop="password" :show-overflow-tooltip="!showPassword">
            <template slot-scope="scope">
            <span v-if="passwordVisibility[scope.$index]">{{ scope.row.password }}</span>
            <span v-else>******</span>
          </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="togglePasswordVisibility(scope.$index)">{{ passwordVisibility[scope.$index] ? '隐藏密码' : '显示密码' }}</el-button>
              <el-button size="small" @click="editUserDialogVisible=true">编辑用户</el-button>
              <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="editUserDialogVisible" title="编辑用户" append-to-body>
      <!-- 编辑用户表单 -->
      <el-form :model="selectedUser" label-width="80px">
        <el-form-item label="用户身份" v-model=selectedUser.role>
            <el-radio-group v-model="selectedUser.role">
                <el-radio label="普通用户"></el-radio>
                <el-radio label="运维人员"></el-radio>
                <el-radio label="超管员"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="用户账号" v-model=selectedUser.userName>
          <el-input v-model="selectedUser.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-model=selectedUser.password>
          <el-input v-model="selectedUser.password" clearable show-password></el-input>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="addUserDialogVisible" title="添加用户" append-to-body>
      <!-- 添加用户表单 -->
      <el-form :model="newUser" label-width="80px">
        <el-form-item label="用户身份" v-model=newUser.role>
            <el-radio-group v-model="newUser.role">
                <el-radio label="普通用户"></el-radio>
                <el-radio label="运维人员"></el-radio>
                <el-radio label="超管员"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="用户账号" v-model=newUser.userName>
          <el-input v-model="newUser.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-model=newUser.password>
          <el-input v-model="newUser.password" clearable show-password></el-input>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确认</el-button>
      </span>
    </el-dialog>



  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      passwordVisibility: [], // 数组用于记录密码列的可见性
      users: [
      ],
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      selectedUser: {
        userName: "",
        password: "",
        role: "普通用户"
      },
      newUser: {
        userName: "",
        password: "",
        role: "普通用户"
      },
      beforeUpdate:{},
    };
  },
  mounted(){
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getUser()
        this.timer=setInterval(()=>{
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getUser()
        },66406)
  },
  created () {
      this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
      this.getUser()
  },
  methods: {
    togglePasswordVisibility(index) {
      this.$set(this.passwordVisibility, index, !this.passwordVisibility[index]);
    },
    getUser(){
      axios.post(this.global.apiURL+'9090'+"/202"+"/UserManagmentSelect",["PKU"],
      {
          headers:{
              'token':window.sessionStorage.getItem("token")
          },
      }).then(
          Response=>{
              // console.log('axios UserManagmentSelect this.users',Response.data)

              this.users=[]
              for(var i=0;i<Response.data.length;i++){
                  var temp={userName:Response.data[i].userName,
                            role:this.global.roles[Response.data[i].role],password:Response.data[i].password}
                  this.users.push(temp)
              }
              // console.log('this.users',this.users)
          },
          Error=>{
              console.log(this.JFname+' JF dont get! - UserManagmentSelect',Response.message)
              this.resbody = Error.message
          }
      );
    },
    addUser() {
      // 添加用户逻辑
      // 添加用户自动清空，增加用户体验
      this.newUser.role = this.global.rolesVarse[this.newUser.role]
      axios.post(this.global.apiURL+'9090'+"/202"+"/UserManagmentAdd",this.newUser,
        {
            headers:{
                'token':window.sessionStorage.getItem("token")
            },
        }
      ).then(res=>{
          // console.log('axios UserManagmentAdd post',res.data);
          if(res.data == "Duplicated user"){
            this.$notify({
                title: '用户名已重复注册',
                message: ('请重新填写用户名')
            });
          }
          this.getUser()
      })
      .catch(function (error) {
          console.log('axios UserManagmentAdd post error',error);
      });

      this.addUserDialogVisible = false;
    },
    editUser() {
      // 编辑用户逻辑
      this.beforeUpdate = JSON.parse(window.sessionStorage.getItem("userrow"))
      var beforeRole = this.beforeUpdate.role
      var afterRole = this.selectedUser.role
      this.beforeUpdate.role = this.global.rolesVarse[beforeRole]
      this.selectedUser.role = this.global.rolesVarse[afterRole]

      axios.post(this.global.apiURL+'9090'+"/202"+"/UserManagmentUpdate",[this.beforeUpdate, this.selectedUser],
        {
            headers:{
                'token':window.sessionStorage.getItem("token")
            },
        }
      ).then(res=>{
          console.log('axios UserManagmentUpdate post',res);
          this.getUser()
      })
      .catch(function (error) {
          console.log('axios UserManagmentUpdate post error',error);
      });
      this.editUserDialogVisible = false;
    },
    handleRowClick(row){
      this.selectedUser=row;
      this.$store.commit('SET_USERROW', row); // 将机房信息保存到 Vuex
    },
    deleteUser(user) {
      // 删除用户逻辑
      this.beforeDelete = user
      this.beforeDelete.role = this.global.rolesVarse[this.beforeDelete.role]

      this.$confirm('确定要删除用户 '+this.beforeDelete.userName+' 吗?')
          .then(_ => {
            console.log(_)
            axios.post(this.global.apiURL+'9090'+"/202"+"/UserManagmentDelete",this.beforeDelete,
              {
                  headers:{
                      'token':window.sessionStorage.getItem("token")
                  },
              }
            ).then(res=>{
                console.log('axios UserManagmentDelete post',res);
                this.getUser()
            })
            .catch(function (error) {
                console.log('axios UserManagmentDelete post error',error);
            });
          })
          .catch(_ => {
            console.log(_)
          });
    }
  }
};
</script>
  
<style scoped>
/* 样式可以根据需要进行自定义 */

.user-manage{
  padding:1rem 2rem;
  height:90vh;
}
.add-user{
  padding:0 0 0 86vw;
}
</style>
