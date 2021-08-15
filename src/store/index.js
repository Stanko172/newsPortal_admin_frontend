import { createLogger, createStore } from 'vuex'
import auth from "./modules/auth"
import dashboard from "./modules/dashboard"
import articles from "./modules/articles"
import article from "./modules/article"
import permissions from "./modules/permissions"
import roles from "./modules/roles"
import users from "./modules/users"

export default createStore({
  plugins: [createLogger()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    dashboard,
    articles,
    article,
    permissions,
    roles,
    users
  }
})
