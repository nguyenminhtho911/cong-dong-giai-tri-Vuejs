<template>
  <div>
    <h1 class="py-4 text-center">Quản lý bài viết</h1>
    <b-table
      bordered
      striped
      responsive
      :items="getListPostOfCurrentUser"
      :fields="fields"
      v-if="!loadingTable && getListPostOfCurrentUser"
      head-variant="dark"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(url_image)="data">
        <img :src="data.value" alt="image" style="width: 50px" />
      </template>

      <template #cell(status)="data">
        <b-form-checkbox
          :checked="isChecked(data.item)"
          :switch="true"
          @change="handleUpdatePostStatus(data.item)"
        ></b-form-checkbox>
      </template>

      <template #cell(actions)="data">
        <b-button variant="danger" @click="handleDeletePost(data.item)"
          ><i class="fa fa-trash" aria-hidden="true"></i
        ></b-button>
        <b-button variant="primary" @click="handleEditPost(data.item)"
          ><i class="fa fa-edit" aria-hidden="true"></i
        ></b-button
        >
      </template>
    </b-table>

    <b-skeleton-table
      v-else
      :rows="4"
      :columns="6"
      :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      fields: [
        {
          key: "index",
          label: "STT",
          tdClass: "align-middle",
        },
        {
          key: "PID",
          label: "ID",
          tdClass: "align-middle",
          sortable: false,
        },
        {
          key: "url_image",
          label: "Ảnh",
          tdClass: "align-middle",
          sortable: false,
        },
        {
          key: "post_content",
          label: "Nội dung",
          tdClass: "align-middle",
        },
        {
          key: "time_added",
          label: "Ngày đăng",
          tdClass: "align-middle",
          sortable: true,
        },
        {
          key: "status",
          label: "Trạng thái",
          tdClass: "align-middle",
        },
        {
          key: "actions",
          label: "Hành động",
          tdClass: "align-middle",
        },
      ],
      items: [],
      loadingTable: false,
    };
  },
  watch: {},
  created() {},
  computed: {
    ...mapGetters(["getListPostOfCurrentUser"]),

    isChecked() {
      return function (item) {
        return item.status == 1;
      };
    },
  },
  methods: {
    ...mapActions(["deletePost", "togglePostStatus"]),

    handleDeletePost(post) {
      if (confirm("Bạn có muốn xóa bài viết " + post.post_content + "?")) {
        let postid = post.PID;
        this.deletePost(postid).then((res) => {
          if (res.ok) {
            alert(res.data);
          } else {
            alert(res.error);
          }
        });
      }
    },

    handleEditPost(post) {
      this.$router.push({ name: "post-edit", params: { id: post.PID } });
    },

    handleUpdatePostStatus(post) {
      this.togglePostStatus(post).then((res) => {
        if (res.ok) {
          alert(res.message);
        }
      });
    },
  },
};
</script>

<style>
</style>