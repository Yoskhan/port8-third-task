<template>
  <div class="post-container">
    <div class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-card">
        <div class="created-by-container">
          <div>
            <span>Created by:</span>
            <nuxt-link :to="'/user/' + post.user_id" class="user-link">{{
              user.name
            }}</nuxt-link>
          </div>

          <p class="post-time-created">{{ post.created_at | dateFilter }}</p>
        </div>
        <hr />
        <p class="post-body">{{ post.body }}</p>
        <br />
      </div>
      <button
        @click="showComments = !showComments"
        v-if="comments[0]"
        class="btn"
      >
        Comments...
      </button>
      <div class="comments-container" v-if="showComments">
        <div class="comment" v-for="comment in comments" :key="comment.id">
          <h4 class="comment-title">{{ comment.name }}</h4>
          <p class="comment-body">{{ comment.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    dateFilter(value) {
      return new Date(value).toLocaleString("en-CA", { hour12: false });
    },
  },
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
    user() {
      return this.$store.getters.user(this.post.user_id);
    },
  },
};
</script>

<style scoped>
.post-container {
  width: 70%;
  margin: 2rem auto;
}

@media only screen and (max-width: 450px) {
  .post-container {
    width: 100%;
  }
}

.post-title {
  background-color: black;
  color: white;
  padding: 1rem;
  text-decoration: underline;
  margin: 0;
}


.post-body {
  padding: 0 2rem;
}

@media only screen and (max-width: 450px) {
  .post-body {
    padding: 0;
  }
}

.post-card {
  border: 1px solid black;
  padding: 1rem;
}

.created-by-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
}

.user-link {
  background-color: yellow;
  color: black;
}

.post-time-created {
  margin: 0;
  color: blueviolet;
}

.btn {
  display: block;
  margin: 1rem auto;
  border: none;
  background-color: black;
  color: yellow;
  padding: 1rem 4rem;
  font-size: 1rem;
  font-weight: bold;
}

.btn:hover {
  border: none;
  background-color: gray;
  color: black;
  padding: 1rem 4rem;
}

.comments-container {
}

@media only screen and (max-width: 450px) {
  .comments-container {
    margin: 0 0.5rem;
  }
}

.comment {
  background-color: lightgray;
  border-radius: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
}

.comment-title {
  margin: 0 2rem;
  color: blueviolet;
  background-color: white;
  width: fit-content;
  padding: 0 4rem 0.1rem 0.6rem;
}

.comment-body {
  margin: 0.5rem 2rem;
}
</style>