<template>
  <div class="container">
      <div class="center">
        <el-row>
            <el-col class="cw">
                <h3>Prijava</h3>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-input placeholder="Unesite e-mail" v-model="form.email"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-input placeholder="Unesite lozinku" v-model="form.password" show-password></el-input>
            </el-col>
        </el-row>

        <el-row class="mt">
            <el-col>
                <el-button type="success" round @click.prevent="handleLogin">Prijava</el-button>
            </el-col>
        </el-row>

        <el-row class="mt">
            <el-col class="cw">
                <div v-if="loginErrors">
                    {{ loginErrors }}
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return{
            form:{
                email: "",
                password: ""
            }
        }
    },
    computed:{
        ...mapState('auth', ['loginResponse', 'loginErrors'])
    },
    methods:{
        ...mapActions('auth', ['login']),
        handleLogin(){
            this.login(this.form)
        }
    }
}
</script>

<style scoped>
    .container{
        height: 100vh;
        width: 100vw;
        display: grid;
        place-items: center;
    }
    .center{
        background: #004379;
        padding: 5em;
        border-radius: 1em;
    }
    .mt{
        margin-top: 1em;
    }
    .cw{
        color: #fff;
    }
</style>