export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/JsxTest',
        name: 'JsxTest',
        component: () => import('@/views/JsxTest.vue'),
    },
]