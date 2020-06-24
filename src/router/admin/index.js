import store from '@/store/index'
// import Admin from '@/views/Admin'
var obj;
export default obj = {
    path: '/admin',
    name: 'Admin',
    // component: Admin,
    component: () => import('@/views/Admin'),
    children: [
      {
        path: "booktype",
        name: "bookType",
        component: () => import('@/components/admin/book/BookType.vue'),
      },
      {
        path: "book",
        name: "Book",
        component: () => import('@/components/admin/book/Book.vue'),
      },
      {
        path: "addbook",
        name: "addBook",
        component: () => import('@/components/admin/book/AddBook.vue'),
      },
      {
          path: "ordering",
          name: "Ordering",
          component: ()=> import('@/components/admin/order/Ordering'),
      },
      {
        path: "allorder",
        name: "AllOrder",
        component: ()=> import('@/components/admin/order/AllOrder'),
    },
    {
        path: "ordered",
        name: "Ordered",
        component: ()=> import('@/components/admin/order/Ordered'),
    },
    {
        path: "optstudent",
        name: "optStudent",
        component: ()=>import('@/components/admin/optStudent/OptStudent'),
    },
    {
      path: "addstudent",
      name: "addstduent",
      component: ()=>import('@/components/admin/optStudent/AddStudent'),
    },
    ],
    beforeEnter: (to, from, next) => {
      // if(store.state.right === 1){
      //   next();
      // }
      console.log('执行');
      let a = JSON.parse(sessionStorage.getItem("store"));
      if((store.state.right === 1||(a&&a.right === 1)) && (store.state.islogin||(a&&a.islogin))){
        console.log(1);
        next();
      }else{
        next('/');
      }
    }
}