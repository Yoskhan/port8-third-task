<template>
  <div>
    <h1>{{user.name}}</h1>
    <h4>Gender: {{user.gender}}</h4>
    <h4>Status: {{user.status}}</h4>
    <h4>E-mail: {{user.email}}</h4>
  </div>
</template>

<script>
export default {
    data(){
        return {
            'blablabla': true
        }
    },
    computed: {
        user() {
            return this.$store.getters.user(this.$route.params.userId);
        }
    }
};
</script>

<style>
</style>