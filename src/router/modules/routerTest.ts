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
    {
        path: '/mayi',
        name: 'mayi',
        component: () => import('@/views/mayi.vue'),
    },
]