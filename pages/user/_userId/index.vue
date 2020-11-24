<template>
  <div>
    <div class="container">
      <h1 class="user-name">{{ user.name }}</h1>
      <div class="data-container">
        <h4>Gender</h4>
        <div class="data">{{ user.gender }}</div>
        <h4>Status</h4>
        <div class="data">{{ user.status }}</div>
        <h4>E-mail</h4>
        <div class="data">{{ user.email }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blablabla: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user(this.$route.params.userId);
    },
  }
};
</script>

<style scoped>
.container {
  width: 30%;
  background-color: lightgray;
  padding: 0 5rem 1rem 0;
}

.data-container {
  background-color: lightgray;
  height: 100vh;
  padding-left: 2rem;
}
.user-name {
  background-color: black;
  color: yellow;
  text-decoration: underline;
  width: 100vw;
  margin: 0;
}

.data {
  color: blueviolet;
  background-color: white;
  width: fit-content;
  padding: 0 4rem 0.1rem 0.6rem;
  height: 2rem;
  margin-left: 1rem;
  margin-top: -1rem;
  font-weight: bold;
  white-space: nowrap;
}
</style>