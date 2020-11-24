<template>
  <div>
    <Post v-for="post in posts" :key="post.title" :post="post" />
  </div>
</template>

<script>
import Post from "~/components/Post";

export default {
  components: {
    Post,
  },
  data() {
    return {};
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    pageToLoad() {
      return this.$store.getters.pageToLoad;
    },
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight >
          document.documentElement.offsetHeight - 10;

        if (bottomOfWindow) {
          this.getNewPage(this.pageToLoad);
          console.log(this.pageToLoad);
        }
      };
    },
    getNewPage(pageToLoad) {
      this.$store.dispatch("loadNextPage", pageToLoad);
      this.$store.dispatch("loadNextComments", pageToLoad);
      this.$store.dispatch("loadNextUsers", pageToLoad);

      this.$store.state.pageToLoad++;
    },
  },
  mounted() {
    this.scroll();
    if (
      this.$store.state.users === undefined ||
      this.$store.state.users.length == 0
    ) {
      this.$store.dispatch("loadUsers");
      this.$store.dispatch("loadInitialComments");
    }
  },
  created() {},
};
</script>

<style scoped>
</style>
