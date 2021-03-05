<template>
  <div class="AdminMain-container">
    <div class="row">
      <!-- Navbar -->
      <AdminNavbar v-bind:TweetList="TweetList" v-bind:UserList="UserList" />
      <!-- 中間主畫面 -->
      <div class="AdminMain-main">
        <div class="AdminMain-header">推文清單</div>
        <div class="AdminMain-tweet">
          <img
            class="AdminMain-tweet-userPhoto"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="AdminMain-tweet-msg">
            <div class="AdminMain-tweet-msg-name">
              Apple<span class="AdminMain-tweet-msg-name-app">
                @apple．3小時</span
              >
            </div>
            <div class="AdminMain-tweet-msg-name-msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
          </div>
          <div class="AdminMain-tweet-delete">
            <i
              class="far fa-trash-alt AdminMain-tweet-delete-icon"
              style="font-size: 20px"
            ></i>
          </div>
        </div>
        <div class="AdminMain-tweet">
          <img
            class="AdminMain-tweet-userPhoto"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="AdminMain-tweet-msg">
            <div class="AdminMain-tweet-msg-name">
              Apple<span class="AdminMain-tweet-msg-name-app">
                @apple．3小時</span
              >
            </div>
            <div class="AdminMain-tweet-msg-name-msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
          </div>
          <div class="AdminMain-tweet-delete">
            <i
              class="far fa-trash-alt AdminMain-tweet-delete-icon"
              style="font-size: 20px"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/Admin-Navbar";
export default {
  name: "AdminMain",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      TweetList: false,
      UserList: false,
    };
  },
  created() {
    const currentPath = this.$router.history.current.name;
    if (currentPath === "AdminMain") {
      this.TweetList = true;
    }
  },
};
</script>

<style scoped>
.AdminMain-container {
  margin: 0 auto;
  width: 960px;
  height: 50px;
}
.row {
  margin: 0;
}
/* 以下為中間頁面設定 */
.AdminMain-main {
  width: 75%;
}
.AdminMain-header {
  height: 55px;
  font-size: 25px;
  line-height: 55px;
  font-weight: 900;
  margin-bottom: 20px;
}
.AdminMain-tweet {
  width: 100%;
  height: 90px;
  display: flex;
}
.AdminMain-tweet-userPhoto {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.AdminMain-tweet-msg {
  margin-left: 10px;
}
.AdminMain-tweet-msg-name {
  font-size: 15px;
  font-weight: 700;
  color: black;
}
.AdminMain-tweet-msg-name-app {
  color: rgba(101, 119, 134, 1);
}
.AdminMain-tweet-msg-name-msg {
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  color: black;
}
.AdminMain-tweet-delete-icon {
  color: rgba(101, 119, 134, 1);
}
.AdminMain-tweet-delete-icon:hover {
  cursor: pointer;
}
</style>