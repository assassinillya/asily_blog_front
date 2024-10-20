<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2>Login</h2>
        <el-form :model="form" ref="loginForm" label-width="100px">
          <el-form-item label="Username" prop="username" :rules="[{ required: true, message: 'Please input username', trigger: 'blur' }]">
            <el-input v-model="form.username" placeholder="Enter username"></el-input>
          </el-form-item>
          
          <el-form-item label="Password" prop="password" :rules="[{ required: true, message: 'Please input password', trigger: 'blur' }]">
            <el-input type="password" v-model="form.password" placeholder="Enter password"></el-input>
          </el-form-item>
  
          <el-form-item>
            <p5-button class="login-button" type="primary" @click="submitForm()">登录</p5-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // alert('Login successful');
            console.log('Username:', this.form.username);
            console.log('Password:', this.form.password);
            // 你可以在这里处理登录逻辑，比如发送 API 请求
          } else {
            console.log('Validation failed');
            return false;
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-button{
    margin-left: 45px;
  }

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-card {
    padding: 20px;
    width: 400px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }
  </style>
  