/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    users: [],
    errors: [],
    loaded: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchUsers({ commit }){
        api.get('admin/users')
        .then((response) => {
            commit('SET_USERS', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    saveData({ commit, dispatch }, payload){
        api.post('admin/users/save', payload )
        .then(() => {
            dispatch('fetchUsers')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteData({ commit, dispatch }, id){
        api.post('admin/users/delete', { id } )
        .then(() => {
            dispatch('fetchUsers')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteRM({ commit, dispatch }, payload){
        api.post('admin/users/edit', payload  )
        .then(() => {
            dispatch('fetchUsers')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },

}

// Mutations
const mutations = {
    SET_USERS: (state, users) => state.users = users,
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