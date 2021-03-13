<template>
  <div class="page-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- 導覽列 -->
        <div class="left">
          <Navbar
            :isSetting="isSetting"
            :MainPage="MainPage"
            :PersonalInfo="PersonalInfo"
            :ChatRoom="ChatRoom"
          />
        </div>

        <!-- 主要內容 -->
        <div class="main">
          <UserHeader
            :user-id="user.id"
            :user-name="user.name"
            :user-tweets-count="user.tweetCount"
          />
          <UserProfileCard
            :initial-user="user"
            @after-add-follow-profile="afterAddFollowProfile"
            @after-delete-follow-profile="afterDeleteFollowProfile"
          />
          <div class="d-flex">
            <router-link
              :to="{ name: 'user-following', params: { id: user.id } }"
              class="user-following"
            >
              <strong>{{ user.followingCount }}個</strong>跟隨中
            </router-link>
            <router-link
              :to="{ name: 'user-follower', params: { id: user.id } }"
              class="user-follower"
            >
              <strong>{{ user.followerCount }}位</strong>跟隨者
            </router-link>
          </div>
          <div class="nav">
            <router-link
              class="nav-item"
              :to="{ name: 'user', params: { id: user.id } }"
            >
              推文
            </router-link>
            <router-link
              class="nav-item active"
              :to="{ name: 'user-with-replies', params: { id: user.id } }"
            >
              推文與回覆
            </router-link>
            <router-link
              class="nav-item"
              :to="{ name: 'user-likes', params: { id: user.id } }"
            >
              喜歡的內容
            </router-link>
          </div>
          <TweetReplyCard :initial-tweets-replies="tweetsReplies" />
          <div v-if="tweetsReplies.length < 1" class="no-data">
            沒有推文與回覆
          </div>
        </div>
        <!-- 跟隨誰 -->
        <div class="right">
          <div class="top-users-container">
            <h1 class="top-users-title">跟隨誰</h1>
            <Top10User
              v-for="topUser in topUsers"
              :key="topUser.id"
              :initial-top-user="topUser"
              @after-add-follow="afterAddFollow"
              @after-delete-follow="afterDeleteFollow"
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
import UserProfileCard from "../components/UserProfileCard";
import TweetReplyCard from "../components/TweetReplyCard";
import Top10User from "../components/Top10User";
import Spinner from "../components/Spinner";
import { mapState } from "vuex";
import UserAPI from "../apis/user";
import { Toast } from "../utils/helpers";

export default {
  name: "User",
  components: {
    Navbar,
    UserHeader,
    UserProfileCard,
    TweetReplyCard,
    Top10User,
    Spinner,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        email: "",
        account: "",
        cover: "",
        avatar: "",
        introduction: "",
        isFollowed: false,
        followerCount: 0,
        followingCount: 0,
        tweetCount: 0,
      },
      tweetsReplies: [],
      topUsers: [],
      isLoading: true,
      MainPage: false,
      isSetting: false,
      PersonalInfo: false,
      ChatRoom: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchTopUsers();
    this.fetchUser({ userId });
    this.fetchTweetsReplies({ userId });
    const currentPath = this.$router.history.current.name;
    console.log(currentPath);
    if (currentPath === "user-with-replies" && userId === this.currentUser.id) {
      this.MainPage = false;
      this.isSetting = false;
      this.PersonalInfo = true;
      this.ChatRoom = false;
    }
  },
  methods: {
    //取得使用者資料
    async fetchUser({ userId }) {
      try {
        this.isLoading = true;

        const { data } = await UserAPI.get({ userId });

        const {
          id,
          name,
          email,
          account,
          cover,
          avatar,
          introduction,
          isFollowed,
          followerCount,
          followingCount,
          tweetCount,
        } = data;
        this.user = {
          ...this.user,
          id,
          name,
          email,
          account,
          cover,
          avatar,
          introduction,
          isFollowed,
          followerCount,
          followingCount,
          tweetCount,
        };

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
    //取得推文與回覆
    async fetchTweetsReplies({ userId }) {
      try {
        this.isLoading = true;

        const { data } = await UserAPI.getTweetsReplies({ userId });
        console.log({ data });
        this.tweetsReplies = data;

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
    //新增follow
    afterAddFollow(payload) {
      const { userId } = payload;
      if (
        userId !== this.user.id &&
        userId !== this.currentUser.id &&
        this.user.id !== this.currentUser.id
      ) {
        return;
      }
      if (this.user.id === userId) {
        this.user.followerCount += 1;
        console.log("跟隨者", this.user.followerCount);
      }
      if (this.currentUser.id !== userId && this.user.id !== userId) {
        this.user.followingCount += 1;
        console.log("跟隨中", this.user.followingCount);
      }
    },
    //刪除follow
    afterDeleteFollow(payload) {
      const { userId } = payload;
      if (
        userId !== this.user.id &&
        userId !== this.currentUser.id &&
        this.user.id !== this.currentUser.id
      ) {
        return;
      }
      if (this.user.id === userId) {
        this.user.followerCount -= 1;
        console.log("跟隨者", this.user.followerCount);
      }
      if (this.currentUser.id !== userId && this.user.id !== userId) {
        this.user.followingCount -= 1;
        console.log("跟隨中", this.user.followingCount);
      }
    },
    afterAddFollowProfile() {
      this.user.followerCount += 1;
    },
    afterDeleteFollowProfile() {
      this.user.followerCount -= 1;
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchTopUsers();
    this.fetchUser({ userId });
    this.fetchTweetsReplies({ userId });
    const currentPath = this.$router.history.current.name;
    if (currentPath === "user-follower" && userId === this.currentUser.id) {
      this.MainPage = false;
      this.isSetting = false;
      this.PersonalInfo = true;
      this.ChatRoom = false;
    }
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

/* 當頁 */
.nav {
  border-bottom: 1px solid #e6ecf0;
}

.nav-item {
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

.active {
  border-bottom: 2px solid #ff6600;
  color: #ff6600;
}

.no-data {
  margin: 20px;
  font-size: 18px;
  color: #657786;
}

.user-following,
.user-follower {
  font-size: 14px;
  line-height: 20px;
  color: #657786;
}

.user-following {
  margin-right: 20px;
  margin-left: 15px;
}

.user-following strong,
.user-follower strong {
  font-weight: 500;
  color: #000000;
}
</style>