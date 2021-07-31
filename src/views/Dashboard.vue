<template>
  <div>
      <Navigation />
      <h1>Dashboard</h1>
      <div v-if="user">
        <h3>{{ user.name }}</h3>
        <h4>{{ user.email }}</h4>
      </div>

      <button @click.prevent="handleLogout">Logout</button>

      <h1>Image upload testing!</h1>
      <div>
          Učitaj sliku:
          <input type="file" v-on:change="onChange"> <br><br>

          <input type="button" value="Učitaj" @click="formSubmit"> <br /><br />

          <img v-bind:src="imagePreview" width="100" height="100" v-show="showPreview"/> 

            

          <div v-if="success != ''">
            {{success}}
            <img src="http://127.0.0.1:8000/storage/uploads/1627740946_Slika zaslona s 2021-05-03 11-21-47.png" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import api from "../api/api"
import Navigation from "../components/Navigation.vue"
export default {
    components:{
        Navigation
    },
    data(){
        return{
            name: '',
            file: '',
            success: '',
            imagePreview: null,
            showPreview: false,
        }
    },
    computed:{
        ...mapState('auth', ['user'])
    },
    methods:{
        ...mapActions('auth', ['logout', 'getUser']),
        handleLogout(){
            this.logout()
        },
        onChange(e) {
                this.file = e.target.files[0];

                let reader  = new FileReader();

                reader.addEventListener("load", function () {
                    this.showPreview = true;
                    this.imagePreview = reader.result;
                }.bind(this), false);

                 if( this.file ){
                    /*
                        Ensure the file is an image file.
                    */
                    if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {

                        console.log("here");
                        /*
                        Fire the readAsDataURL method which will read the file in and
                        upon completion fire a 'load' event which we will listen to and
                        display the image in the preview.
                        */
                        reader.readAsDataURL( this.file );
                    }
                }
            },
        formSubmit(e) {
            e.preventDefault();
            let existingObj = this;

            let data = new FormData();

            data.append('is_title_image', '1')

            data.append('file', this.file);
            data.append('title', 'Testni upload');
            data.append('body', 'Testni upload tekst.');
            data.append('recommended', '0');
            data.append('category_id', 1);

            api.post('/auth/articles/create', data)
            .then(function (res) {
                existingObj.success = res.data.success;
            })
            .catch(function (err) {
                existingObj.output = err;
            });
            }
    },
    mounted(){

        this.getUser()
        
        api.get('/abilities').then((response) => {
                console.log(response.data)
            })
        
    }
}
</script>

<style>

</style>