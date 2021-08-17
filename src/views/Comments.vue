<template>
<div v-if="$ability.can('comments_access', 'all')">
  <el-table
    :data="comments.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column label="Datum">
      <template #default="scope">
        <span>
          {{  moment(scope.row.created_at).format("YYYY-MM-DD HH:mm:ss")  }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="Sadržaj"
      prop="content">
    </el-table-column>
    <el-table-column
      label="Korisnik"
      prop="user.name">
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
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
import { ABILITY_TOKEN } from '@casl/vue';
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
  export default {
    inject: {
      $ability: { from: ABILITY_TOKEN }
    },
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
        ...mapState('comments', ['comments'])
    },
    methods: {
        ...mapActions('comments', ['fetchComments', 'saveData', 'deleteData']),
      handleEdit(index, row) {
        console.log(index, row.id);
        this.title = row.name
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
    },
    created(){
        this.fetchComments()
        this.moment = moment
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