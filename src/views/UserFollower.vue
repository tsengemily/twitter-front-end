<template>
  <div class="page-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- 導覽列 -->
        <div class="left">
          <Navbar
            v-bind:isSetting="isSetting"
            v-bind:MainPage="MainPage"
            v-bind:PersonalInfo="PersonalInfo"
          />
        </div>

        <!-- 主要內容 -->
        <div class="main">
          <UserHeader
            :user-id="user.id"
            :user-name="user.name"
            :user-tweets-count="user.tweetCount"
          />
          <ul class="nav">
            <li class="nav-item active">跟隨者</li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'user-following', params: { id: user.id } }"
                class="link-btn"
              ></router-link>
              正在跟隨
            </li>
          </ul>
          <UserFollowerCard
            v-for="follower in followers"
            :key="follower.followerId"
            :initial-follower="follower"
          />
          <div v-if="followers.length < 1" class="no-data">沒有跟隨者</div>
        </div>
        <!-- 跟隨誰 -->
        <div class="right">
          <div class="top-users-container">
            <h1 class="top-users-title">跟隨誰</h1>
            <Top10User
              v-for="topUser in topUsers"
              :key="topUser.id"
              :initial-top-user="topUser"
            />
            <div class="top-users-more">顯示更多</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import UserHeader from "../components/UserHeader";
import UserFollowerCard from "../components/UserFollowerCard";
import Top10User from "../components/Top10User";
import Spinner from "../components/Spinner";
import { mapState } from "vuex";
import UserAPI from "../apis/user";
import { Toast } from "../utils/helpers";

export default {
  name: "UserFollower",
  components: {
    Navbar,
    UserHeader,
    UserFollowerCard,
    Top10User,
    Spinner,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        tweetCount: 0,
      },
      followers: [],
      topUsers: [],
      isLoading: true,
      MainPage: false,
      isSetting: false,
      PersonalInfo: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser({ userId });
    this.fetchFollower({ userId });
    this.fetchTopUsers();
    const currentPath = this.$router.history.current.name;
    if (currentPath === "user-follower") {
      this.MainPage = false;
      this.isSetting = false;
      this.PersonalInfo = true;
    }
  },
  methods: {
    //取得使用者名稱
    async fetchUser({ userId }) {
      try {
        this.isLoading = true;
        const { data } = await UserAPI.get({ userId });

        const { id, name, isSelf, tweetCount } = data;

        this.user = {
          ...this.user,
          id,
          name,
          tweetCount,
        };
        this.currentUser = isSelf;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "載入資料失敗，請稍後再試",
        });
      }
    },
    //取得跟隨者
    async fetchFollower({ userId }) {
      try {
        this.isLoading = true;

        const { data } = await UserAPI.getFollowers({ userId });

        this.followers = data;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "載入資料失敗，請稍後再試",
        });
      }
    },
    //取得topUsers
    async fetchTopUsers() {
      try {
        this.isLoading = true;

        const { data } = await UserAPI.getUsersTop();

        this.topUsers = data;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "載入資料失敗，請稍後再試",
        });
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser({ userId });
    this.fetchFollower({ userId });
    this.fetchTopUsers();
    next();
  },
};
</script>

<style scoped>
/* page共用 */
.page-container {
  /* outline: 1px solid red; */
  width: 960px;
  margin: 20px auto 0;
}

.row {
  margin: 0;
}

.left {
  /* outline: 5px solid green; */
  width: 25%;
}

.main {
  width: 50%;
  /* outline: 5px solid red; */
}

/* 右欄:跟隨誰的樣式 */
.right {
  /* outline: 5px solid blue; */
  position: relative;
  width: 25%;
}

.top-users-container {
  position: absolute;
  top: 15px;
  left: 20px;
  background-color: #f5f8fa;
  border-radius: 14px;
  width: 220px;
}

.top-users-title {
  padding: 5px 15px;
  font-weight: 700;
  font-size: 16px;
  line-height: 35px;
  border-bottom: 1px solid #e6ecf0;
}

.top-users-more {
  padding: 5px 15px;
  font-size: 13px;
  line-height: 30px;
  color: #ff6600;
}
/* 複製結束 */

/* 當頁 */
.nav {
  border-bottom: 1px solid #e6ecf0;
}

.nav-item {
  position: relative;
  width: 110px;
  padding: 16px 0;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  text-decoration: none;
  cursor: pointer;
}

.nav-item:hover {
  color: #ff6600;
}

.link-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.active {
  border-bottom: 2px solid #ff6600;
  color: #ff6600;
}

.no-data {
  margin: 20px;
  font-size: 18px;
  color: #657786;
}
</style>