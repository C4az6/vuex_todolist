import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: '',
    // 下一次生成的ID
    nextId: 5
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInput (state, value) {
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
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
