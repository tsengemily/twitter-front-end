<template>
  <div class="card-container d-flex">
    <router-link 
        to="/user/self/follower"
        class="post-link"
    ></router-link>
    <router-link 
      :to="{name: 'user', params: {id: tweet.UserId}}"
      class="user-link"
    >
      <img 
        class="user-avatar"
        :src="tweet.User.avatar"
      >
    </router-link>

    <div>
      <div class="d-flex">
        <h1 class="user-name">
          {{tweet.User.name}}
        </h1>
        <span class="user-account ml-2">
          @{{tweet.User.account}}
        </span> ．
        <span class="post-time">
          {{tweet.createdAt | fromNow}}
        </span>
      </div>
      <p class="post-txt">
        {{tweet.description}}
      </p>
      <div class="d-flex mt-2">
        <div class="comment">
          <img src="../assets/comment.png">
            {{replyCount}}
        </div>
        <div class="like">
          <template 
            v-if="tweet.isLikedbyMe"
          >
            <img 
              src="../assets/addlike.png"
              @click="deleteLike(tweet.id)" 
            >
          </template>
          <template
            v-else
          >
            <img 
              src="../assets/like.png"
              @click="addLike(tweet.id)"
            >
          </template>
            {{likeCount}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PostCard',
  props: {
    initialTweet: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      tweet: this.initialTweet,
      replyCount: this.initialTweet.Replies.length,
      likeCount: this.initialTweet.Likes.length,
    }
  },
  methods: {
    addLike () {
      //post:api/tweets/{tweetId}/like
      this.tweet = {
        ...this.tweet,
        isLikedbyMe: true
      }
      this.likeCount = this.likeCount + 1 
    },
    deleteLike() {
      //post:api/tweets/{tweetId}/unlike
      this.tweet = {
        ...this.tweet,
        isLikedbyMe: false
      }
      this.likeCount = this.likeCount - 1 
    }
  },
  filters: {
    fromNow (datetime) {
      if (!datetime) {
        return '-'
      }
      return moment(datetime).fromNow()
    }
  }, 
}
</script>

<style scoped>
  .card-container {
    outline: 1px solid gray;
    padding: 15px 15px 0 15px;
    border-top: 1px solid #e6ecf0;
    position: relative;
    overflow: hidden;
  }

  .user-link,
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .post-link {
    /* outline: 1px solid gray; */
    position: absolute;
    left: 70px;
    width: calc(100% - 80px);
    height: calc(100% - 40px);
  }

  .user-name {
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
    color: #1c1c1c;
  }

  .user-account,
  .post-time {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #657786;
  }

  .post-txt {
    margin-bottom: 0;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #1c1c1c;

  }

  .comment,
  .like {
    font-size: 13px;
    color: #657786;
  }

  .comment {
    margin-right: 50px;
  }

  .like {
    cursor: pointer;
  }

  .comment img,
  .like img {
    width: 12px;
    height: 12px;
  }
</style>