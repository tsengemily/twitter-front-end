<template>
  <div class="card-container">
    <div 
      class="tweet d-flex"
      v-for="tweetsLike in tweetsLikes"
      :key="tweetsLike.id"
    >
    <router-link 
        :to="{name: 'ReplyList', params: {id: tweetsLike.TweetId}}"
        class="post-link"
    ></router-link>
    <router-link 
      :to="{name: 'user', params: {id: tweetsLike.Tweet.User.id}}"
      class="user-link"
    >
      <img 
        class="user-avatar"
        :src="tweetsLike.Tweet.User.avatar"
      >
    </router-link>

    <div>
      <div class="d-flex">
        <h1 class="user-name">
          {{tweetsLike.Tweet.User.name}}
        </h1>
        <span class="user-account ml-2">
          @{{tweetsLike.Tweet.User.account}}
        </span> ．
        <span class="post-time">
          {{tweetsLike.createdAt | fromNow}}
        </span>
      </div>
      <p class="post-txt">
        {{tweetsLike.Tweet.description}}
      </p>
      <div class="d-flex mt-2">
        <div class="comment">
          <img src="../assets/comment.png">
            {{tweetsLike.Tweet.replyCount}}
        </div>
        <div class="like">
          <template 
            v-if="tweetsLike.Tweet.isLikedByMe"
          >
            <img 
              src="../assets/addlike.png"
              @click="deleteLike(tweetsLike.Tweet.id)" 
            >
          </template>
          <template
            v-else
          >
            <img 
              src="../assets/like.png"
              @click="addLike(tweetsLike.Tweet.id)"
            >
          </template>
            {{tweetsLike.Tweet.likeCount}}
        </div>
      </div>
    </div>
  </div>
 </div> 
</template>

<script>
import moment from 'moment'
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'

export default {
  name: 'LikeCard',
  props: {
    initialTweetsLikes: {
      type: Array,
      require: true
    }
  },
  watch: {
    initialTweetsLikes(newValue) {
      this.tweetsLikes = newValue
    }
  },
  data () {
    return {
      tweetsLikes: this.initialTweetsLikes
    }
  },
  methods: {
    async addLike (tweetId) {
      try {
        const { data } = await UserAPI.addLike({ tweetId })

         if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log(tweetId)
        this.tweetsLikes = this.tweetsLikes.map((like) => {
          if (like.Tweet.id === tweetId) {
            const newLikeCount = like.Tweet.likeCount + 1
            return {
              ...like,
                Tweet: {
                  ...like.Tweet,
                  isLikedByMe: true,
                  likeCount: newLikeCount
                }
              }
            
          } else {
            return like
          }
        })
        console.log('加入喜歡成功')
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入喜歡，請稍後再試'
        })
        console.log(error)
      }
    },
    async deleteLike(tweetId) {
      try {
         const { data } = await UserAPI.deleteLike({ tweetId })

         if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log(tweetId)
        this.tweetsLikes = this.tweetsLikes.map((like) => {
          if (like.Tweet.id === tweetId) {
            const newLikeCount = like.Tweet.likeCount - 1
            return {
              ...like,
                Tweet: {
                  ...like.Tweet,
                  isLikedByMe: false,
                  likeCount: newLikeCount
                }
              } 
          } else {
            return like
          }
        })
        console.log('移除喜歡成功')
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法移除喜歡，請稍後再試'
        })
        console.log(error)
      }
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
  .tweet {
    /* outline: 1px solid red; */
    padding: 15px;
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