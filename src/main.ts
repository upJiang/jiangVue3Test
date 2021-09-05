import { createApp } from 'vue';
import antd from './config/antd.config'; 
import router from './router';
import { store, key } from './store';
import App from './App.vue';
import i18n from './config/i18n.config';
import globalVar from "./config/globalVar"

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

import  "jiang-mini-ele/lib/styles/index.css";

// 引入全局自定义组件
import d from "@/config/d";

// 引入全局自定义函数组件
import fc from "@/components/function/index"


const app = createApp(App)

Sentry.init({
    app,
    dsn: "https://e422722f66454013a79cbf2bea024d6f@o911990.ingest.sentry.io/5909050",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  
app.use(i18n)
app.use(store, key)
app.use(router)
app.use(antd) 
app.use(globalVar)
app.use(d)
app.use(fc)
app.mount('#app')

