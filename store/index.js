import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            posts: [],
            comments: [],
            users: [],
            pageToLoad: 2
        },
        mutations: {
            setPosts(state, posts) {
                state.posts = posts;
            },
            loadInitialComments(state, comments) {
                state.comments = comments.data
            },
            loadUsers(state, users) {
                state.users = users.data;
                console.log(users.data)
            },
            extendPosts(state, newPosts) {
                state.posts.push(...newPosts)
            },
            extendComments(state, newComments) {
                state.comments.push(...newComments)
            },
            extendUsers(state, newUsers){
                state.users.push(...newUsers)
            }
        },
        actions: {
            nuxtServerInit(vuexContext) {
                return axios.get('https://gorest.co.in/public-api/posts')
                    .then(res => {
                        vuexContext.commit('setPosts', res.data && res.data.data)
                    })
                    .catch(err => console.error(err));
            },
            loadNextPage(vuexContext, numberOfPage) {
                axios.get('https://gorest.co.in/public-api/posts?page=' + numberOfPage)
                    .then(res => {
                        vuexContext.commit('extendPosts', res.data && res.data.data)
                    })
                    .catch(e => console.log(e))
            },
            loadNextComments(vuexContext, numberOfPage) {
                axios.get('https://gorest.co.in/public-api/comments?page=' + numberOfPage)
                    .then(res => {
                        vuexContext.commit('extendComments', res.data && res.data.data)
                    })
                    .catch(e => console.log(e))
            },
            loadNextUsers(vuexContext, numberOfPage) {
                axios.get('https://gorest.co.in/public-api/users?page=' + numberOfPage)
                    .then(res => {
                        vuexContext.commit('extendUsers', res.data && res.data.data)
                    })
                    .catch(e => console.log(e))
            },
            loadInitialComments(vuexContext) {
                axios.get('https://gorest.co.in/public-api/comments')
                    .then(res => {
                        vuexContext.commit('loadInitialComments', res.data)
                    }).catch(e => console.log(e))

            },
            loadUsers(vuexContext) {
                axios.get('https://gorest.co.in/public-api/users')
                    .then(res => {
                        vuexContext.commit('loadUsers', res.data)
                    }).catch(e => console.log(e))
            }
        },
        getters: {
            posts: state => state.posts,
            comments: (state, getters) => (postId) => {
                let tempComments = []
                state.comments.forEach(comment => {
                    if (comment.post_id === postId) {
                        tempComments.push(comment)
                    }
                })
                return tempComments;
            },
            user: (state, getters) => (userId) => {
                let tempUser = ""
                state.users.forEach(user => {
                    if (user.id == userId) {
                        tempUser = user;
                    }
                })
                return tempUser;
            },
            pageToLoad: state => state.pageToLoad
        }
    })
}

export default createStore;