
<template>
  <div class="container">
      <div class="center">
        <el-row>
            <el-col class="cw">
                <h3>Registracija</h3>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-input placeholder="Unesite korisničko ime" v-model="form.name"></el-input>
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

        <el-row>
            <el-col>
                <el-input placeholder="Ponovite lozinku" v-model="form.password_confirmation" show-password></el-input>
            </el-col>
        </el-row>

        <el-row class="mt">
            <el-col>
                <el-button type="success" round @click.prevent="handleRegister">Registracija</el-button>
            </el-col>
        </el-row>

        <div class="mt">
            <router-link to="/login">Prijava</router-link>
        </div>  

        <el-row class="mt">
            <el-col class="cw">
                <div v-if="registerErrors">
                    {{ registerErrors }}
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data(){
        return{
            form:{
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
            }
        }
    },
    computed:{
        ...mapState('auth', ['registerResponse', 'registerErrors'])
    },
    methods:{
        ...mapActions('auth', ['register']),
        handleRegister(){
            this.register(this.form)
        }
    },
    mounted(){
        this.eventBus.on('test', (args) => {
            alert(args)
        })
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