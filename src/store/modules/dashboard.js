/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    data: [],
    errors: []
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    setData({ commit }){
        api.get('admin/dashboard/index').then((response) => {
            console.log(response.data)
            commit('SET_DATA', response.data)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },

}

// Mutations
const mutations = {
    SET_DATA: (state, data) => state.data = data,
    SET_ERRORS: (state, errors) => state.errors = errors
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}