<template>
  <!-- 外层容器：完全复刻图片居中布局 -->
  <div class="login-container">
    <!-- 系统图标：调大尺寸，保持比例适配 -->
    <img src="../img/1_2.png" alt="HonestWaves Icon" class="login-icon" />
    <!-- 主标题：HonestWaves 独立成行，加粗醒目 -->
    
    <!-- 新增：登录表单框框（带圆角边框） -->
    <div class="form-container">
         <!-- 副标题：Admin Portal 与主标题上下衔接 -->
    <h2 class="sub-title">Admin Portal</h2>
      <form class="login-form" @submit.prevent="handleLogin">
        <!-- 账号输入框 -->
        <input
          type="text"
          class="form-input"
          placeholder="Username"
          v-model="username"
          required
        />
        <!-- 密码输入框 -->
        <input
          type="password"
          class="form-input"
          placeholder="Password"
          v-model="password"
          required
        />
        <!-- 登录按钮：保持原有样式 -->
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟账号密码绑定
      username: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      // 保留原有跳转逻辑，可后续对接真实接口
      console.log("模拟登录：", this.username, this.password);
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
/* 全屏容器：完全居中，无额外边距 */
.login-container {
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: #fff; /* 图片默认白色背景 */
  gap: 15px; /* 按图片元素间距精准调整 */
}

/* 图标样式：调大尺寸，保持比例不拉伸 */
.login-icon {
  width: 260px; /* 原60px，放大33% */
  height: auto;
  object-fit: contain;
}

/* 主标题：大字号+粗体，复刻图片视觉权重 */
.main-title {
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: "Segoe UI", sans-serif;
}

/* 副标题：中等字号，与主标题形成层级 */
.sub-title {
  font-size: 18px;
  color: #000;
    font-weight: 700;
    margin-bottom: 30px;
  padding: 0;
  text-align: center;
  font-family: "Segoe UI", sans-serif;
}

/* 提示文本：小字号+浅灰色，复刻图片弱化效果 */
.login-hint {
  font-size: 14px;
  color: #666;
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: "Segoe UI", sans-serif;
}

/* 新增：表单框框样式（圆角边框） */
.form-container {
  width: 800px;
  padding: 25px;
  border: 2px solid #252B4266;
  border-radius: 12px; /* 圆角边框 */
  background-color: #fff;
}

/* 新增：表单布局 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px; /* 输入框与按钮间距 */
}

/* 新增：输入框样式 */
.form-input {
    text-align:center;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px; /* 输入框圆角 */
  background-color: #F0F0F0;
  font-size: 14px;
  color: #333;
  font-family: "Segoe UI", sans-serif;
  box-sizing: border-box; /* 防止宽度溢出 */
}

/* 输入框聚焦样式（优化体验） */
.form-input:focus {
  outline: none;
  /* border-color: #F0F0F0; */
  border: 1px solid #002F6C; /* 图片默认边框效果 */
}

/* 登录按钮：保持原有样式不变 */
.login-btn {
    width: 70%;
    margin: 0 auto;
    font-weight: 700;
  padding: 8px 28px;
  border: 1px solid #ddd; /* 图片默认边框效果 */
  border-radius: 8px; /* 精准匹配图片圆角弧度 */
  background-color: #002F6C; /* 图片白色按钮背景 */
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  font-family: "Segoe UI", sans-serif;
  transition: none; /* 去掉额外hover效果，完全贴合图片 */
  margin-top: 8px;
}
</style>