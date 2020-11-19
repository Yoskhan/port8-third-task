<template>
  <div class="post-container">
    <div class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      <p>Post created by: </p>
      <nuxt-link :to="'/user/' + post.user_id">{{ user.name }}</nuxt-link>
      <br />
      <p class="post-body">{{ post.body }}</p>
      <br />
      <p class="post-time-created">{{ post.created_at }}</p>
    </div>
    <button @click="showComments = !showComments" v-if="comments[0]">
      Comments...
    </button>
    <div class="comments-container" v-if="showComments">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <br />
        <h4>{{ comment.name }}</h4>
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      showComments: false,
    };
  },
  methods: {
    loadComents(postId) {
      axios.get();
    },
  },
  computed: {
    comments() {
      return this.$store.getters.comments(this.post.id);
    },
    user(){
        return this.$store.getters.user(this.post.user_id);
    }
  }
};
</script>

<style scoped>
</style>