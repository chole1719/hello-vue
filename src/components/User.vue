<template>
  <div>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 布局 -->
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入姓名或地址" v-model="search" >
            <el-button slot="append" type="primary" icon="el-icon-search" size="mini" @click="searchUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" class="btn" @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 100%" striped border>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="adress" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showEditDiag(scope.row)">修改</el-button>
            <el-button type="info" size="mini" @click="delDiag(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @closed="closeDiag">
      <el-form ref="addData" :model="addData" label-width="80px" :rules="addDataRules">
        <el-form-item label="姓名">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addData.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="addData.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addData.adress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form ref="addData" :model="editData" label-width="80px" :rules="addDataRules">
        <el-form-item label="姓名">
          <el-input v-model="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editData.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editData.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editData.adress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

//import _ from 'lodash'
export default {
  data() {
    return {
      tableData: [
        {
          id: "123",
          name: "张三",
          sex: "男",
          age: "27",
          adress:'江苏省无锡市梁溪区五爱广场'
        },
        {
          id: "233",
          name: "王武",
          sex: "男",
          age: "27",
          adress:'江苏省无锡市梁溪区国金大厦'
        },
        {
          id: "344",
          name: "李四",
          sex: "女",
          age: "22",
          adress:'江苏省无锡市梁溪区崇安寺'
        }
      ],
      //增加对话框的显示与隐藏
      addDialogVisible: false,
      addData: {
        id: "",
        name: "",
        sex: "",
        age: "",
        adress:''
      },
      addDataRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      },
      editDialogVisible: false,
      editData: {
        id: "",
        name: "",
        age: "",
        sex: "",
        adress:''
      },
      search: ""
    };
  }, 
  methods: {
    /* 展示添加用户的对对话框 */
    showAddDialog() {
      this.addDialogVisible = true;
    },
    /* 添加用户信息*/
    addUser() {
      this.addData.id = Math.floor(10000 * Math.random());
      // 深拷贝一个addData
      const addForm=_.cloneDeep(this.addData)
      this.tableData.push(addForm)
      this.addDialogVisible = false;
    },
    /* 重置添加对话框 */
    closeDiag() {
      this.$refs.addData.resetFields();
    },
    /* 展示修改对话框 */
    showEditDiag(row) {
      this.editDialogVisible = true;
      this.editData = row;
      this.editData.id=row.id
    },
    /* 修改用户信息 */
    editUser(id) {
      // 使用map()实现
      const editForm=_.cloneDeep(this.editData)
      this.tableData.map(function(user){
        if(user.id!=editForm.id){
          return user
        }
        else{
          return editForm
        }
      })
      this.editDialogVisible=false
    },
    /* 删除对话框 */
    async delDiag(id) {
      const resultConfirm = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      //如果用户确认删除，则返回值是字符串confirm
      //如果用户取消删除，则返回值是字符串cancel
      if (resultConfirm !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // this.tableData.splice(id-1,1)
      // 使用filter实现 id不等留下来 相等的删除掉
      this.tableData=this.tableData.filter(function(item){
         return item.id!=id
      })
    },
    searchUser(){
      var search=this.search
      this.tableData=this.tableData.filter(function(router){
       return router.name.indexOf(search)!=-1 || router.adress.indexOf(search)!=-1
      })
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  margin-left: 20px;
}
.el-table {
  margin-top: 20px;
}
</style>