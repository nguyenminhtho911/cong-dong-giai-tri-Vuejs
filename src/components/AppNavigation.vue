<template>
  <nav>
    <ul class="ass1-header__menu">
      <li>
        <a href="javascript:void(0)">Danh mục</a>
        <div class="ass1-header__nav" style="display: none">
          <div class="container">
            <ul>
              <li v-for="item in categories" v-bind:key="item.id">
                <router-link v-bind:to="getLinkCategory(item)">{{
                  item.text
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="ass1-header__menu-transition"></div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { removeVietnameseFromString } from "../helpers";
export default {
  name: "app-navigation",
  methods: {
    getLinkCategory(category) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(category.text),
          tagIndex: category.id,
        },
      };
    },
  },
  computed: {
    categories() {
      return this.$store.state.post.categories;
    },
  },
};
</script>

<style scoped>
.ass1-header__nav > .container ul {
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
}
.ass1-header__nav > .container ul li {
  width: 25%;
}
@media screen and (max-width: 767px) {
  .ass1-header__nav > .container ul li {
    width: 50%;
  }
}
.ass1-header__nav > .container ul li:first-child {
  margin-top: 8px;
}
</style>