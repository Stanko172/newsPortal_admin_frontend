/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    roles: [],
    errors: [],
    loaded: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchRoles({ commit }){
        api.get('admin/roles')
        .then((response) => {
            commit('SET_ROLES', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    saveData({ commit, dispatch }, payload){
        api.post('admin/roles/save', payload )
        .then(() => {
            dispatch('fetchRoles')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteData({ commit, dispatch }, id){
        api.post('admin/roles/delete', { id } )
        .then(() => {
            dispatch('fetchRoles')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteRM({ commit, dispatch }, payload){
        api.post('admin/roles/edit', payload  )
        .then(() => {
            dispatch('fetchRoles')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },

}

// Mutations
const mutations = {
    SET_ROLES: (state, roles) => state.roles = roles,
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