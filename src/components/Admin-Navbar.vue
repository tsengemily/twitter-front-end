<template>
  <div class="nav AdminNavbar-container">
    <ul class="nav mb-4 AdminNav-container">
      <router-link to="/admin_main">
        <li class="nav-item AdminNav-container-icon">
          <img
            class="AdminNav-container-icon-AClogo"
            src="./../pic/AC_Logo.jpg"
            alt=""
          />
        </li>
      </router-link>
      <li class="nav-item AdminNav-container-tweetList">
        <router-link
          class="AdminNav-container-tweetList-fontColor"
          to="/admin_main"
          v-bind:class="{ routerLinkActive: TweetList }"
        >
          <i
            class="fas fa-home AdminNav-container-tweetList-fontColor-linkStyle"
            style="font-size: 25px"
          >
            <span
              class="AdminNav-container-tweetList-fontColor-linkStyle-fontStyle"
              >推文清單</span
            ></i
          >
        </router-link>
      </li>
      <li class="nav-item AdminNav-container-userList">
        <router-link
          class="AdminNav-container-userList-fontColor"
          to="/admin_users"
          v-bind:class="{ routerLinkActive: UserList }"
        >
          <i
            class="far fa-user link-style AdminNav-container-userList-fontColor-linkStyle"
            style="font-size: 25px"
            ><span
              class="AdminNav-container-userList-fontColor-linkStyle-fontStyle"
              >使用者列表</span
            ></i
          >
        </router-link>
      </li>
      <li class="nav-item log-out log-out-style">
        <!-- <router-link class="log-out-style" to="/login"> -->
        <i class="fas fa-sign-out-alt" style="font-size: 25px" @click="logout"
          ><span>登出</span></i
        >
        <!-- </router-link> -->
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
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/admin");
    },
  },
  create() {
    // console.log(this.$route);
  },
};
</script>

<style scoped>
.AdminNavbar-container {
  width: 240px;
}
.AdminNav-container {
  display: flex;
  flex-direction: column;
}
.AdminNav-container-tweetList-fontColor,
.AdminNav-container-userList-fontColor {
  color: black;
}
.AdminNav-container-tweetList-fontColor-linkStyle,
.AdminNav-container-userList-fontColor-linkStyle {
  text-decoration: none;
  font-weight: 900;
  margin-bottom: 40px;
}
.AdminNav-container-tweetList-fontColor-linkStyle:hover,
.AdminNav-container-userList-fontColor-linkStyle:hover {
  color: rgba(255, 102, 0, 1);
}
.routerLinkActive {
  text-decoration: none;
  color: rgba(255, 102, 0, 1);
}
.AdminNav-container-tweetList-fontColor-linkStyle-fontStyle,
.AdminNav-container-userList-fontColor-linkStyle-fontStyle {
  margin-left: 21px;
}
.AdminNav-container-icon-AClogo {
  margin-top: 14px;
  margin-bottom: calc(98px - 39px);
  width: 25px;
  height: 25px;
}
.log-out {
  /* margin-top: 844px; */
  margin-top: 160px;
}
.log-out-style {
  color: black;
}
.log-out-style:hover {
  color: rgb(2, 117, 216);
  cursor: pointer;
}
</style>

