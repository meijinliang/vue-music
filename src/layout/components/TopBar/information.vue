<template>
  <el-dropdown style="margin-left:16px" placement="bottom" @command="handleCommand">
    <el-badge :value="12" class="item">
      <el-avatar class="pointer" size="medium" :src="avatarUrl" />
    </el-badge>
    <el-dropdown-menu slot="dropdown" class="my-dropdown">
      <el-dropdown-item v-for="item in dropdownObj" :key="item.key" :command="item.key">
        <svg-icon :icon-class="item.icon" />
        {{ item.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { getUserDetail, getUserAccount, getUserSubcount } from '@/api/login'
export default {
  name: '',
  data() {
    return {
      dropdownObj: [
        {
          label: '我的主页',
          key: 'homepage',
          icon: 'homepage'
        },
        {
          label: '我的消息',
          key: 'message',
          icon: 'message'
        },
        {
          label: '我的等级',
          key: 'grade',
          icon: 'grade'
        },
        {
          label: 'VIP会员',
          key: 'vip',
          icon: 'vip'
        },
        {
          label: '个人设置',
          key: 'setting',
          icon: 'setting'
        },
        {
          label: '实名认证',
          key: 'certification',
          icon: 'certification'
        },
        {
          label: '退出',
          key: 'logout',
          icon: 'logout1'
        }
      ]
    }
  },
  computed: {
    avatarUrl() {
      return this.$store.state.user.profile?.avatarUrl
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
      switch (command) {
        // 我的主页
        case 'homepage':
          getUserDetail({ uid: this.$store.state.user.profile.userId }).then(res => {
            console.log(res)
          })
          getUserAccount()
          getUserSubcount()
          break
        // 我的消息
        case 'message':
          break
        // 我的等级
        case 'grade':
          // VIP会员
          break

        case 'vip':
          break
        // 个人设置
        case 'setting':

          break
        // 实名认证
        case 'certification':
          break
        // 退出
        case 'logout':
          this.$store.dispatch('logout')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.my-dropdown {
  // padding: 20px;
  background-color: #242424;
  border: 1px solid #242424;
  .el-dropdown-menu__item {
    padding: 0 40px 0 20px;
    .svg-icon {
      font-size: 14px;
      margin-right: 5px;
    }
  }
  .el-dropdown-menu__item:hover {
    background-color: #353535;
    color: #fff;
  }
  /deep/.popper__arrow,
  /deep/ .popper__arrow::after {
    border-bottom-color: #242424;
  }
}
</style>
