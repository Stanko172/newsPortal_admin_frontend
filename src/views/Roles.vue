<template>
<div>
  <el-table
    :data="roles.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Naziv"
      prop="title"
      width="250px"
      >
    </el-table-column>

    <el-table-column
      label="Permisije">
      <template #default="scope">
            <div>
                <div class="tags-container">
                    <el-tag v-for="(permission, index) in scope.row.permissions" :key="index" style="padding: 0.2em;">
                    {{ permission.title }}
                </el-tag>
                </div>
            </div>
      </template>
    </el-table-column>
    
    <el-table-column
      align="right" width="200px">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </template>
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- Form dialog -->
<el-dialog title="Permisije" v-model="showDialog">
  <el-form>
    <el-form-item label="Naziv">
      <el-input v-model="title" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="Permisije: ">
  <el-select v-model="value" placeholder="Select" @change="handleChange">
    <el-option
      v-for="(item, index) in permissionsSelect"
      :key="index"
      :label="item.title"
      :value="item">
    </el-option>
  </el-select>
  </el-form-item>
  </el-form>
  <el-card>
    <div class="tags-container">
        <el-tag v-for="(permission, index) in permissions" :key="index" closable @close="handleClose(index, permission)">
            {{ permission.title }}
        </el-tag>
    </div>
    </el-card>
  <template #footer v-if="!editing">
    <span class="dialog-footer">
      <el-button @click="reset">Odustani</el-button>
      <el-button type="primary" @click="createData">Spremi</el-button>
    </span>
  </template>
  <template #footer v-else>
    <span class="dialog-footer">
      <el-button @click="reset">Odustani</el-button>
      <el-button type="primary" @click="editData">Spremi</el-button>
    </span>
  </template>
</el-dialog>

  <!--Floating action button-->
  <a href="#" class="float" @click="handleCreate">
    <i class="fa fa-plus my-float"></i>
  </a>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
    data() {
      return {
        showDialog: false,
        editing: false,
        search: '',
        id: null,
        title: '',
        permissions: [],
        value: ''
      }
    },
    computed:{
        ...mapState('roles', ['roles']),
        ...mapGetters('permissions', ['getPermissions']),
        permissionsSelect(){
            var permissions = []
            this.permissions.forEach(element => {
                permissions.push(element.title)
            });
            return this.getPermissions.filter(data => {
                return !permissions.includes(data.title)
            })
        }
    },
    methods: {
        ...mapActions('roles', ['fetchRoles', 'saveData', 'deleteData', 'deleteRM']),
        ...mapActions('permissions', ['fetchPermissions']),
      handleEdit(index, row) {
        console.log(index, row);
        this.title = row.title
        this.id = row.id
        this.permissions = row.permissions

        this.editing = true

        this.showDialogForm()
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.deleteData(row.id)
      },
      handleCreate(){
          this.permissions = []

          this.showDialogForm()
      },
      handleClose(index, permission){
          console.log("Index: ", (index + 1))
          this.deleteRM({permission: permission, id: this.id  })
          this.permissions.splice(index, 1)
          console.log("Permissions: ", this.permissions)
      },
      handleChange(){
          console.log(this.value, this.permissions)
          this.permissions.push(this.value)
          this.value = ''
      },
      showDialogForm(){
          this.showDialog = true
      },
      createData(){
          this.saveData({ title: this.title, permissions: this.permissions })
          this.showDialog = false
          this.title = ''
          this.permissions = []
      },
      editData(){
          var payload = {
              id: this.id,
              title: this.title,
              permissions: this.permissions
          }
          this.saveData(payload)

          this.showDialog = false

          this.id = null
          this.title = ''
          this.permissions = []
      },
      reset(){
          this.fetchRoles()
          this.showDialog = false
          this.title = '',
          this.permissions = [],
          this.id = null
      }
    },
    created(){
        this.fetchRoles()
        this.fetchPermissions()
    }
  }
</script>

<style scoped>
/*Floating action button*/
.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#004379;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
}

.my-float{
	margin-top:22px;
}

/*Tags*/
.tags-container{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

</style>