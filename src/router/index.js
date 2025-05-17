import { createRouter, createWebHistory } from 'vue-router';
import StudentForm from '../components/StudentForm.vue';
import ReportCard from '../components/ReportCard.vue';
import AllReports from '../components/AllReports.vue';

const routes = [
  {
    path: '/',
    name: 'StudentForm',
    component: StudentForm,
  },
  {
    path: '/report/:studentName',
    name: 'ReportCard',
    component: ReportCard,
    props: true,
  },
  {
    path: '/reports',
    name: 'AllReports',
    component: AllReports,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
