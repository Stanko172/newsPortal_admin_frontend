<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="230px">
    <el-menu >
        <el-menu-item index="1">
            <el-space>
            <i class="fas fa-bars"></i>
            <span><router-link to="/">Naslovnica</router-link></span>
            </el-space>
        </el-menu-item>
        <el-submenu index="2">
            <template #title>
                <el-space>
                <i class="far fa-user"></i>
                <span><router-link to="/korisnici">Upravljanje korisnicima</router-link></span>
                </el-space>
            </template>
        <el-menu-item-group>
            <el-menu-item index="2-1"><router-link to="/permisije">Permisije</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/role">Role</router-link></el-menu-item>
            <el-menu-item index="2-3"><router-link to="/korisnici">Korisnici</router-link></el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
            <el-space>
            <i class="far fa-newspaper"></i>
            <span><router-link to="/vijesti">Vijesti</router-link></span>
            </el-space>
        </el-menu-item>
        
        <el-menu-item index="4">
            <el-space>
            <i class="far fa-comments"></i>
            <span><router-link to="/komentari">Komentari</router-link></span>
            </el-space>
        </el-menu-item>
    </el-menu>
  </el-aside>

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>Tom</span>
    </el-header>

    <el-main>
      
        <router-view/>

    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

<style scoped>
    .el-aside{
        background: white !important;
    }

    .el-menu{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        margin-top: -1px;
    }

    .el-space{
        width: 220px;
    }

    .el-aside {
        color: #333;
    }

    .el-space span a{
        color: #004379;
        text-decoration: none;
        margin-right: 10px;
    }

    i{
        color: #004379 !important;
        font-size: 20px;
    }

    .icon-arrow{
        display: none !important;
    }

    .el-header{
        color: #fff;
        background: #004379;
    }
</style>