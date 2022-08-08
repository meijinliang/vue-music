<template>
  <div class="calendar">
    <div class="calendar-header">
      <!-- 日期头部设置插槽方便自定义 :headerData="headerData" -->
      <slot name="header">
        <div class="calendar-header-title">{{ currentYearMonth }}</div>
        <div class="calendar-header-group">
          <el-button-group>
            <el-button size="mini" plain @click="handlerChangeDate('prev')">上个月</el-button>
            <el-button size="mini" plain @click="handlerChangeDate('curr')">今天</el-button>
            <el-button size="mini" plain @click="handlerChangeDate('next')">下个月</el-button>
          </el-button-group>
        </div>
      </slot>
    </div>
    <div class="calendar-body">
      <table cellspacing="0" cellpadding="0" class="calendar-table">
        <thead>
          <th v-for="week in weeks" :key="week"> {{ week }}</th>
        </thead>
        <tbody>
          <tr v-for="(tr, trIndex) in trs" :key="trIndex">
            <td v-for="(td, tdIndex) in tr" :key="tdIndex" :class="[td.type, {today:td.isToday, selected: td.isSelected} ]" @click="handleClickDay(td)">
              <slot name="cell" :node="td">
                <div class="cell">
                  <div>{{ td.day }}</div>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    value: {
      type: String,
      default: ''
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    weeks: {
      type: Array,
      default: () => {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      }
    }
  },
  data() {
    return {
      isIninted: false,
      range: [], // 日历范围数据
      trs: [], // 日历行list
      alldays: 42, // 设置6行每行7列的日历模式
      currentYearMonth: this.$moment(new Date()).format('YYYY-MM'), // 当前年月
      currentDate: this.$moment(new Date()).format('YYYY-MM-DD'), // 今天
      selectedDate: '' // 选中的日期
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!this.isIninted) {
          this.init()
        }
        this.isIninted = true
        if (newVal) {
          const date = this.$moment(newVal)
          this.selectedDate = date.format('YYYY-MM-DD')
          this.setYearMonth(date)
        }
      }
    },
    currentYearMonth: {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          this.generateTrs()
          if (this.range.length > 0) {
            this.$emit('range', {
              yearMonth: val,
              dateRange: this.range
            })
          }
        }
      }
    }
  },
  created() {
    console.log('calendar')
  },
  methods: {
    init() {
      this.generateTrs()
    },
    // 生成日历的行和列
    generateTrs() {
      this.range = this.getRange()
      this.trs = this._.chunk(this.range, 7)
    },
    // 重新赋值当前年月
    setYearMonth(date) {
      this.currentYearMonth = date.format('YYYY-MM')
    },
    getRange() {
      const range = []
      const node = {
        type: '',
        date: '',
        day: '',
        isSelected: false,
        isToday: false
      }

      const prevMonth = this.$moment(this.currentYearMonth).subtract(1, 'month').format('YYYY-MM') // 上月
      const prevMonthAllDays = this.$moment(this.currentYearMonth).subtract(1, 'month').daysInMonth() // 上月天数
      const firstDayofCurrMonth = this.$moment(this.currentYearMonth + '-01').day() // 当前月第一天是周几
      // 上个月要补的天数 firstDayofCurrMonth - this.firstDayOfWeek 这个就已经需要补的天数 +7是为了firstDayofCurrMonth - this.firstDayOfWeek是负数的情况
      const prevArr = [...new Array(((7 + firstDayofCurrMonth - this.firstDayOfWeek) % 7)).keys()]
      // unshift方法从首部开始添加
      // 构建上月要补的天数到日历范围
      prevArr.forEach(e => {
        range.unshift({
          ...node,
          type: 'prev',
          day: prevMonthAllDays - e,
          date: prevMonth + '-' + (prevMonthAllDays - e)
        })
      })

      const currentMonthAllDays = this.$moment(this.currentYearMonth).daysInMonth() // 当月天数
      const currentArr = [...new Array(currentMonthAllDays).keys()]
      currentArr.forEach(e => {
        range.push({
          ...node,
          type: 'current',
          day: e + 1,
          date: this.currentYearMonth + '-' + (e + 1)
        })
      })

      const nextMonth = this.$moment(this.currentYearMonth).add(1, 'month').format('YYYY-MM') // 下月
      const nextArr = [...new Array(this.alldays - range.length).keys()] // 下月要补的天数
      // 构建下月要补的天数到日历范围
      nextArr.forEach(e => {
        range.push({
          ...node,
          type: 'next',
          day: e + 1,
          date: nextMonth + '-' + (e + 1)
        })
      })

      // 今天处理
      range.map(e => {
        e.date = this.$moment(e.date).format('YYYY-MM-DD') // 这个时间格式化处理的作用是为了把日的个位转换为两位
        if (e.date === this.currentDate) {
          e.isToday = true
        }
        if (e.date === this.selectedDate) {
          e.isSelected = true
        }
        return e
      })
      console.log(range)
      return range
    },
    // getRange() {
    //   const dateArr = []
    //   // 当前月1号
    //   const firstDay = this.currentYearMonth + '-01'
    //   // 当前月第一天是周几
    //   const firstDayofMonth = this.$moment(firstDay).day()

    //   // 上个月
    //   // 上个月需要补充的天数
    //   const preDays = firstDayofMonth - this.firstDayOfWeek
    //   // 上个月份的天数
    //   const preMonthDays = this.$moment(this.currentYearMonth).subtract(1, 'month').daysInMonth()

    //   for (let index = preMonthDays - preDays + 1; index <= preMonthDays; index++) {
    //     dateArr.push({
    //       type: 'prev',
    //       isSelected: false,
    //       date: index
    //     })
    //   }
    //   // 本月
    //   // 获取本月有多少天
    //   const currentMonthDays = this.$moment(this.currentYearMonth).daysInMonth()
    //   for (let index = 1; index <= currentMonthDays; index++) {
    //     dateArr.push({
    //       type: 'current',
    //       isSelected: false,
    //       monthDay: this.currentYearMonth + (index < 10 ? '0' + index : index),
    //       date: index
    //     })
    //   }
    //   // 下个月tD
    //   // 获取本月最后一天是周几，然后计算下个月需要补充多少天
    //   const lastDayOfMonth = this.$moment(this.currentYearMonth + '-' + currentMonthDays).day()
    //   console.log(this.currentYearMonth, currentMonthDays, lastDayOfMonth)
    //   for (let index = 1; index <= 6 - lastDayOfMonth; index++) {
    //     dateArr.push({
    //       type: 'next',
    //       isSelected: false,
    //       date: index
    //     })
    //   }
    //   return dateArr
    // },
    handleClickDay(node) {
      this.selectedDate = node.date
      this.trs.map(tr => {
        tr.map(td => {
          if (td.date === this.selectedDate) {
            td.isSelected = true
          } else {
            td.isSelected = false
          }
          return td
        })
        return tr
      })
      this.$emit('input', this.selectedDate)
    },
    handlerChangeDate(type) {
      switch (type) {
        case 'prev':
          {
            const prevDate = this.$moment(this.currentYearMonth).subtract(1, 'month')
            this.setYearMonth(prevDate)
          }
          break
        case 'curr':
          {
            const todayDate = this.$moment(new Date())
            this.setYearMonth(todayDate)
          }
          break
        case 'next':
          {
            const nextDate = this.$moment(this.currentYearMonth).add(1, 'month')
            this.setYearMonth(nextDate)
          }
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.calendar {
  padding: 24px;
  margin: 10px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid #ebeef5;
    &-title {
      font-size: 18px;
      color: #000;
      align-self: center;
    }
  }
  &-body {
    padding: 12px 20px 35px;
  }
  &-table {
      width: 100%;
      th {
        padding: 12px 0;
      }
      tr td:first-child {
        border-left: 1px solid #ebeef5;
      }
      tr:first-child td {
        border-top: 1px solid #ebeef5;
      }
      tr td {
        // padding: 8px;
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        .cell {
          padding: 8px;
          box-sizing: border-box;
          height: 85px;
          &:hover {
            cursor: pointer;
            background-color: #f2f8fe;
          }
        }
        &.prev, &.next {
          color: #c0c4cc;
        }
        &.today {
          color: #617aeb;
        }
        &.selected {
          .cell {
            background-color: #f2f8fe;
          }
        }
      }

    }

}
</style>
