
<template>
<div v-if="getLoadingStatus">
  <el-row justify="end">
    <el-col :span="4">
      <el-button style="background: #004379; color: white;" @click="toggleFilters">{{ filtersShow ? 'Sakrij filtere' : 'Prikaži filtere' }} <i class="fas fa-filter"></i></el-button>
    </el-col>
  </el-row>
  <!--Filteri-->
  <el-row class="filters-container" v-show="filtersShow">
    <el-col>
      <el-card>
        <el-row>
          <el-col :span="24">
            <el-form>
              <el-row>
                <el-col :span="8">
                  <el-input-number v-model="rowsNum" :min="1" :max="getArticlesCount"></el-input-number>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-select v-model="filters.category" placeholder="Odaberite kategoriju">
                      <el-option label="Sve" value="sve"></el-option>
                      <el-option v-for="(category, index) in getCategories" :key="index" :label="category" :value="category"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-select v-model="filters.author" placeholder="Odaberite autora">
                      <el-option label="Svi" value="svi"></el-option>
                      <el-option v-for="(author, index) in getAuthors" :key="index" :label="author" :value="author"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row justify="center" :gutter="100">
              <el-col :span="8">
                <el-form-item>
                    <el-date-picker type="date" v-model="filters.date_from" placeholder="Pick a date"  style="width: 100%;"></el-date-picker>
                  <el-col class="line" :span="2">-</el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                    <el-date-picker type="date" v-model="filters.date_to" placeholder="Pick a date"  style="width: 100%;"></el-date-picker>
                  <el-col class="line" :span="2">-</el-col>
                </el-form-item>
              </el-col>
            </el-row>
            </el-form>
          </el-col>
          <el-col></el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <!--Tablica sa podacima-->
  <el-table
    :data="getArticles.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Datum"
      prop="created_at">
    </el-table-column>
    <el-table-column
      label="Naslov"
      prop="title">
    </el-table-column>
    <el-table-column
      label="Kategorija"
      prop="category_name">
    </el-table-column>
    <el-table-column
      label="Autor"
      prop="user_name">
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
          v-if="scope.row.can_action == 1"
          size="mini"
          @click="handleEdit(scope.row.id)">Edit</el-button>
        <el-button
          v-if="scope.row.can_action == 1"
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--Floating action button-->
  <a href="#" class="float">
   <router-link to="/vijesti/kreiraj"><i class="fa fa-plus my-float"></i></router-link>
  </a>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        filtersShow: false,
        search: '',
        region: '',
        rowsNum: 10,
        filters:{
          category: 'sve',
          author: 'svi',
          date_from : 'sve',
          date_to: 'sve'
        }
      }
    },
    watch:{
      rowsNum(value){
        this.fetchData({ rowsNum: value, filters: this.filters })
      },
      filters:{
        handler(value){
          console.log(value)
          this.filterData(this.filters)
        },
        deep: true
      }
    },
    computed:{
      ...mapGetters('articles', ['getArticles', 'getArticlesCount', 'getLoadingStatus', 'getCategories', 'getAuthors', 'getErrors'])
    },
    methods: {
      ...mapActions('articles', ['fetchData', 'filterData', 'deleteArticle']),
      handleEdit(id) {
        this.$router.push({path: `/vijesti/uredi/${id}`})
      },
      handleDelete(id) {
  
        this.deleteArticle({ id: id, filters: this.filters, rowsNum: this.rowsNum })

        if(this.getErrors.length != 0){
          const payload = {
            title: 'Neuspjeh',
            message: 'Članak nije izbrisan!',
            type: 'error'
          }
          this.eventBus.emit('notification', payload)
        }else{
          const payload = {
            title: 'Uspjeh',
            message: 'Članak uspješno izbrisan!',
            type: 'success'
          }
          this.eventBus.emit('notification', payload)
        }
      },
      toggleFilters(){
        this.filtersShow = !this.filtersShow
      }
    },
    created(){
      this.fetchData({ rowsNum: this.rowsNum, filters: this.filters })
    }
  }
</script>

<style>
.filters-container{
  padding: 2em 0 2em 0;
}

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
  color: white;
}

</style>
