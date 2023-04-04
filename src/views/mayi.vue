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
    </div>

    <div>
      <a-button @click="onLogin" class="btn" type="primary">登录</a-button>
      <span style="margin-left: 20px; color: grey">{{
        isLogin ? '已登录' : '操作之前请先登录'
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
      <span> 最低价： </span>
      <a-input class="mayi-input" placeholder="请输入最低价" v-model:value="minPrice"></a-input>
      <div style="color: grey; margin-top: 4px">不输入最低价，价格升序查找</div>
    </div>

    <div class="oprate-item">
      <span> 钱包类型： </span>
      <a-input class="mayi-input" placeholder="请输入钱包类型" v-model:value="incomeType"></a-input>
      <div style="color: grey; margin-top: 4px">钱包类型默认易宝，示例：易宝、汇付</div>
    </div>

    <div class="oprate-item">
      <span> 请求间隔： </span>
      <a-input class="mayi-input" placeholder="请输入请求间隔" v-model:value="sleepTime"></a-input>
      <div style="color: grey; margin-top: 4px">
        间隔默认 2200 毫秒请求一次，间隔太短容易请求频繁，建议设置 2000 以上
      </div>
    </div>

    <a-button @click="onSend" class="btn" type="primary" :loading="isLoading">发起锁单</a-button>
    <a-button @click="onStop" class="btn" style="margin-left: 20px">停止锁单</a-button>
    <div style="color: grey; margin-top: 4px">
      {{
        isSuccess
          ? `锁单成功：请尽快打开蚂蚁待支付订单进行支付`
          : '发起锁单后将每隔3秒查询一次，直到查找到为止'
      }}
    </div>
    <a :href="payUrl.value" v-if="payUrl.value">请点击支付</a>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import request from '@/config/request'
import { setCookie, getCookie } from '@/utils/cookie'
import { message } from 'ant-design-vue'

const isLogin = ref(false)
const phone = ref('')
const password = ref('')
const goodsName = ref('')
const goodsId = ref('')
const newToken = ref('')
const minPrice = ref() // 最低价
const incomeType = ref('易宝')
const flag = ref(false)
const currentPage = ref(1)
const isSuccess = ref(false) // 是否成功
const payUrl = ref('') // 支付链接
const isStop = ref(false) // 是否停止
const isLoading = ref(false) // 是否在加载

const sleepTime = ref(2200) // 间隔时长

// 阻塞
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const onLogin = async () => {
  console.log('登录', phone.value)
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
    newToken.value = res?.data?.userinfo?.token
    setCookie('token', res?.data?.userinfo?.token)
    message.success('登录成功')
    isLogin.value = true
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

// 自动定时器
let interval = null

const onStop = () => {
  isLoading.value = false
  isStop.value = true
}
// 发起锁单
const onSend = () => {
  isStop.value = false
  isSuccess.value = false

  payUrl.value = ''
  if (!goodsId.value) {
    message.error('请输入藏品名称')
    return
  }
  if (!incomeType.value) {
    message.error('请输入您的钱包类型')
    return
  }
  if (typeof Number(minPrice.value) !== 'number' && minPrice.value) {
    message.error('输入的最低价格式错误')
    return
  }

  interval && clearInterval(interval)
  interval = setInterval(() => {
    currentPage.value = 1
  }, 3000)

  loadList()
  isLoading.value = true
}

// 请求列表
const loadList = async () => {
  if (isStop.value) return
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
    return
  }
  if (res.code === 0) {
    await sleep(sleepTime.value)
    loadList()
    return
  }
  // 是否查找到可锁单
  if (res.data.list && res.data.list.length) {
    try {
      res.data.list.forEach(async (item, index) => {
        const incomeTypes = incomeType.value === '易宝' ? 'yibao' : 'huifu'
        if (flag.value) return
        // item.income_type.includes(incomeTypes) &&
        if (
          item.status === 1 &&
          item.income_type.includes(incomeTypes) &&
          (item.price <= minPrice.value || !minPrice.value)
        ) {
          flag.value = true
          currentPage.value = 1
          console.log('找到了能付款的', item.id)
          isLoading.value = false
          onPayOrder(item.id)

          throw new Error('error') // 退出循环
        }
        if (index === res.data.list.length - 1 && !flag.value) {
          await sleep(sleepTime.value)
          loadList()
        }
      })
    } catch (error) {
      console.log('找到了，结束循环')
    }
  } else if (res.data.list.length === 0) {
    await sleep(sleepTime.value)
    loadList()
  }
}

const onPayOrder = async id => {
  if (flag.value) {
    flag.value = false // 重置
    console.log('变量')
    try {
      const res = await request({
        url: 'https://app-api.mayi.art/api/order/pay/CreateMarketOrder',
        method: 'POST',
        headers: {
          token: getCookie('token'),
          Authorization: `Bearer ${getCookie('token')}`,
        },
        data: {
          market_goods_id: id,
          pay_type: 4,
          pay_way: incomeType.value === '易宝' ? 'yibao' : 'huifu',
        },
      })
      // const res1 = await request({
      //   url: 'https://app-api.mayi.art/api/order/pay/doPay',
      //   method: 'POST',
      //   headers: {
      //     token: getCookie('token'),
      //     Authorization: `Bearer ${getCookie('token')}`,
      //   },
      //   data: {
      //     market_goods_id: id,
      //     pay_type: 4,
      //     pay_way: incomeType.value === '易宝' ? 'yibao' : 'huifu',
      //   },
      // })
      if (res.code === 1) {
        isSuccess.value = true
        clearInterval(interval)
      } else {
        loadList()
      }

      // payUrl.value = res1?.returnurl
    } catch (error) {
      // 失败，继续轮询
      loadList()
    }
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
