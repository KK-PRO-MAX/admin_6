<template>
  <div class="container">
    <div class="row header">
      <div class="col-md-12">
        <router-link to="/Account">
          <img src="../img/left.png" alt="">
        </router-link>
        <h1 class="page-title">{{ isEdit ? 'Edit Account Management' : 'Add Account Management' }}</h1>
      </div>
    </div>

    <!-- 其他内容保持不变 -->
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default form-container">
          <div class="panel-body">
            <form>
              <div class="form-group">
                <label class="control-label">Account：</label>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Please enter your account"
                  v-model="formData.account"
                >
              </div>

              <div class="form-group">
                <label class="control-label">Password：</label>
                <input 
                  type="password" 
                  class="form-control" 
                  placeholder="Please enter your password"
                  v-model="formData.password" 
                >
              </div>

              <button type="button" class="btn btn-primary pull-right submit-button" @click="handleSubmit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        account: 'default_user',
        password: 'default_pwd123'
      },
      isEdit: false,
      originalAccount: null
    }
  },
  created() {
    const editData = localStorage.getItem('editAccount');
    if (editData) {
      this.isEdit = true;
      const account = JSON.parse(editData);
      this.formData = { ...account };
      this.originalAccount = account;
    }
  },
  beforeUnmount() {
    localStorage.removeItem('editAccount');
  },
  methods: {
    handleSubmit() {
      if (!this.formData.account || !this.formData.password) {
        alert('Please enter account and password');
        return;
      }

      const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

      if (this.isEdit) {
        const index = accounts.findIndex(
          (item) => item.name === this.originalAccount.name
        );
        if (index !== -1) {
          accounts[index] = { ...this.formData };
        }
      } else {
        accounts.push({ ...this.formData });
      }

      localStorage.setItem('accounts', JSON.stringify(accounts));
      this.$router.push('/Account');
    }
  }
}
</script>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #ffffff;
}

.header {
  margin-bottom: 40px;
  padding: 0 15px;
}

.header .col-md-12 {
  position: relative; /* 新增：为标题定位提供参考 */
}

.back-button {
  font-size: 20px;
  margin-right: 20px;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  display: inline-block;
  margin: 0;
  /* 新增：让标题水平居中 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.form-container {
  box-shadow: 4px 4px 12px 0px #00000040;
  padding: 30px;
}

.form-group {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #F2F2F2;
}

.control-label {
  margin-bottom: 8px;
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.form-control {
  font-size: 14px;
  color: #666666;
}

.form-control::placeholder {
  color: #C0C4CC;
}

.submit-button {
  background-color: #0C306C;
  border-color: #0C306C;
}

.submit-button:hover {
  background-color: #0a2554;
  border-color: #0a2554;
}
</style>