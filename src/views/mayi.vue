<template>
  <div class="container">
    <div>
      <span> 手机号： </span>
      <a-input class="mayi-input" placeholder="请输入手机号" v-model:value="phone"></a-input>
    </div>
    <div class="oprate-item">
      <span>密码：</span>
      <a-input
        style="margin-left: 20px"
        class="mayi-input"
        placeholder="请输入密码"
        v-model:value="password"
      ></a-input>
      <!-- <div style="color: grey; margin-top: 4px">密码跟验证码登录二选一</div> -->
    </div>
    <!-- <div>
      <span>验证码：</span>
      <a-input class="mayi-input" placeholder="请输入验证码" v-model:value="smsCode"></a-input>
      <a-button @click="onSendSms" class="btn" type="primary" style="margin-left: 20px"
        >发送验证码</a-button
      >
    </div> -->

    <div>
      <a-button @click="onLogin" class="btn" type="primary">登录</a-button>
      <span style="margin-left: 20px; color: grey">{{
        isLogin ? `已登录` : '操作之前请先登录'
      }}</span>
    </div>

    <!-- 查找藏品 -->
    <div class="oprate-item">
      <span> 藏品名称： </span>
      <a-input class="mayi-input" placeholder="请输入藏品名称" v-model:value="goodsName"></a-input>
      <a-button @click="onFindGoods" class="find-btn" type="primary">查找藏品</a-button>
    </div>
    <span v-if="goodsId">已为您查找到该藏品：{{ goodsName }}，您可点击发起锁单</span>

    <div class="oprate-item">
      <span> 最高价： </span>
      <a-input class="mayi-input" placeholder="请输入最高价" v-model:value="maxPrice"></a-input>
      <div style="color: grey; margin-top: 4px">不输入最高价，价格升序查找</div>
    </div>

    <div class="oprate-item">
      <span> 请求间隔： </span>
      <a-input class="mayi-input" placeholder="请输入请求间隔" v-model:value="sleepTime"></a-input>
      <div style="color: grey; margin-top: 4px">
        间隔默认 {{ sleepTime }} 毫秒请求一次，间隔太短容易请求频繁，建议设置 2000 以上
      </div>
    </div>

    <a-button @click="onSend" class="btn" type="primary" :loading="isLoading">发起锁单</a-button>
    <a-button @click="onStop" class="btn" style="margin-left: 20px">停止锁单</a-button>
    <div style="color: grey; margin-top: 4px">
      {{
        isSuccess
          ? `下单成功：请尽快打开蚂蚁待支付订单进行支付`
          : `发起锁单后将每隔${sleepTime}毫秒查询一次，直到查找到为止`
      }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import request from '@/config/request'
import { setCookie, getCookie } from '@/utils/cookie'
import { message } from 'ant-design-vue'

const isLogin = ref(false) // 是否登录
const smsCode = ref('') // 验证码
const phone = ref('') // 手机号
const password = ref('') // 密码
const goodsName = ref('') // 藏品名称
const goodsId = ref('') // 藏品id
const maxPrice = ref() // 最高价
const currentPage = ref(1) // 当前请求页数
const sleepTime = ref(2200) // 间隔时长

const incomeTypeArr = [] // 用户支持的钱包数组

const isLoading = ref(false) // 是否在请求
const isSuccess = ref(false) // 是否成功
const inStop = ref(false) // 强制暂停

// 阻塞，间隔
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 重新加载列表
const reloadList = async () => {
  if (inStop.value) {
    inStop.value = false
    isLoading.value = false
    isSuccess.value = false
    currentPage.value = 1
    return
  }
  await sleep(sleepTime.value)
  loadList()
}
// 发送验证码
const onSendSms = async () => {
  if (!phone.value) {
    message.error('请先输入手机号')
    return
  }
  const res = await request({
    url: 'https://app-api.mayi.art/api/user/login',
    method: 'POST',
    data: { account: phone.value, password: password.value },
  })
  if (res.code === 1) {
    setCookie('token', res?.data?.userinfo?.token)
    message.success('登录成功')
    isLogin.value = true
  }
}

// 登录
const onLogin = async () => {
  if (!phone.value) {
    message.error('请输入手机号')
    return
  }
  if (!password.value) {
    message.error('请输入密码')
    return
  }

  const res = await request({
    url: 'https://app-api.mayi.art/api/user/login',
    method: 'POST',
    data: { account: phone.value, password: password.value },
  })
  if (res.code === 1) {
    setCookie('token', res?.data?.userinfo?.token)
    message.success('登录成功')
    isLogin.value = true
  }

  // 登录后获取用户钱包信息
  const res1 = await request({
    url: 'https://app-api.mayi.art/api/user/getUserInfo',
    method: 'POST',
    headers: {
      token: getCookie('token'),
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
  if (res1.code === 1) {
    res1?.data?.huifu_account && incomeTypeArr.push('huifu')
    res1?.data?.yibao_status && incomeTypeArr.push('yibao')
  }
}

// 查找藏品
const onFindGoods = async () => {
  if (!goodsName.value) {
    message.error('请输入藏品名称')
    return
  }
  const res = await request({
    url: 'https://app-api.mayi.art/api/market/market/getMarketList',
    method: 'POST',
    data: { goods_type: 2, keywords: goodsName.value },
  })
  if (res.code === 1) {
    goodsName.value = res?.data[0].name
    goodsId.value = res?.data[0].id
  }
}

const onStop = () => {
  inStop.value = true
}
// 发起锁单
const onSend = () => {
  if (!goodsId.value) {
    message.error('请输入藏品名称')
    return
  }
  if (typeof Number(maxPrice.value) !== 'number' && maxPrice.value) {
    message.error('输入的最高价格式错误')
    return
  }
  inStop.value = false
  isSuccess.value = false
  loadList()
}

// 请求列表
const loadList = async () => {
  isLoading.value = true
  try {
    const res = await request({
      url: 'https://app-api.mayi.art/api/market/market/getMarketGoodsListByGoodsId',
      method: 'POST',
      headers: {
        token: getCookie('token'),
        Authorization: `Bearer ${getCookie('token')}`,
      },
      data: {
        page: currentPage.value,
        sort: 'price',
        type: 2,
        id: goodsId.value,
        order: 'asc',
      },
    })
    if (res.code === 0 && res.msg === '请先登录') {
      message.error('请先登录')
      isLoading.value = false
      return
    }
    if (res.code === 0) {
      reloadList()
      return
    }
    // 是否查找到可锁单
    if (res.data.list && res.data.list.length) {
      for (let index = 0; index < res.data.list.length; index++) {
        const item = res.data.list[index]
        // 找到能与当前钱包匹配的支付类型
        const canPayType = incomeTypeArr.filter(iten => item.income_type.includes(iten))
        if (
          canPayType.length &&
          item.status === 1 &&
          (item.price <= maxPrice.value || !maxPrice.value)
        ) {
          console.log('找到了能付款的，尝试支付，id：', item.id)
          currentPage.value = 1 // 重置页数
          onPayOrder(item.id, canPayType)
          return // 退出循环
        }
        // 如果循环到最后一个还没有，则递归再找一遍
        if (index === res.data.list.length - 1) {
          if (res.data.list.length === 10) {
            currentPage.value++
          } else {
            currentPage.value = 1
          }
          reloadList()
        }
      }
    } else {
      // 如果没有数据，等待再重新执行
      reloadList()
    }
  } catch (error) {
    console.log('列表请求异常', error)
    reloadList()
  }
}

const onPayOrder = async (id, income_type) => {
  try {
    const res1 = await request({
      url: 'https://app-api.mayi.art/api/order/pay/CreateMarketOrder',
      method: 'POST',
      headers: {
        token: getCookie('token'),
        Authorization: `Bearer ${getCookie('token')}`,
      },
      data: {
        market_goods_id: id,
        pay_type: 4,
        pay_way: income_type[0],
      },
    })
    console.log('支付情况:', res1)
    if (res1.code === 1) {
      message.success('下单成功')
      isSuccess.value = true
      isLoading.value = false
      return
    }
    // 如果被锁了，或者异常，就重新来一遍
    if (res1.code === 0 && (res1.msg === '该藏品已被锁定' || res1.msg === '操作太频繁')) {
      reloadList()
      return
    }
  } catch (error) {
    console.log('支付出错了')
    reloadList()
  }
}
</script>
<style scoped>
.container {
  padding: 20px;
}
.oprate-item {
  margin-top: 20px;
}
.item {
  margin-top: 20px;
}
.mayi-input {
  width: 160px;
}
.btn {
  margin-top: 20px;
}
.find-btn {
  margin-left: 10px;
}
</style>
