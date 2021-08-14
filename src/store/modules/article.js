/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    article: {},
    categories: [],
    errors: [],
    loaded: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchArticle({ commit }, id){
        api.get(`admin/article/show?id=${id}`)
        .then((response) => {
            commit('SET_ARTICLE', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    fetchCategories({ commit }){
        api.get('admin/categories')
        .then((response) => {
            commit('SET_CATEGORIES', response.data)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },

}

// Mutations
const mutations = {
    SET_ARTICLE: (state, data) => { 
        state.article = data.article
        state.categories = data.categories
    },
    SET_CATEGORIES: (state, data) => state.categories = data,
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