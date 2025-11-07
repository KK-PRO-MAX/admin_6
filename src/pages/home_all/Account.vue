<template>
  <div class="container">
    <div class="header clearfix" style="margin: 20px 0;">
      <router-link to="/home">
        <img src="../img/left.png" alt="">
      </router-link>
      <h1 class="page-title text-center" style="display: inline-block; width: calc(100% - 160px); margin: 0;">Account Management</h1>
      <router-link to="/add_account_management">
        <button class="btn btn-primary add-button pull-right">Add Account Management</button>
      </router-link>
    </div>

    <div class="scrollable-container panel panel-default" style="max-height: 500px; overflow-y: auto;">
      <table class="table table-striped account-table">
        <thead class="table-header bg-info">
          <tr>
            <th>Account</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr class="table-row" v-for="(account, index) in accounts" :key="index">
            <td>{{ account.account }}</td>
            <td>{{ account.password }}</td>
            <td>
              <div class="action-buttons">
                <!-- /add_account_management -->
                <router-link to="/">
                  <button @click="handleEditAccount(account)" class="btn btn-warning edit-btn">Edit</button>
                </router-link>
                <button @click="handleDeleteAccount(index)" class="btn btn-danger delete-btn">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      accounts: []
    };
  },
  mounted() {
    // 页面加载时从本地存储读取数据
    const stored = localStorage.getItem('accounts');
    if (stored) {
      this.accounts = JSON.parse(stored);
    } else {
      // 初始默认数据
      this.accounts = [
        { account: 'Aaron', password: '123456' },
        { account: 'Abel', password: '123456' },
        { account: 'Achilles', password: '132456' },
        { account: 'Adan', password: '123456' },
        { account: 'Addison', password: '123456' },
      ];
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }
  },
  methods: {
    // 处理编辑
    handleEditAccount(account) {
      localStorage.setItem('editAccount', JSON.stringify(account));
      this.$router.push('/');
      // add_account_management
    },
    // 处理删除
    handleDeleteAccount(index) {
      if (confirm('Are you sure you want to delete this account?')) {
        this.accounts.splice(index, 1);
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
      }
    }
  }
};
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 100%;
    }
}
.back-button {
  font-size: 20px;
  padding: 5px 10px;
  margin-right: 10px;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  vertical-align: middle;
}

.action-buttons .btn {
  margin-right: 10px;
}

/* 自定义滚动条 */
.scrollable-container::-webkit-scrollbar {
  width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>