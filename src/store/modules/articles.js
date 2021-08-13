/* Module1.store.js */
import api from "../../api/api"

// State object
const state = {
    articles: [],
    filteredArticles: [],
    categories: [],
    authors: [],
    articles_count: 0,
    errors: [],
    loaded: false
}

// Getter functions
const getters = {
    getLoadingStatus: state => state.loaded,
    getArticles(state){
        return state.filteredArticles;
    },
    getArticlesCount: state => state.articles_count,
    getCategories: state => state.categories,
    getAuthors: state => state.authors
}

// Actions 
const actions = {
    fetchData({ commit, dispatch }, payload){
        api.get(`admin/articles/index?paginate=${payload.rowsNum}`).then((response) => {
            commit('SET_DATA', response.data)
            dispatch('filterData', payload.filters)
            commit('SET_LOADED', true)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    },
    filterData({ commit, state }, filters){
        var filteredArticles = state.articles
        //Svi filteri za članke
        if(filters.category !== 'sve'){
            filteredArticles = filteredArticles.filter((article => {
                return article.category_name === filters.category
            }))
        }
        if(filters.author !== 'svi'){
            filteredArticles = filteredArticles.filter((article => {
                return article.user_name === filters.author
            }))
        }

        if(filters.date_from !== 'sve' && filters.date_to !== 'sve'){
            var startDate = new Date(filters.date_from);
            var endDate = new Date(filters.date_to);
            filteredArticles = filteredArticles.filter((article => {
                var dbDate = new Date(article.created_at.split(" ")[0])
                return dbDate >= startDate && dbDate <= endDate 
            }))
        }

        console.log("Flitered artiles: ", filteredArticles)

        commit('SET_FILTERED_ARTICLES', filteredArticles)
    },
    deleteArticle({ commit, dispatch }, payload){
        api.post('admin/articles/delete', {id: payload.id })
        .then(() => {
            dispatch('fetchData', { rowsNum: payload.rowsNum, filters: payload.filters })
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
        })
    }

}

// Mutations
const mutations = {
    SET_DATA: (state, data) =>{ 
        state.articles = data.articles.data
        state.filteredArticles = data.articles.data
        state.articles_count = data.articles_count
        state.categories = data.categories
        state.authors = data.authors; 
    },
    SET_ERRORS: (state, errors) => state.errors = errors,
    SET_LOADED: (state, loaded) => state.loaded = loaded,
    SET_FILTERED_ARTICLES: (state, articles) => state.filteredArticles = articles
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}