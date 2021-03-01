<template>
  <div class="card-container d-flex">
    <img 
      class="user-avatar"
      src="https://picsum.photos/300/200"
    >

    <div>
      <div class="d-flex">
        <h1 class="user-name">
          Devon Lanne
        </h1>
        <router-link 
          class="user-account ml-2"
          to="#"
        >
          @DL
        </router-link> ．
        <span class="post-time">
          3小時
        </span>
      </div>
      <p class="post-txt">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, ipsam? Aliquam rerum dolorem maiores placeat tempora dolores aut atque tenetur quaerat delectus natus earum, iure repellat perferendis aliquid officia minima?
      </p>
    </div>
  </div>
</template>


<style scoped>
  .card-container {
    outline: 1px solid gray;
    padding: 15px 15px 0 15px;
    border-top: 1px solid #e6ecf0;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
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

</style>