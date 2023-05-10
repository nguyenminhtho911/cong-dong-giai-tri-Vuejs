<template>
  <div>
    <h1 class="py-4 text-center">Quản lý thành viên</h1>
    <div v-if="!loadingTable && getListMembers">
      <b-table
        bordered
        striped
        responsive
        :items="getListMembers"
        :fields="fields"
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
            :checked="data.item.status == 1"
            :switch="true"
            v-on:change="handleUpdateMemberStatus(data.item)"
          ></b-form-checkbox>
        </template>
      </b-table>

      <!--pagination-->
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="changePage(1)"
              >&laquo;</a
            >
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="changePage(currentPage - 1)"
              >‹</a
            >
          </li>

          <li
            class="page-item"
            v-for="(page, index) in displayedPages"
            :key="index"
            :class="{ active: currentPage === page }"
          >
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="changePage(page)"
              >{{ page }}</a
            >
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="changePage(currentPage + 1)"
              >›</a
            >
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="changePage(totalPages)"
              >&raquo;</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <b-skeleton-table
      v-else
      :rows="4"
      :columns="6"
      :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "admin-manage",
  data() {
    return {
      fields: [
        {
          key: "index",
          label: "STT",
          tdClass: "align-middle",
        },
        {
          key: "USERID",
          label: "ID",
          tdClass: "align-middle",
          sortable: false,
        },
        {
          key: "email",
          label: "Email",
          tdClass: "align-middle",
        },
        {
          key: "fullname",
          label: "Tên",
          tdClass: "align-middle",
        },
        {
          key: "status",
          label: "Trạng thái",
          tdClass: "align-middle",
        },
      ],
      loadingTable: false,
      perPage: 4,
      currentPage: 1,
      totalMember: 0,
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.query.page >= 1 && to.query.page <= this.totalPages) {
        this.currentPage = +to.query.page;
      } else {
        this.currentPage = 1;
      }
      this.fetchDataMemberList();
    },
  },
  computed: {
    ...mapGetters(["getListMembers"]),
    totalPages() {
      return Math.ceil(this.totalMember / this.perPage);
    },
    //pages() {
    //  const pages = [];
    //  for (let i = 1; i <= this.totalPages; i++) {
    //    pages.push(i);
    //  }
    //  return pages;
    //},

    // giới hạn nút pagination
    displayedPages() {
      let maxDisplayedPages = 4; // Số lượng trang tối đa được hiển thị
      let startPage = 1; // Trang bắt đầu của thanh pagination
      let endPage = this.totalPages; // Trang kết thúc của thanh pagination

      // Nếu tổng số trang lớn hơn số trang tối đa được hiển thị
      if (this.totalPages > maxDisplayedPages) {
        // Nếu trang hiện tại là 1 hoặc 2
        if (this.currentPage <= 2) {
          endPage = maxDisplayedPages;
        }
        // Nếu trang hiện tại là trang cuối cùng hoặc trang cuối cùng trừ 1
        else if (this.currentPage >= this.totalPages - 1) {
          startPage = this.totalPages - maxDisplayedPages + 1;
        }
        // Nếu trang hiện tại nằm giữa các trang
        else {
          startPage = this.currentPage - 2;
          endPage = this.currentPage + 1;
        }

        // Tạo mảng các trang cần hiển thị
        let pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        // Nếu trang đầu tiên không được hiển thị
        if (pages[0] > 1) {
          pages.splice(0, 0, "..."); // Thêm dấu ... vào đầu mảng
        }

        // Nếu trang cuối cùng không được hiển thị
        if (pages[pages.length - 1] < this.totalPages) {
          pages.push("..."); // Thêm dấu ... vào cuối mảng
        }

        return pages;
      }

      // Nếu tổng số trang nhỏ hơn hoặc bằng số trang tối đa được hiển thị
      else {
        // Tạo mảng các trang từ 1 đến tổng số trang
        let pages = [];
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }
    },
  },
  created() {
    if (this.$route.query.page) this.currentPage = +this.$route.query.page;
    this.fetchDataMemberList();
  },
  methods: {
    ...mapActions(["getListMemberHasPaging", "toggleMemberStatus"]),
    fetchDataMemberList() {
      let params = {
        perPage: this.perPage,
        currPage: this.currentPage,
      };
      this.getListMemberHasPaging(params).then((res) => {
        if (res.ok) {
          this.totalMember = +res.data.total;
        }
      });
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.push({ query: { page } });
      }
    },

    handleUpdateMemberStatus(member) {
      this.toggleMemberStatus(member).then((res) => {
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