import './assets/main.css';
import './assets/fonts.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setupCalendar, Calendar } from 'v-calendar';
import 'v-calendar/style.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

setupCalendar(app);
app.use(createPinia());
app.use(router);

app.mount('#app');
