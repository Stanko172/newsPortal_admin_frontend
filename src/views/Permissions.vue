<template>
<div>
  <el-table
    :data="permissions.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Datum"
      prop="created_at">
    </el-table-column>
    <el-table-column
      label="Naziv"
      prop="title">
    </el-table-column>
    <el-table-column
      align="right">
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
  </el-form>
  <template #footer v-if="!editing">
    <span class="dialog-footer">
      <el-button @click="showDialog = false">Odustani</el-button>
      <el-button type="primary" @click="createData">Spremi</el-button>
    </span>
  </template>
  <template #footer v-else>
    <span class="dialog-footer">
      <el-button @click="showDialog = false">Odustani</el-button>
      <el-button type="primary" @click="editData">Spremi</el-button>
    </span>
  </template>
</el-dialog>

  <!--Floating action button-->
  <a href="#" class="float" @click="showDialogForm">
    <i class="fa fa-plus my-float"></i>
  </a>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    data() {
      return {
        showDialog: false,
        editing: false,
        search: '',
        id: null,
        title: ''
      }
    },
    computed:{
        ...mapState('permissions', ['permissions'])
    },
    methods: {
        ...mapActions('permissions', ['fetchPermissions', 'saveData', 'deleteData']),
      handleEdit(index, row) {
        console.log(index, row.id);
        this.title = row.title
        this.id = row.id

        this.editing = true

        this.showDialogForm()
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.deleteData(row.id)
      },
      showDialogForm(){
          this.showDialog = true
      },
      createData(){
          this.saveData({ title: this.title })
          this.showDialog = false
          this.title = ''
      },
      editData(){
          var payload = {
              id: this.id,
              title: this.title
          }
          this.saveData(payload)

          this.showDialog = false

          this.id = null
          this.title = ''
      }
    },
    created(){
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

</style>