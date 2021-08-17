/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    categories: [],
    errors: [],
    loaded: false
}

// Getter functions
const getters = {
    getCategories: state => state.categories
}

// Actions 
const actions = {
    fetchCategories({ commit }){
        api.get('admin/categories/all')
        .then((response) => {
            commit('SET_CATEGORIES', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    saveData({ commit, dispatch }, payload){
        api.post('admin/categories/save', payload )
        .then(() => {
            dispatch('fetchCategories')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    deleteData({ commit, dispatch }, id){
        api.post('admin/categories/delete', { id } )
        .then(() => {
            dispatch('fetchCategories')
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    }

}

// Mutations
const mutations = {
    SET_CATEGORIES: (state, categories) => state.categories = categories,
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