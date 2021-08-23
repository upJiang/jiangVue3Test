import { createApp } from 'vue';
import FunTipsDialog from './tipsDialog.vue'
// 初始消息列表
export default function TipsDialog(options) {
    // 创建一个节点，并将组件挂载上去
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const app = createApp(FunTipsDialog, {
        ...options, visible: true, remove() {
            app.unmount(mountNode)
            document.body.removeChild(mountNode)
        }
    })
    return app.mount(mountNode)
}

