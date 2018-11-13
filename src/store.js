import Vue from 'vue'
import Vuex from 'vuex'
// modules
import app from './stores/app'
import errorLog from './stores/errorLog'
import permission from './stores/permission'
import tagsView from './stores/tagsView'
import user from './stores/user'
import getters from './stores/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters,
  state: {},
  mutations: {},
  actions: {}
}) 
