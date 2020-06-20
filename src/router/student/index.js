var obj;
export default obj = {
    path: '/student',
    name: 'Student',
    component: () => import('@/views/Student.vue'),
    children: [
      {
        path: "findbook",
        name: "findBook",
        component: () => import('@/components/student/FindBook.vue'),
      },
      {
        path: "myorder",
        name: "myOrder",
        component: () => import('@/components/student/MyOrder.vue'),
      },
    ]
}