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
            class="folling-user-photo"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="AdminMain-tweet-msg">
            <div class="name">
              Apple<span class="name-app"> @apple．3小時</span>
            </div>
            <div class="msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
          </div>
          <div class="delete">
            <i class="far fa-trash-alt" style="font-size: 20px"></i>
          </div>
        </div>
        <div class="AdminMain-tweet">
          <img
            class="folling-user-photo"
            src="https://picsum.photos/300/300"
            alt=""
          />
          <div class="AdminMain-tweet-msg">
            <div class="name">
              Apple<span class="name-app"> @apple．3小時</span>
            </div>
            <div class="msg">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </div>
          </div>
          <div class="delete">
            <i class="far fa-trash-alt" style="font-size: 20px"></i>
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
.folling-user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.AdminMain-tweet-msg {
  margin-left: 10px;
}
.name {
  font-size: 15px;
  font-weight: 700;
  color: black;
}
.name-app {
  color: rgba(101, 119, 134, 1);
}
.msg {
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  color: black;
}
.far {
  color: rgba(101, 119, 134, 1);
}
.far:hover {
  cursor: pointer;
}
</style>