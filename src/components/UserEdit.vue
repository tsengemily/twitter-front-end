<template>
  <div class="modal fade" id="user-edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close-btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">
              <img src="../assets/close.png" class="close-icon">
            </span>
          </button>
          <h5 class="edit-title">編輯個人資料</h5>
          <button type="button" class="edit-close">儲存</button>
        </div>
        <div class="modal-body">
          <div class="edit-cover">
            <img src="https://picsum.photos/300/200" class="cover-img">
          </div>
           <div class="edit-avatar">
            <img src="https://picsum.photos/300/200" class="avatar-img">
          </div>
          <div class="edit-name">
            <label for="">名稱</label>
            <input type="text" class="name-input" :value="user.name">
            <div class="word-count">{{nameCount}}/50</div>
          </div>
          <div class="edit-introduction">
            <textarea name="" id="" rows="10" class="introduction-input" placeholder="自我介紹" v-model="user.introduction"></textarea>
            <div class="word-count">{{introductionCount}}/160</div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  


<script>
export default {
  data () {
    return {
      user: {
        name: '曾怡叡',
        introduction: ''
      }
    }
  },
  computed: {
    nameCount () {
      return this.user.name.length
    },
    introductionCount () {
      return this.user.introduction.length
    }
  }
}
</script>


<style scoped>
  .modal-header {
    position: relative;
  }

  .close-btn {
    border: none;
    background-color: transparent;
    width: 30px;
    height: 30px;
  }

  .close-icon {
    width: 15px;
    height: 15px;
  }

  .modal-body {
    position: relative;
  }
  
  .edit-title {
    position: absolute;
    top: 23px;
    left: 80px;
    font-size: 19px;
    font-weight: 700;
    color: #1c1c1c;
  }

  .edit-close {
    border-radius: 100px;
    border: none;
    padding: 6px 14px;
    color: #fff;
    background-color: #ff6600;
  }

  .cover-img {
    width: 100%;
    height: 200px;
    margin-bottom: 80px;
  }

  .avatar-img {
    position: absolute;
    top: 140px;
    left: 30px;
    z-index: 10;
    border-radius: 50%;
    border: 4px solid #fff;
    width: 120px;
    height: 120px;

  }

  .edit-name,
  .edit-introduction {
    position: relative;
    font-weight: 500;
    font-size: 15px;
    color: #657786;
    margin-bottom: 40px;
  }


  .edit-name > label {
    position: absolute;
  }
  
  .name-input,
  .introduction-input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #657786;
    background-color: #f5f8fa;
  }

  .name-input {
    height: 54px;
    padding: 10px 0 0 15px;
    font-size: 19px;
    line-height: 28px;
    font-weight: 500;
  }

  .introduction-input {
    height: 150px;
    padding: 10px;
  } 

  .word-count {
    text-align: end;
  }
  
</style>
