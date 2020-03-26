import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: '',
    // 下一次生成的ID
    nextId: 5,
    key: 'all'
  },
  mutations: {
    getList (state) {
      let list = localStorage.getItem('list')
      console.log(list)
      list = JSON.parse(list)
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
      state.list.map((item) => {
        if (item.id === params.id) {
          item.done = !item.done
        }
      })
    },
    // 清除已完成的任务
    cleanDone (state) {
      state.list = state.list.filter(v => v.done === false)
    },
    // 设置切换button按钮的key值
    setKey (state, key) {
      state.key = key
    }
  },
  actions: {

  },
  getters: {
    // 计算未完成任务条数
    unDoneLength (state) {
      return state.list.filter(v => v.done === false).length
    },
    infoList (state) {
      if (state.key === 'unDone') {
        return state.list.filter(v => !v.done)
      } else if (state.key === 'Done') {
        return state.list.filter(v => v.done)
      } else {
        return state.list
      }
    }
  },
  modules: {}
})
