<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <BackToHome />
    <h2 class="text-2xl font-bold mb-6 text-center">All Student Reports</h2>

    <div v-if="reports.length === 0" class="text-center text-gray-500">
      No reports found.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="(report, index) in reports"
        :key="index"
        class="p-4 border rounded bg-gray-50 flex justify-between items-center"
      >
        <div>
          <p><strong>Name:</strong> {{ report.name }}</p>
          <p><strong>Class:</strong> {{ report.class }}</p>
          <p><strong>Teacher:</strong> {{ report.teacher }}</p>
        </div>

        <div class="flex flex-col gap-2">
          <router-link
            :to="{
              name: 'ReportCard',
              params: { studentName: report.name },
              query: { class: report.class, teacher: report.teacher }
            }"
            class="text-blue-600 hover:underline"
          >
            Edit
          </router-link>

          <button
            @click="deleteReport(index)"
            class="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BackToHome from './BackToHome.vue';

export default {
    components: { BackToHome },
  name: 'AllReports',
  data() {
    return {
      reports: [],
    };
  },
  mounted() {
    this.loadReports();
  },
  methods: {
    loadReports() {
      this.reports = JSON.parse(localStorage.getItem('allReports')) || [];
    },
    deleteReport(index) {
      if (confirm('Are you sure you want to delete this report?')) {
        this.reports.splice(index, 1);
        localStorage.setItem('allReports', JSON.stringify(this.reports));
        this.loadReports();
      }
    },
  },
};
</script>
