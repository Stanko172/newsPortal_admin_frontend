<template>
<div v-if="loaded">
  <el-table
    :data="users.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Ime i prezime"
      prop="name"
      width="250px"
      >
    </el-table-column>

    <el-table-column
      label="Role">
      <template #default="scope">
            <el-row justify="start">
                <el-col :span="5" v-for="(role, index) in scope.row.roles" :key="index" style="padding: 0.2em;">
                    <el-tag>
                    {{ role.title }}
                </el-tag>
                </el-col>
            </el-row>
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
<el-dialog title="Role" v-model="showDialog">
  <el-form>
    <el-form-item label="Naziv">
      <el-input v-model="title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="E-mail">
      <el-input v-model="email" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="Role: ">
  <el-select v-model="value" placeholder="Select" @change="handleChange">
    <el-option
      v-for="(item, index) in rolesSelect"
      :key="index"
      :label="item.title"
      :value="item">
    </el-option>
  </el-select>
  </el-form-item>
  </el-form>
  <el-card>
    <div class="tags-container">
        <el-tag v-for="(role, index) in roles" :key="index" closable @close="handleClose(index, role)">
            {{ role.title }}
        </el-tag>
    </div>
    </el-card>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="reset">Odustani</el-button>
      <el-button type="primary" @click="editData">Spremi</el-button>
    </span>
  </template>
</el-dialog>
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
        email: '',
        password: '',
        roles: [],
        value: ''
      }
    },
    computed:{
        ...mapState('users', ['users', 'loaded']),
        ...mapGetters('roles', ['getRoles']),
        rolesSelect(){
            var roles = []
            this.roles.forEach(element => {
                roles.push(element.title)
            });
            console.log("Role: ", this.getRoles)
            return this.getRoles.filter(data => {
                return !roles.includes(data.title)
            })
        }
    },
    methods: {
        ...mapActions('users', ['fetchUsers', 'saveData', 'deleteData', 'deleteRM']),
        ...mapActions('roles', ['fetchRoles']),
      handleEdit(index, row) {
        console.log(index, row);
        this.title = row.name
        this.email = row.email
        this.id = row.id
        this.roles = row.roles

        this.editing = true

        this.showDialogForm()
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.deleteData(row.id)
      },
      handleClose(index, role){
          console.log("Index: ", (index + 1))
          this.deleteRM({role: role, id: this.id  })
          this.roles.splice(index, 1)
          console.log("roles: ", this.roles)
      },
      handleChange(){
          console.log(this.value, this.roles)
          this.roles.push(this.value)
          this.value = ''
      },
      showDialogForm(){
          this.showDialog = true
      },
      editData(){
          var payload = {
              id: this.id,
              title: this.title,
              email: this.email,
              roles: this.roles,
          }
          this.saveData(payload)

          this.showDialog = false

          this.id = null
          this.title = ''
          this.roles = []
      },
      reset(){
          this.fetchRoles()
          this.showDialog = false
          this.title = '',
          this.roles = [],
          this.id = null
      }
    },
    created(){
        this.fetchUsers()
        this.fetchRoles()
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