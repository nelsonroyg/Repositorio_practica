<template>
    <div>
      <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
        <el-row :gutter="12">
          <el-col :span="21">{{ item.title || item }}</el-col>
          <el-col :span="3">
            <el-button @click="handleClick" type="success" icon="el-icon-check" circle></el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: {
      item: {
        type: [String, Object],
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.$emit(this.type === 'todo' ? 'removeTodo' : 'closeIssue', this.index);
      }
    }
  }
  </script>
  
  <style scoped>
  .box-card {
    margin: 5px 0;
  }
  </style>
  