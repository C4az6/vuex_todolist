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
    // 设置input框值
    setInput (state, value) {
      state.inputValue = value
    },
    // 增加任务项函数
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除任务项函数
    removeItem (state, index) {
      // 根据索引删除
      const i = state.list.findIndex(v => v.id === index)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改任务项选中状态函数
    changeStatus (state, params) {
      const i = state.list.findIndex(v => v.id === params.id)
      if (i !== -1) {
        state.list[i].done = params.done
      }
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
