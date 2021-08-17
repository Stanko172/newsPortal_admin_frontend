<template>
  <div v-if="$ability.can('dashboard_access', 'all')">

    <el-row :gutter="10" style="margin-top: 1em;">
      <el-col :span="6">

        <!--Prvi card-->
        <el-card class="info-card">
          <el-row>
            <el-col :span="8">
              <i class="far fa-newspaper info-card-icon"></i>
            </el-col>
            <el-col :span="16" class="info-card-col">
              <p class="info-card-text">{{ data.articles_num }}</p>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

      <el-col :span="6">

        <!--Drugi card-->
        <el-card class="info-card">
          <el-row>
            <el-col :span="8">
              <i class="fas fa-eye info-card-icon"></i>
            </el-col>
            <el-col :span="16" class="info-card-col">
              <p class="info-card-text">{{ data.views_num }}</p>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

      <el-col :span="6">

        <!--Treći card-->
        <el-card class="info-card">
          <el-row>
            <el-col :span="8">
              <i class="fas fa-comment info-card-icon"></i>
            </el-col>
            <el-col :span="16" class="info-card-col">
              <p class="info-card-text">{{ data.comments_num }}</p>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

      <el-col :span="6">

        <!--Četvrti card-->
        <el-card class="info-card">
          <el-row>
            <el-col :span="8">
              <i class="fas fa-users info-card-icon"></i>
            </el-col>
            <el-col :span="16" class="info-card-col">
              <p class="info-card-text">{{ data.users_num }}</p>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

      <!--Najpopularnije kategorije prema pregledima-->
      <el-col :span="24">
        <el-row>
          <el-col :span="10" class="categories-container">

            <el-row class="category-container" v-for="(item, index) in data.views_per_category" :key="index">
              <el-col class="category-number" :span="4">{{ index + 1}}</el-col>
              <el-col class="categores-name" :span="20">
                <p>{{ item.name }} - {{ item.sum }}</p>
              </el-col>
            </el-row>

          </el-col>

      <!--table-->
          <el-col :span="14" class="table-container user-articles-container">
            <el-table
            :data="data.articles_per_user"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="Ime">
            </el-table-column>
            <el-table-column
              prop="total"
              label="Ukupno">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="Datum kreiranja">
            </el-table-column>
          </el-table>
          </el-col>
        </el-row>

      <!--Chart-->
        <el-row style="margin-top: 1em;">
          <el-col :span="12" class="chart-container">
            <Chart :data="data.users_chart_data"/>
          </el-col>
          <el-col :span="12" class="chart-container">
      <!--Comments chart-->
            <Chart :data="data.comments_chart_data"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ABILITY_TOKEN } from '@casl/vue';
import { mapActions, mapState } from 'vuex'
import Chart from '../components/dashboard/Chart.vue'
export default {
  components:{
    Chart
  },
  inject: {
      $ability: { from: ABILITY_TOKEN }
  },
  data(){
    return{
      
    }
  },
  computed:{
    ...mapState('dashboard', ['data'])
  },
  methods:{
    ...mapActions('dashboard', ['setData'])
  },
  created(){
    this.setData()
  }
}
</script>

<style scoped>
.info-card{
  padding: 2em;
}

.info-card-icon{
  font-size: 54px;
}

.info-card-text{
  font-size: 28px;
}

.info-card-col{
  display: flex;
  justify-content: center;
  align-items: center;
}

.fa-newspaper{
  color: #004379;
}

.fa-eye{
  color: #00b300
}

.fa-comment{
  color:	#FFCC00;
}

.fa-users{
  color: #ED1C24;
}

/*User - Articles*/
.user-articles-container{
  overflow: scroll;
  margin-top: 2em;
  max-height: 600px;
}

/*category*/
.categories-container{
  overflow: scroll;
  margin-top: 2em;
  max-height: 600px;
}

.category-container{
  margin-top: 0.3em;
  color: #fff;
}

.category-number, .category-name{
  padding: 1.3em;
}

.category-number{
  background: #ED1C24;
}

.categores-name{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #004379;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/*Chart*/ 
.chart-container{
  display: flex;
  justify-content: center;
  align-items: center;
}

/*Table*/
.table-container{
  margin-top: 2em;
}
</style>