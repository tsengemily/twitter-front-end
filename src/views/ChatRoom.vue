<template>
  <div class="chat-room-container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- 導覽列 -->
        <div class="left-navbar">
          <Navbar
            :isSetting="isSetting"
            :MainPage="MainPage"
            :PersonalInfo="PersonalInfo"
            :ChatRoom="ChatRoom"
          />
        </div>

        <!-- 上線使用者 -->
        <div class="user-list">
          <div class="title">上線使用者({{onlineCount}})</div>
          <!-- 一位使用者 -->
          <div 
            class="user-container d-flex align-items-center"
            v-for="user in userList"
            :key="user.id"
          >
            <router-link :to="{name: 'user', params: { id: user.id }}" class="user-avatar">
              <img :src="user.avatar" />
            </router-link>
            <div class="user-name">{{user.name}}</div>
            <div class="user-account">@{{user.account}}</div>
          </div>
        </div>

        <!-- 公開聊天室 -->
        <div class="chat-room">
          <div class="title">公開聊天室</div>
          <!-- 對話框開始 -->
          <div class="dialogue-container">
            <!-- 遠端使用者上線提示 -->
            <!-- <div class="user-active">
              <span class="user-active-txt"> 使用者上線 </span>
            </div> -->
            <!-- 歷史訊息 -->
            <div 
              class="message-box"
              v-for="publicMsg in publicMessageRecord"
              v-bind:key="publicMsg.id"
            >
            <!-- 本地使用者 -->
              <div 
                class="user local"
                v-if="parseInt(publicMsg.fromId) === currentUser.id"
              >
                <div class="message">
                  <div class="txt">
                    {{publicMsg.content}}
                  </div>
                  <div class="send-time">
                    {{new Date(publicMsg.sendTime).toLocaleString()}}
                  </div>
                </div>
              </div>
            <!-- 遠端使用者 -->
              <div 
                class="user remote"
                v-else
              >
                <div class="avatar">
                  <img :src="publicMsg.from.avatar" />
                </div>
                <div class="message">
                  <div class="txt">
                    {{publicMsg.from.name}}: 
                    {{publicMsg.content}}
                  </div>
                  <div class="send-time">{{new Date(publicMsg.sendTime).toLocaleString()}}</div>
                </div>
              </div>
            </div>
            <!-- 新訊息 -->
            <div 
              class="message-box"
              v-for="msg in messageList"
              v-bind:key="msg.sendTime"
            >
            <!-- 本地使用者 -->
              <div 
                class="user local"
                v-if="parseInt(msg.fromId) === currentUser.id"
              >
                <div class="message">
                  <div class="txt">
                    {{msg.content}}
                  </div>
                  <div class="send-time">
                    {{new Date(msg.sendTime).toLocaleString()}}
                  </div>
                </div>
              </div>
            <!-- 遠端使用者 -->
              <div 
                class="user remote"
                v-else
              >
                <div class="avatar">
                  <img :src="msg.from.avatar" />
                </div>
                <div class="message">
                  <div class="txt">
                    {{msg.from.name}}: 
                    {{msg.content}}
                  </div>
                  <div class="send-time">{{new Date(msg.sendTime).toLocaleString()}}</div>
                </div>
              </div>
            </div>
            <!-- 遠端使用者下線提示 -->
            <!-- <div 
              class="user-active"
            >
              <span class="user-active-txt"> 使用者離線 </span>
            </div> -->
          </div>
          <!-- 對話框結束 -->
          <!-- 輸入欄 -->
          <div class="send">
            <form @submit.prevent.stop="sendMessage" class="form-container">
              <input
                type="text"
                name=""
                placeholder="輸入訊息..."
                v-model="text"
                class="text-input"
              />
              <button type="submit" class="send-btn">
                <i class="far fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
// 從 Vuex 抓取使用者資料
import { mapState } from "vuex";

// 時間顯示器
import moment from "moment";

// Soket.io
const localToekn = localStorage.getItem("token");
const localUserId = localStorage.getItem("userId");
import { io } from "socket.io-client";
// "https://salty-headland-68177.herokuapp.com"
const socket = io("http://localhost:3000", {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  auth: {
    token: localToekn,
    userId: localUserId,
  },
  multiplex: false
});

export default {
  name: 'ChatRoom',
  components: {
    Navbar,
    Spinner,
  },
  data() {
    return {
      text: "",
      MainPage: false,
      isSetting: false,
      PersonalInfo: false,
      ChatRoom: true,
      isLoading: "",
      userList: [],
      messageList: [],
      userConnected: [],
      userDisconnected: [],
      publicMessageRecord: []
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    onlineCount () {
      return this.userList.length
    }
  },
  created() {
    socket.connect()
    socket.on("connect", () => {
      console.log("socket.connected!", socket.connected); // true
    });
    socket.on("usersInPublicChat", (usersInPublicChat) => {
      this.userList = JSON.parse(JSON.stringify(usersInPublicChat));
      console.log('上線使用者名單', this.userList)
      console.log("usersInPublicChat", usersInPublicChat);
    });
    socket.on("publicMessageRecord", (messageRecord) => {
      this.publicMessageRecord = messageRecord
      console.log("歷史訊息", messageRecord);
    });
    socket.onAny((event) => {
      console.log("event", event);
    });
    socket.on("connect_error", (error) => {
      console.log(error);
    });
    socket.on("publicMessageFromServer", (publicMessageFromServer) => {
      console.log("publicMessageFromServer", publicMessageFromServer);
      this.messageList.push(publicMessageFromServer);
      console.log(this.messageList);
    });
    socket.on("userConnected", (userConnected) => {
      this.userConnected.push(userConnected)
      console.log('使用者連上線:', userConnected)
    })
    socket.on("userDisconnected", (userDisconnected) => {
      this.userDisconnected.push(userDisconnected)
      console.log('使用者下線:', userDisconnected)
    })
  },
  methods: {
    sendMessage() {
      socket.emit("publicMessageFromUser", {
        content: this.text,
        fromId: localUserId,
        toId: null,
        sendTime: moment().format(),
      });
      this.text = "";
      console.log('使用者的',this.currentUser.id)
    },
  },
  mounted() {
  },
  destroyed() {
    socket.disconnect()
    socket.off("connect");
    socket.off("userConnected");
    socket.off("usersInPublicChat");
    socket.off("publicMessageRecord");
    socket.off("connect_error");
    socket.off("userDisconnected");
  },
};
</script>


<style scoped>
/* 三區塊*/
.chat-room-container {
  width: 960px;
  margin: 0 auto;
}

.left-navbar {
  /* outline: 1px solid red; */
  width: 25%;
  border-right: 1px solid #e6ecf0;
}

.user-list {
  /* outline: 1px solid red; */
  width: 25%;
  border-right: 1px solid #e6ecf0;
}

.user-container {
  /* outline: 1px solid red; */
  width: 100%;
  padding: 15px;
}

/* 上線使用者 */
.user-list {
  /* outline: 1px solid red; */
  /* background-color: gray; */
  height: 100vh;
  overflow: scroll;
}

.user-avatar > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
  object-fit: cover;
}

.user-name {
  color: #000;
  font-weight: 500;
  margin-left: 10px;
}

.user-account {
  color: #657786;
  margin-left: 7px;
}

/* 公開聊天室 */
.chat-room {
  /* outline: 1px solid red; */
  /* background-color: pink; */
  position: relative;
  width: 50%;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  border-bottom: 1px solid #e6ecf0;
  padding: 30px 15px 15px 15px;
}

/* 聊天室對話框 */
.dialogue-container {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  padding: 10px 0;
  /* text-align: center; */
}

.message-box {
  /* outline: 1px solid red; */
}

.user {
  /* background-color: pink; */
  display: flex;
  margin-bottom: 20px;
}

.remote {
  /* outline: 1px solid red; */
  align-items: flex-end;
}

.local {
  justify-content: flex-end;
}

.remote .avatar {
  /* outline: 1px solid red; */
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.remote .avatar img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  object-fit: cover;
}

.user .txt {
  /* outline: 1px solid red; */
  background: #d6e4f8;
  padding: 16px;
}

.remote .txt {
  /* outline: 1px solid red; */
  margin-left: 10px;
  margin-right: 90px;
  position: relative;
  border-radius: 30px 30px 30px 0;
}

.local .txt {
  /* outline: 1px solid green; */
  position: relative;
  border-radius: 30px 30px 0 30px;
  margin-right: 20px;
  margin-left: 90px;
  background: #ff6600;
  color: #fff;
}

.remote .send-time {
  /* outline: 1px solid red; */
  display: inline-block;
  margin-left: 20px;
  color: #657786;
  font-size: 13px;
}

.local .send-time {
  /* outline: 1px solid red; */
  text-align: right;
  margin-right: 25px;
  color: #657786;
  font-size: 13px;
}

.user-active {
  text-align: center;
  margin: 10px 0;
}

.user-active-txt {
  background-color: #c2c4c7;
  color: #657786;
  padding: 5px 15px;
  border-radius: 20px;
}

.form-container {
  /* background-color: green; */
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 20px;
}

.text-input {
  /* outline: 1px solid red; */
  width: 90%;
  border-radius: 50px;
  border: none;
  padding: 10px 20px;
  background-color: #d5d7da;
  color: #657786;
}

.send-btn {
  /* outline: 1px solid red; */
  margin-left: 10px;
  border: none;
  font-size: 20px;
  color: #ff6600;
  background: none;
}
</style>