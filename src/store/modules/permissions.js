/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    permissions: [],
    errors: [],
    loaded: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchPermissions({ commit }){
        api.get('admin/permissions')
        .then((response) => {
            commit('SET_PERMISSIONS', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    saveData({ commit, dispatch }, payload){
        api.post('admin/permissions/save', payload )
        .then(() => {
            dispatch('fetchPermissions')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteData({ commit, dispatch }, id){
        api.post('admin/permissions/delete', { id } )
        .then(() => {
            dispatch('fetchPermissions')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    }

}

// Mutations
const mutations = {
    SET_PERMISSIONS: (state, permissions) => state.permissions = permissions,
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