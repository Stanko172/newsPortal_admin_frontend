<template>
  <div>
    <el-row justify="center">
      <el-col :span="20">
        <el-row>
          <el-col :span="14">
            <el-form>
              <el-form-item label="Naslov članka: ">
                <el-input v-model="article.title"></el-input>
              </el-form-item>
              <el-form-item label="Kategorija članka: ">
                <el-select v-model="article.category_name" placeholder="Odaberite kategoriju">
                  <el-option v-for="(category, index) in categories" :key="index" :label="category" :value="category"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Preporučeno: ">
                <el-select v-model="article.recommended" placeholder="da/ne">
                  <el-option label="Da" :value="1"></el-option>
                  <el-option label="Ne" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <!--Drag and drop za naslovnu sliku-->
            <h1>Učitavanje naslovne slike</h1>
            <div>
                Učitaj sliku:
                <input type="file" v-on:change="onChange"> <br><br>

                <img v-bind:src="imagePreview" width="100" height="100" v-show="showPreview"/> 

            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <editor
              api-key="l56kl2prykn8jmqdnpdc65a316iy7mtl6po75ye9a6kjrlc0"
              :init="{height: 500}"
              v-model="article.body"
            />
          </el-col>
          <!--Drag and drop za preostale slike-->
          <el-col :span="10">
            <h1>Učitavanje slika</h1>
            <div>
                Učitaj sliku:
                <input type="file" v-on:change="onChangeMultiple"> <br><br>

                <el-row justify="center">
                  <el-col :span="12" v-for="(img, index) in imagePreviewMultiple" :key="index">
                    <img v-bind:src="img" width="150" v-show="showPreviewMultiple"/>
                  </el-col>
                </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--Floating action button-->
    <a href="#" class="float" @click="formSubmit">
      <i class="fas fa-save my-float"></i>
    </a>
  </div>
</template>

<script>
import api from '../api/api'
import Editor from '@tinymce/tinymce-vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    'editor': Editor
  },
  data(){
    return{
      name: '',
      file: '',
      filem: '',
      files: [],
      success: '',
      imagePreview: null,
      imagePreviewMultiple: [],
      showPreview: false,
      showPreviewMultiple: false,
      article:{
        title: '',
        body: '',
        category_name: '',
        recommended: 0
      },
    }
  },
  computed:{
      ...mapState('article', ['categories'])
  },
  methods:{
      ...mapActions('article', ['fetchCategories']),
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
  onChangeMultiple(e) {
    this.filem = e.target.files[0];
    console.log("File: ", this.filem)
    this.files.push(e.target.files[0])
    console.log("Files: ", this.files)
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
        this.showPreviewMultiple = true;
        this.imagePreviewMultiple.push(reader.result);
    }.bind(this), false);
      if( this.filem ){
        /*
            Ensure the file is an image file.
        */
        if ( /\.(jpe?g|png|gif)$/i.test( this.filem.name ) ) {
            console.log("here");
            /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
            */
            reader.readAsDataURL( this.filem );
        }
    }
  },
  formSubmit(e) {
    e.preventDefault();
    let existingObj = this;
    let data = new FormData();
    data.append('file', this.file);
    for (var i = 0; i < this.files.length; i++) {
        data.append('files[]', this.files[i]);
    }
    data.append('recommended', this.article.recommended);
    data.append('title', this.article.title);
    data.append('body', this.article.body);
    data.append('category_name', this.article.category_name);
    console.log(data)
    api.post('admin/article/create', data)
    .then(function (res) {
        existingObj.success = res.data.success;
    })
    .catch(function (err) {
        existingObj.output = err;
    });
    }
  },
  created(){
      this.fetchCategories()
  }
}
</script>

<style>
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
	margin-top:20px;
  font-size: 22px;
}
</style>