<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button
      type="primary"
      @click="addItemToList"
    >添加事项</a-button>

    <a-list
      bordered
      :dataSource="infoList"
      class="dt_list"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
      >
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="(e)=>{handleChange(e, item.id)}"
        >{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a
          slot="actions"
          @click="removeItemToList(item.id)"
        >删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div
        slot="footer"
        class="footer"
      >
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="key==='all'?'primary':'default'"
            @click="switchButton('all')"
          >全部</a-button>
          <a-button
            :type="key==='unDone'?'primary':'default'"
            @click="switchButton('unDone')"
          >未完成</a-button>
          <a-button
            :type="key==='Done'?'primary':'default'"
            @click="switchButton('Done')"
          >已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.$store.commit('getList')
  },
  mounted () {
    window.addEventListener('beforeunload', e => this.set())
  },
  computed: {
    ...mapState(['inputValue', 'key']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    set () {
      // 关闭浏览器的时候覆盖一下localStorage里面的list数组
      const infoList = JSON.stringify(this.infoList)
      localStorage.setItem('list', infoList)
    },
    // 监听文本框内容变化
    handleInputChange (e) {
      this.$store.commit('setInput', e.target.value)
    },
    // 新增任务项
    addItemToList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空!')
      }
      this.$store.commit('addItem')
    },
    // 根据ID删除任务项
    removeItemToList (id) {
      this.$store.commit('removeItem', id)
    },
    // 根据ID修改任务项的状态值
    handleChange (e, id) {
      const params = {
        done: e.target.checked,
        id: id
      }
      this.$store.commit('changeStatus', params)
    },
    clean () {
      this.$store.commit('cleanDone')
    },
    // 已完成按钮切换
    switchButton (key) {
      this.$store.commit('setKey', key)
    }
  }
}

</script>

<style scoped>
#app {
  position: absolute;
  padding: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
