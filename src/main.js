import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faTrash);
library.add(faXmark);
library.add(faCheck);
library.add(faPenToSquare); 

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router); 
app.mount('#app');
