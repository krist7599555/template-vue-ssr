import Home from './pages/Home.vue';
import About from './pages/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/**', component: { template: `<div>Not Found</div>` } },
];

export default routes;