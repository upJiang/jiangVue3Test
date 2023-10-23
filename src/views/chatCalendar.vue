<template>
  <div>
    <div>
      <!-- 点击展示客服弹窗 -->
      <div class="service" @click="showModal">
        <svg
          t="1686814946576"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2479"
          width="200"
          height="200"
        >
          <path
            d="M959.716928 554.950208M532.429285 958.838931M64.446801 594.626859M270.969435 57.464783"
            fill="#FFFFFF"
            p-id="2480"
          ></path>
          <path
            d="M583.719438 385.762901C664.377456 493.897713 810.145377 538.433022 810.145377 538.433022 799.252283 351.240643 687.435615 259.769348 510.411829 258.869862 298.641681 257.789251 175.627996 429.173596 222.010373 597.866646 222.00935 597.866646 580.769246 462.953957 583.719438 385.762901z"
            fill="#FFFFFF"
            p-id="2481"
          ></path>
          <path
            d="M843.843874 721.201649c65.939805-16.944927 114.865097-15.887852 114.865097-150.871149 0-65.013713-38.867216-120.714316-93.980441-144.029324C824.128857 272.551466 697.718819 116.236328 507.890402 111.958908c-6.053879-0.135076-12.062733-0.157589-18.004049 0-183.887101 4.724605-309.892933 146.908908-324.069817 311.821865-58.44511 21.626553-102.44216 79.103616-100.462063 146.549727 4.432962 151.456481 66.321498 153.863297 148.712997 155.550729l0-293.098431c1.732457-125.304867 124.495432-264.293385 293.822932-264.293385 168.313404 0 261.415848 130.999566 302.464753 247.369947l0 301.380048c-8.28264 19.399839-30.449499 41.206494-70.936609 80.296791-52.819996 50.971905-128.907928 77.414137-128.907928 77.414137-8.844435 1.867534-15.078417 13.68365-12.603039 23.76424 2.475378 10.082636 13.253862 16.136515 21.605064 12.242835 0 0 80.274278-26.195615 140.430356-84.256986C819.492256 769.20392 843.640236 721.763444 843.843874 721.201649z"
            fill="#FFFFFF"
            p-id="2482"
          ></path>
          <path
            d="M375.327224 624.215758m-37.46631 0a36.613 36.613 0 1 0 74.93262 0 36.613 36.613 0 1 0-74.93262 0Z"
            fill="#FFFFFF"
            p-id="2483"
          ></path>
          <path
            d="M657.294131 624.215758m-37.46631 0a36.613 36.613 0 1 0 74.93262 0 36.613 36.613 0 1 0-74.93262 0Z"
            fill="#FFFFFF"
            p-id="2484"
          ></path>
        </svg>
      </div>
      <!-- 弹窗 -->
      <a-modal class="box" v-model:visible="visible" title="SERVICE">
        <div class="kefubox">
          <div v-for="message in chatHistory" :key="message.id">
            <!-- 遍历用户发送的信息，如果role为user就返回信息 -->
            <div v-if="message.sender === 'user'" class="user-message">
              <!-- 用户发送的信息 -->
              <div class="userBox">
                <!-- icon图标 -->
                <svg
                  t="1686817502794"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3466"
                  width="30"
                  height="30"
                >
                  <path
                    fill="#000000"
                    d="M500 128.8c-95.2 5.6-173.6 83.2-180 178.4-7.2 112 80.8 205.6 191.2 205.6 106.4 0 192-86.4 192-192 0.8-110.4-92-198.4-203.2-192zM512 575.2c-128 0-383.2 64-383.2 192v96c0 17.6 14.4 32 32 32h702.4c17.6 0 32-14.4 32-32V766.4c0-127.2-255.2-191.2-383.2-191.2z"
                    p-id="3467"
                  ></path>
                </svg>
              </div>
              <!-- 用户输入的问题 -->
              <span>{{ message.text }}</span>
            </div>
            <div v-else class="bot-message" style="padding: 5px 10px; margin: 5px 0">
              <!-- icon图标 -->
              <div style="display: flex; align-items: center; margin-right: 10px">
                <svg
                  t="1686814946576"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2479"
                  width="30"
                  height="30"
                >
                  <path
                    d="M959.716928 554.950208M532.429285 958.838931M64.446801 594.626859M270.969435 57.464783"
                    fill="#000000"
                    p-id="2480"
                  ></path>
                  <path
                    d="M583.719438 385.762901C664.377456 493.897713 810.145377 538.433022 810.145377 538.433022 799.252283 351.240643 687.435615 259.769348 510.411829 258.869862 298.641681 257.789251 175.627996 429.173596 222.010373 597.866646 222.00935 597.866646 580.769246 462.953957 583.719438 385.762901z"
                    fill="#000000"
                    p-id="2481"
                  ></path>
                  <path
                    d="M843.843874 721.201649c65.939805-16.944927 114.865097-15.887852 114.865097-150.871149 0-65.013713-38.867216-120.714316-93.980441-144.029324C824.128857 272.551466 697.718819 116.236328 507.890402 111.958908c-6.053879-0.135076-12.062733-0.157589-18.004049 0-183.887101 4.724605-309.892933 146.908908-324.069817 311.821865-58.44511 21.626553-102.44216 79.103616-100.462063 146.549727 4.432962 151.456481 66.321498 153.863297 148.712997 155.550729l0-293.098431c1.732457-125.304867 124.495432-264.293385 293.822932-264.293385 168.313404 0 261.415848 130.999566 302.464753 247.369947l0 301.380048c-8.28264 19.399839-30.449499 41.206494-70.936609 80.296791-52.819996 50.971905-128.907928 77.414137-128.907928 77.414137-8.844435 1.867534-15.078417 13.68365-12.603039 23.76424 2.475378 10.082636 13.253862 16.136515 21.605064 12.242835 0 0 80.274278-26.195615 140.430356-84.256986C819.492256 769.20392 843.640236 721.763444 843.843874 721.201649z"
                    fill="#000000"
                    p-id="2482"
                  ></path>
                  <path
                    d="M375.327224 624.215758m-37.46631 0a36.613 36.613 0 1 0 74.93262 0 36.613 36.613 0 1 0-74.93262 0Z"
                    fill="#000000"
                    p-id="2483"
                  ></path>
                  <path
                    d="M657.294131 624.215758m-37.46631 0a36.613 36.613 0 1 0 74.93262 0 36.613 36.613 0 1 0-74.93262 0Z"
                    fill="#000000"
                    p-id="2484"
                  ></path>
                </svg>
              </div>
              <!-- GPT回答的信息 -->
              <span>{{ message.text }}</span>
            </div>
          </div>
        </div>
        <!-- 输入框 -->
        <template #footer>
          <div class="iptbox">
            <div>
              <input
                type="text"
                name=""
                id=""
                v-model="userInput"
                @keyup.enter="sendMessage"
                placeholder="请输入要查询的问题..."
              />
              <button @click="sendMessage">发送</button>
            </div>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 弹窗
const visible = ref(false)
const showModal = () => {
  visible.value = true
}

// 聊天历史记录
const chatHistory = ref([])
// 用户输入的问题
const userInput = ref('')

// 点击发送事件
const sendMessage = async () => {
  const message = {
    id: chatHistory.value.length + 1,
    // 默认发送者设置成了user
    sender: 'user',
    // 此时是用户输入的问题
    text: userInput.value,
  }

  // 将这些信息存入到聊天历史记录的数组中
  chatHistory.value.push(message)
  // 然后清空输入框
  userInput.value = ''

  try {
    const apiKey = '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' // 替换为你的 OpenAI API 密钥
    const prompt = message.text //用户输入的问题  要问的问题

    const apiUrl = 'https://service-4ehw14uq-1310031712.usw.apigw.tencentcs.com/v1/chat/completions' //固定的地址，api模型
    const headers = {
      'Content-Type': 'application/json', //请求头这里不用改
      Authorization: `Bearer ${apiKey}`, //一定要将变量apikey填写正确才可以请求到
    }
    // prompt（必需）：作为输入给模型的文本提示。它是一个字符串，描述了你想要问模型的问题或提供给模型的上下文信息。

    // max_tokens（可选）：用于控制生成回复的长度。它是一个整数，表示模型生成的最大标记数量。默认值为 16。

    // temperature（可选）：用于控制生成回复的创造性和随机性。它是一个浮点数，值越高，生成的结果越随机，值越低，生成的结果越保守。默认值为 0.6。

    // top_p（可选）：用于控制生成回复的多样性。它是一个浮点数，介于 0 和 1 之间。较低的值会生成更保守和一致的回复，较高的值会生成更多样化的回复。默认值为 1.0。

    // n（可选）：用于控制生成回复的数量。它是一个整数，表示你想要生成的回复的数量。默认值为 1。

    // 发送请求传送的Data数据
    const data = {
      messages: [
        // 定义的角色
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
        { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
      ],
      max_tokens: 100,
      model: 'gpt-3.5-turbo',
    }

    // 获取AI返回的回答
    const result = await axios.post(apiUrl, data, { headers })
    // console.log(result);

    // AI返回的所有信息
    const botMessage = {
      id: chatHistory.value.length + 1,
      sender: 'bot',
      text: result.data.choices[0].message.content,
    }

    // 将AI返回的信息存入到历史列表中
    chatHistory.value.push(botMessage)
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped>
.service {
  position: fixed;
  right: 100px;
  bottom: 200px;
  display: flex;
  width: 60px;
  height: 60px;
  padding: 5px;
  background-color: #004dff;
  border-radius: 50%;
  box-shadow: 4px 10px 10px -7px black;
  justify-content: center;
  align-items: center;
}

.box {
  height: 500px;
}

.iptbox {
  position: relative;
  display: flex;

  /* justify-content: center; */
  align-items: center;
}

.iptbox input {
  width: 490px;
  height: 40px;
  padding-right: 70px;
  padding-left: 5px;
  border-radius: 10px;
}

.iptbox button {
  position: absolute;
  top: 5px;
  right: 3px;
  width: 60px;
  height: 30px;
  font-weight: 600;
  color: #fff;
  background-color: #707070;
  border: none;
  border-radius: 10px;
}

.bot-message,
.user-message {
  display: flex;
  align-items: center;
}

.bot-message {
  color: #000;
  background-color: #888a9f;
  border-radius: 10px;
}

.user-message {
  padding: 5px 10px;
  color: #000;
  background-color: #6f717e;
  border-radius: 10px;
}

.userBox {
  display: flex;
  margin-right: 10px;
  align-items: center;
}
</style>
