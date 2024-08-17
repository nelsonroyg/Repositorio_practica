<template>
    <div>
      <h1>Lista de Tareas</h1>
      <!-- Formulario de entrada de tareas -->
      <form @submit.prevent="addTodo()">
        <el-input placeholder="tarea" v-model="todo"></el-input>
      </form>
      <el-row :gutter="12">
        <!-- Área de visualización de tareas -->
        <el-col :span="12" v-for="(todo, index) in todos" :key="index">
          <todo-item :item="todo" :index="index" type="todo" @removeTodo="removeTodo"></todo-item>
        </el-col>
        <!-- Área de visualización de problemas -->
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
      'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
  });
  
  export default {
    name: 'TodosIssues',
    components: {
      TodoItem
    },
    data() {
      return {
        todo: '',
        todos: [],
        problemas: []
      };
    },
    methods: {
      // Gestión de tareas
      addTodo() {
        this.todos.push(this.todo);
        this.todo = '';
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      // Gestión de problemas
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
      },
      obtenerProblemas() {
        client.get('issues')
          .then((res) => {
            this.problemas = res.data;
          })
          .catch((error) => {
            console.error('Error al obtener problemas', error);
          });
      }
    },
    created() {
      this.obtenerProblemas();
    }
  }
  </script>
  
  <style scoped>
  .el-input {
    margin-bottom: 20px;
  }
  </style>
  