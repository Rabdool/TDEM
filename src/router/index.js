import { createRouter, createWebHistory } from 'vue-router';
import StudentForm from '../components/StudentForm.vue';
import ReportCard from '../components/ReportCard.vue';

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
  path: '/report-card/:className/:teacherName',
  name: 'ReportCard',
  component: ReportCard,
  props: true
}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
