<template>
    <div>
      <h1>Lista de Problemas</h1>
      <el-button type="success" @click="obtenerProblemas" icon="el-icon-check" circle>Obtener Problemas</el-button>
      <el-row>
        <el-col :span="12" v-for="(problema, index) in problemas" :key="problema.id">
          <todo-item :item="problema" :index="index" type="issue" @closeIssue="cerrarProblema"></todo-item>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TodoItem from '@/components/TodoItem.vue';
  
  const client = axios.create({
    baseURL: process.env.VUE_APP_GITHUB_ENDPOINT,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    },
  });
  
  export default {
    name: 'ListaProblemas',
    components: {
      TodoItem
    },
    data() {
      return {
        problemas: [],
      };
    },
    methods: {
      obtenerProblemas() {
        client.get('/issues')
          .then((response) => {
            this.problemas = response.data;
          })
          .catch((error) => {
            console.error('Error al obtener problemas', error);
          });
      },
      cerrarProblema(index) {
        const target = this.problemas[index];
        client.patch(`/issues/${target.number}`, {
          state: 'closed'
        })
        .then(() => {
          this.problemas.splice(index, 1);
        })
        .catch((error) => {
          console.error('Error al cerrar el problema', error);
        });
      }
    },
    created() {
      this.obtenerProblemas();
    }
  }
  </script>
  
  <style scoped>
  .el-button {
    margin-bottom: 20px;
}
</style>
