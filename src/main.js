import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import { Tabs,TabPane,Input,Button,Row,Message } from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.component(Message.name, Message)
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
