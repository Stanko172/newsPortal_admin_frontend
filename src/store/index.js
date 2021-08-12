import { createLogger, createStore } from 'vuex'
import auth from "./modules/auth"
import dashboard from "./modules/dashboard"

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
    dashboard
  }
})
