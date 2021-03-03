<template>
  <div class="nav navbar-container">
    <ul class="nav mb-4 nav-container">
      <router-link to="/admin">
        <li class="nav-item">
          <img class="ac-logo" src="./../pic/AC_Logo.jpg" alt="" />
        </li>
      </router-link>
      <li class="nav-item">
        <router-link
          class="font-color"
          to="/admin_main"
          v-bind:class="{ routerLinkActive: TweetList }"
        >
          <i class="fas fa-home link-style" style="font-size: 25px">
            <span>推文清單</span></i
          >
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="font-color"
          to="/admin_users"
          v-bind:class="{ routerLinkActive: UserList }"
        >
          <i class="far fa-user link-style" style="font-size: 25px"
            ><span>使用者列表</span></i
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Admin-Navbar",
  props: {
    TweetList: {
      type: Boolean,
      default: false,
      required: true,
    },
    UserList: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {};
  },
  create() {
    // console.log(this.$route);
  },
};
</script>

<style scoped>
.navbar-container {
  width: 240px;
}
.nav-container {
  display: flex;
  flex-direction: column;
}
.font-color {
  color: black;
}
.link-style {
  text-decoration: none;
  font-weight: 900;
  margin-bottom: 40px;
}
.link-style:hover {
  color: rgba(255, 102, 0, 1);
}
.routerLinkActive {
  text-decoration: none;
  color: rgba(255, 102, 0, 1);
}
span {
  margin-left: 21px;
}
.ac-logo {
  margin-top: 14px;
  margin-bottom: calc(98px - 39px);
  width: 25px;
  height: 25px;
}
</style>

