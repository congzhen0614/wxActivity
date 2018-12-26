<template>
  <footer class="free-book-footer">
    <div class="footer-left">
      <p class="footer-price">总价<span class="price">￥<span class="big">{{ totalPrice | getInteger }}</span>{{ totalPrice | getFixed1 }}</span></p>
      <p class="footer-number">数量<span>{{ quantity }}</span></p>
    </div>
    <span class="footer-right" @click="onsubmit(type)">{{ type === 1 ? '去结算' : '提交订单' }}</span>
  </footer>
</template>

<script>
import freeBook from '@/store/freeBook'
export default {
  name: 'free-book-footer',
  props: ['type', 'params', 'totalPrice', 'quantity'],
  methods: {
    onsubmit (type) {
      if (type === 1) {
        if (freeBook.selectBookList.length > 0) {
          this.$router.push({
            path: '/freeBooks/receiveInfo'
          })
        } else {
          this.Toast.warning({title: '至少选择一本图书'})
        }
      } else {
        if (this.params.provinceid === '' || this.params.cityid === '' || this.params.regionid === '') {
          this.Toast.warning({title: '省、市、区不能为空'})
        } else if (this.params.schoolid === '') {
          this.Toast.warning({title: '学校不能为空'})
        } else if (this.params.gradeid === '') {
          this.Toast.warning({title: '年级不能为空'})
        } else if (this.params.classid === '') {
          this.Toast.warning({title: '班级不能为空'})
        } else if (this.params.linkman === '') {
          this.Toast.warning({title: '联系人不能为空'})
        } else if (this.params.linkmobile === '') {
          this.Toast.warning({title: '联系电话不能为空'})
        } else {
          this.$axios.freeBookConfirm(this.params).then(res => {
            freeBook.totalPrice = 0
            freeBook.quantity = 0
            if (res.data.result.status === '0') {
              this.Dialog.alert({
                title: '提示',
                msg: '您的订单已提交成功，我们将尽快处理，请耐心等待…',
                buttons: ['知道了']
              }, res => {
                freeBook.selectBookList = []
                this.$router.push({
                  path: '/freeBooks'
                })
              })
            } else {
              this.Dialog.alert({
                title: '提示',
                msg: res.data.result.msg,
                buttons: ['知道了']
              }, res => {
                // this.$router.push({
                //   path: '/freeBooks'
                // })
              })
            }
          }, err => {
            this.Toast.fail({title: err})
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './footer.styl'
</style>
