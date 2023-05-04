<template>
  <div class="row">
    <div class="col-lg-8">
      <!--section-->
      <div class="ass1-section ass1-section__edit-post">
        <div class="ass1-section__content">
          <form action="#">
            <div class="form-group">
              <input
                v-model="url_image"
                type="text"
                class="form-control ttg-border-none"
                placeholder="https://"
              />
            </div>

            <div class="form-group">
              <textarea
                v-model="post_content"
                type="text"
                class="form-control ttg-border-none"
                placeholder="Mô tả ..."
              ></textarea>
            </div>
          </form>

          <div class="ass1-section__image">
            <img v-bind:src="renderImage" v-on:click="uploadImage" alt="default" />
          </div>

          <a
            href="https://memeful.com/generator"
            target="_blank"
            class="ass1-btn ass1-btn-meme"
            >Chế ảnh từ meme</a
          >

          <button v-on:click="uploadImage" class="ass1-btn ass1-btn-meme">
            Đăng ảnh từ máy tính
          </button>
          <!-- ref -->
          <input
            v-on:change="handleUploadImage"
            style="display: none"
            ref="imageUpload"
            type="file"
            name="images"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <aside class="ass1-aside ass1-aside__edit-post">
        <div>
          <button v-on:click="handleUploadPost" class="ass1-btn">Đăng bài</button>
        </div>

        <div class="ass1-aside__edit-post-head">
          <span style="display: block; width: 100%; margin-bottom: 10px"
            >Chọn danh mục</span
          >

          <label
            class="ass1-checkbox"
            v-for="item in allCategories"
            v-bind:key="item.id"
          >
            <input
              v-bind:value="item.id"
              v-model="categories"
              type="checkbox"
              name="state-post"
            />
            <span></span>
            <p>{{ item.text }}</p>
          </label>
        </div>

        <div class="ass1-aside__get-code">
          <p>Share Link</p>
        </div>
        <div class="ass1-aside__social">
          <a href="" class="ass1-btn-social__facebook ass1-btn-social"
            ><i class="fa fa-facebook" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__twitter ass1-btn-social"
            ><i class="fa fa-twitter" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__google ass1-btn-social"
            ><i class="fa fa-google-plus" aria-hidden="true"></i
          ></a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { checkImageURL, checkImageFile } from "../helpers"
import { mapActions } from "vuex";

export default {
  name: "post-upload",
  data() {
    return {
      post_content: "",
      url_image: "",
      obj_image: {
        objFile: null,
        base64URL: "",
      },
      categories: [],
    };
  },
  computed: {
    allCategories() {
      return this.$store.state.post.categories;
    },

    renderImage() {
      if (this.url_image) {
        if (!checkImageURL(this.url_image)) {
          alert("Url file ảnh lên không hợp lệ!");
        } else {
          return this.url_image;
        }
      }
      else if (this.obj_image.base64URL) return this.obj_image.base64URL;
      return "/dist/images/no_image_available.jpg";
    },
  },
  methods: {
    ...mapActions(["createNewPost"]),

    uploadImage() {
      this.$refs.imageUpload.click();
      if (this.url_image) this.url_image = ""; // reset url image
    },

    handleUploadImage(e) {
      if (e.target.files && e.target.files.length) {
        const imageUpload = e.target.files[0];

        let check = checkImageFile(imageUpload);
        if (!check) {
          alert("File tải lên không hợp lệ!");
          return;
        }

        let reader = new FileReader();
        reader.addEventListener("load", () => {
          // convert image file to base64 string
          let previewSrc = reader.result;

          this.obj_image.base64URL = previewSrc;
          this.obj_image.objFile = imageUpload; // objFile để gửi lên sever
        }, false);

        if (imageUpload) {
          reader.readAsDataURL(imageUpload);
        }
      }
    },

    resetData() {
        this.categories = [];
        this.post_content = '';
        this.url_image = '';
        this.obj_image = {
            base64URL: '',
            objFile: null
        }
    },

    handleUploadPost() {
      let { post_content, url_image, categories, obj_image } = this;

      if (post_content && categories.length) {
        if (url_image || obj_image.objFile) {
          let data = {
            post_content,
            url_image,
            category: categories,
          };

          if (obj_image.objFile) data.obj_image = obj_image.objFile;

          this.createNewPost(data).then((res) => {
            if (res.ok) {
              // Reset lại toàn bộ data cũ
              this.resetData();
              alert("Đăng bài viết thành công!");
            } else {
              alert(res.error);
            }
          });
        } else {
          alert("Vui lòng upload hình ảnh bài viết");
        }
      } else {
        alert("Vui lòng nhập đầy đủ nội đụng");
      }
    },

  },
};
</script>

<style>
</style>