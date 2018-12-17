<template>
  <div class="book-list">
    <img v-if="search" class="back-icon" src="../images/back-icon.png" @click="onBack" />
    <ul>
      <li v-for="item in bookList" :key="item.id">
        <div class="list-left">
          <img :src="item.logo" />
        </div>
        <div class="list-right">
          <h3>{{ item.name }}</h3>
          <p><span>作者</span><span>{{ item.author }}</span></p>
          <p><span>包装</span><span>{{ item.hardcover === '1' ? '精装' : '平装' }}</span></p>
          <p><span>类别</span><span>{{ item.bookTypes.join(' | ') }}</span></p>
          <div>
            <div class="book-number">
              <img src="../images/minus-icon.png" @click="onReduce(item)" v-if="item.quantity > 0" />
              <span v-if="item.quantity > 0">{{ item.quantity }}</span>
              <img src="../images/plus-icon.png" @click="onIncrease(item)"/>
            </div>
            <p class="book-price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getFixed1 }}</p>
          </div>
        </div>
      </li>
    </ul>
    <c-footer :type="1" :totalPrice="totalPrice" :quantity="quantity"></c-footer>
  </div>
</template>

<script>
import footer from '../footer/footer.vue'
import freeBook from '@/store/freeBook'
export default {
  name: 'book-list',
  components: {
    'c-footer': footer
  },
  data () {
    return {
      search: this.$route.query.search || '',
      totalPrice: freeBook.totalPrice,
      quantity: freeBook.quantity,
      bookList: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.freeBook().then(res => {
        if (res.data.result.status === '0') {
          this.bookList = []
          if (this.search === '') {
            res.data.pageInfo.list.forEach(item => {
              let hadFlag = false
              if (freeBook.selectBookList.length > 0) {
                freeBook.selectBookList.forEach(obj => {
                  if (item.id === obj.id) {
                    item.quantity = obj.quantity
                    hadFlag = true
                  }
                })
              }
              if (!hadFlag) {
                item.quantity = 0
              }
              this.bookList.push(item)
            })
          } else {
            res.data.pageInfo.list.forEach(item => {
              let hadFlag = false
              if (freeBook.selectBookList.length > 0) {
                freeBook.selectBookList.forEach(obj => {
                  if (item.id === obj.id) {
                    item.quantity = obj.quantity
                    hadFlag = true
                  }
                })
              }
              if (!hadFlag) {
                item.quantity = 0
              }
              if (item.name.indexOf(this.search) > -1) {
                this.bookList.push(item)
              }
            })
          }
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    onBack () {
      this.$router.push({
        path: '/freeBooks'
      })
    },
    onIncrease (item) {
      item.quantity += 1
      if (freeBook.selectBookList.length === 0) {
        freeBook.selectBookList.push(item)
      } else {
        let hadFlag = false
        freeBook.selectBookList.forEach(obj => {
          if (obj.id === item.id) {
            obj.quantity = item.quantity
            hadFlag = true
          }
        })
        if (!hadFlag) {
          freeBook.selectBookList.push(item)
        }
      }
      this.setQuantity()
    },
    onReduce (item) {
      item.quantity -= 1
      freeBook.selectBookList.forEach((obj, index) => {
        if (obj.id === item.id) {
          if (item.quantity === 0) {
            freeBook.selectBookList.splice(index, 1)
          } else {
            obj.quantity = item.quantity
          }
        }
      })
      this.setQuantity()
    },
    setQuantity () {
      this.totalPrice = 0
      freeBook.totalPrice = 0
      this.quantity = 0
      freeBook.quantity = 0
      freeBook.selectBookList.forEach(item => {
        this.totalPrice += item.last_fee * item.quantity
        freeBook.totalPrice += item.last_fee * item.quantity
        this.quantity += item.quantity
        freeBook.quantity += item.quantity
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bookList.styl'
</style>
