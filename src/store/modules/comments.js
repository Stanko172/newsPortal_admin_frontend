/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    comments: [],
    errors: [],
    loaded: false
}

// Getter functions
const getters = {
    getComments: state => state.comments
}

// Actions 
const actions = {
    fetchComments({ commit }){
        api.get('admin/comments')
        .then((response) => {
            commit('SET_COMMENTS', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteData({ commit, dispatch }, id){
        api.post('admin/comments/delete', { id } )
        .then(() => {
            dispatch('fetchComments')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    }

}

// Mutations
const mutations = {
    SET_COMMENTS: (state, comments) => state.comments = comments,
    SET_ERRORS: (state, errors) => state.errors = errors,
    SET_LOADED: (state, loaded) => state.loaded = loaded

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}