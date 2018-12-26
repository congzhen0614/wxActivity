<template>
  <div class="receive-info">
    <ul class="info-head">
      <li>
        <span class="info-title">省</span>
        <span class="info-content">{{ form.provincename || '请选择所属省' }}</span>
        <img src="../images/link-icon.png" />
      </li>
      <li @click="onSelectCity">
        <span class="info-title">市</span>
        <span class="info-content">{{ form.cityname || '请选择所属市' }}</span>
        <img src="../images/link-icon.png" />
      </li>
      <li @click="onSelectRegion">
        <span class="info-title">区</span>
        <span class="info-content">{{ form.regionname || '请选择所属区' }}</span>
        <img src="../images/link-icon.png" />
      </li>
      <li @click="onSelectSchool">
        <span class="info-title">学校</span>
        <span class="info-content">{{ form.schoolname || '请选择所属学校' }}</span>
        <img src="../images/link-icon.png" />
      </li>
    </ul>
    <p>请填写当前所属年级和班级</p>
    <ul>
      <li @click="onSelectGrade">
        <span class="info-content">{{ form.gradename || '请选择所属年级' }}</span>
        <img src="../images/link-icon.png" />
      </li>
      <li @click="onSelectClass">
        <span class="info-content">{{ form.classname || '请选择所属班级' }}</span>
        <img src="../images/link-icon.png" />
      </li>
    </ul>
    <ul style="margin-bottom: 50px">
      <li>
        <input type="text" v-model="form.linkman" style="width: 100%" placeholder="请填写收货人姓名" />
      </li>
      <li>
        <input type="text" v-model="form.linkmobile" style="width: 100%" placeholder="请填写手机号" />
      </li>
    </ul>
    <c-footer :type="2" :params="params" :totalPrice="totalPrice" :quantity="quantity"></c-footer>
  </div>
</template>

<script>
import Picker from 'better-picker'
import area from '../../../../static/data/area'
import footer from '../footer/footer.vue'
import freeBook from '@/store/freeBook'
export default {
  name: 'receive-info',
  components: {
    'c-footer': footer
  },
  data () {
    return {
      totalPrice: freeBook.totalPrice,
      quantity: freeBook.quantity,
      area: area.result,
      picker: '',
      schoolsList: [],
      gradesList: [],
      classesList: [],
      form: {
        provincename: '福建省',
        provinceid: '34',
        cityname: '',
        cityid: '',
        regionname: '',
        regionid: '',
        schoolname: '',
        schoolid: '',
        gradename: '',
        gradeid: '',
        classname: '',
        classid: '',
        linkman: '',
        linkmobile: ''
      }
    }
  },
  created () {
    this.loadGradesList()
    this.loadclassesList()
  },
  computed: {
    params () {
      let items = []
      freeBook.selectBookList.forEach(item => {
        items.push({
          item_id: item.id,
          quantity: item.quantity
        })
      })
      let param = {
        provinceid: this.form.provinceid,
        cityid: this.form.cityid,
        regionid: this.form.regionid,
        schoolid: this.form.schoolid,
        gradeid: this.form.gradeid,
        classid: this.form.classid,
        linkman: this.form.linkman,
        linkmobile: this.form.linkmobile,
        items: items
      }
      return param
    },
    citiesList () {
      let citiesList = []
      this.area.forEach(item => {
        if (item.provinceid === this.form.provinceid) {
          item.citylist.forEach(city => {
            citiesList.push({
              regionlist: city.regionlist,
              text: city.cityname,
              value: city.cityid
            })
          })
        }
      })
      return citiesList
    },
    regionslist () {
      let regionlist = []
      this.citiesList.forEach(city => {
        if (city.value === this.form.cityid) {
          city.regionlist.forEach(region => {
            regionlist.push({
              text: region.regionname,
              value: region.regionid
            })
          })
        }
      })
      return regionlist
    }
  },
  methods: {
    onSelectCity () {
      this.picker = new Picker({
        data: [this.citiesList],
        selectedIndex: 0,
        title: '请选择所属市'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.cityname = this.citiesList[selectedIndex].text
        this.form.cityid = selectedVal[0]
      })
      this.picker.show()
    },
    onSelectRegion () {
      if (this.form.cityid === '') {
        this.Toast.warning({title: '请先选择所属区'})
      } else {
        this.picker = new Picker({
          data: [this.regionslist],
          selectedIndex: 0,
          title: '请选择所属区'
        })
        this.picker.on('picker.select', (selectedVal, selectedIndex) => {
          this.form.regionname = this.regionslist[selectedIndex].text
          this.form.regionid = selectedVal[0]
        })
        this.picker.show()
      }
    },
    onSelectSchool () {
      if (this.form.regionid === '') {
        this.Toast.warning({title: '请先选择所属区'})
      } else {
        this.picker = new Picker({
          data: [this.schoolsList],
          selectedIndex: 0,
          title: '请选择所属学校'
        })
        this.picker.on('picker.select', (selectedVal, selectedIndex) => {
          this.form.schoolname = this.schoolsList[selectedIndex].text
          this.form.schoolid = selectedVal[0]
        })
        this.picker.show()
      }
    },
    onSelectGrade () {
      this.picker = new Picker({
        data: [this.gradesList],
        selectedIndex: 0,
        title: '请选择所属年级'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.gradename = this.gradesList[selectedIndex].text
        this.form.gradeid = selectedVal[0]
      })
      this.picker.show()
    },
    onSelectClass () {
      this.picker = new Picker({
        data: [this.classesList],
        selectedIndex: 0,
        title: '请选择所属班级'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.classname = this.classesList[selectedIndex].text
        this.form.classid = selectedVal[0]
      })
      this.picker.show()
    },
    loadSchoolsList () {
      this.$axios.schoolsList(this.form.regionid).then(res => {
        if (res.data.result.status === '0') {
          res.data.pageInfo.list.forEach(shcool => {
            this.schoolsList.push({
              text: shcool.name,
              value: shcool.id
            })
          })
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadGradesList () {
      this.$axios.gradesList().then(res => {
        if (res.data.result.status === '0') {
          res.data.pageInfo.list.forEach(item => {
            this.gradesList.push({
              text: item.name,
              value: item.id
            })
          })
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadclassesList () {
      this.$axios.classesList().then(res => {
        if (res.data.result.status === '0') {
          res.data.pageInfo.list.forEach(item => {
            this.classesList.push({
              text: item.name,
              value: item.id
            })
          })
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    }
  },
  watch: {
    'form.cityid' () {
      this.form.regionname = ''
      this.form.regionid = ''
    },
    'form.regionid' (val) {
      this.schoolsList = []
      this.form.schoolname = ''
      this.form.schoolid = ''
      if (val !== '') {
        this.loadSchoolsList()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './receiveInfo.styl'
</style>
