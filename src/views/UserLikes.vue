<template>
  <PostCard 
    :initialTweets="tweetsLikes"
  />
</template>

<script>
import PostCard from '../components/PostCard'
import UserAPI from '../apis/user'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    PostCard
  },
  data () {
    return {
      tweetsLikes: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchTweetsLikes(userId)
  },
  methods: {
    //取得推文
    async fetchTweetsLikes ({ userId }) {
      try {
        const { data } = await UserAPI.getLikes({ userId })
        
        this.tweetsLikes = data
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '載入資料失敗，請稍後再試'
        })
      }
    },
  }
}
</script>