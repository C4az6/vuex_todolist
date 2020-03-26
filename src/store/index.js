import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: ''
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInput (state, value) {
      state.inputValue = value
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json')
        .then(({ data }) => {
          context.commit('initList', data)
        })
    }
  },
  modules: {}
})
