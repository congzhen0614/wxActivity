<template>
  <div class="free-book">
    <div class="free-book-search" v-if="showSearch">
      <div>
        <input type="text" v-model="search" placeholder="在此输入图书名称" />
        <div @click="onSearch">
          <img src="./images/search-icon.png" />
        </div>
      </div>
    </div>
    <div class="free-book-head">
      <h2 class="free-book-title">主标题名称主标题名称主标题名称主标题名称主标题名</h2>
      <p class="free-book-subhead">副标题名称副标题名称副标题名称副标题名称副标题名称副标题名称副标题名称副标题名称副标题名称副标题名称</p>
    </div>
    <div class="free-book-list">
      <c-book-list></c-book-list>
    </div>
  </div>
</template>

<script>
import bookList from './bookList/bookList.vue'
export default {
  name: 'free-book',
  components: {
    'c-book-list': bookList
  },
  data () {
    return {
      showSearch: false,
      search: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 100) {
        this.showSearch = true
      } else {
        this.showSearch = false
      }
    })
  },
  methods: {
    onSearch () {
      if (this.search === '') {
        this.Toast.warning({title: '请输入搜索内容'})
      } else {
        this.$router.push({
          path: '/freeBooks/bookList',
          query: {
            search: this.search
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './freeBooks.styl'
</style>
