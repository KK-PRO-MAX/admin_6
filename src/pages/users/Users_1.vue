<template>
  <div class="user-management-page container">
    <!-- 顶部操作区域 -->
    <div class="top-bar row" style="margin-bottom: 16px;">
      <div class="col-md-2">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold;">Users (52)</h2>
      </div>
      <div class="col-md-3">
        <input 
          v-model="searchQuery" 
          placeholder="Search" 
          class="form-control search-input"
        >
      </div>
      <div class="col-md-8 text-right">
        <button type="button" class="btn text-orange">Import File</button>
        <button type="button" class="btn text-blue">Export File</button>
        <router-link to="/Users_all">
          <button class="btn add-group-btn" style="background-color: #0C306C; border-color: #0C306C; color: white; margin-left: 8px;">Add New User</button>
        </router-link>
      </div>
    </div>
    
    <!-- 数据表格 -->
    <table class="table table-hover" style="width: 100%;">
      <thead>
        <tr style="background-color: #C7EDFF; color: #000; height: 60px; font-size: 16px; font-weight: bold;">
          <th style="border-left: none; border-right: none;">Name</th>
          <th style="border-left: none; border-right: none;">Assigned Device</th>
          <th style="border-left: none; border-right: none;">User ID</th>
          <th style="border-left: none; border-right: none;">Role</th>
          <th style="border-left: none; border-right: none;">Device Groups</th>
          <th style="border-left: none; border-right: none;"></th> <!-- 空表头 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="index" style="background-color: #fff; height: 50px;">
          <td style="border-left: none; border-right: none;">{{ item.name }}</td>
          <td style="border-left: none; border-right: none;">{{ item.assignedDevice }}</td>
          <td style="border-left: none; border-right: none;">{{ item.userId }}</td>
          <td style="border-left: none; border-right: none;">{{ item.role }}</td>
          <td style="border-left: none; border-right: none;">{{ item.deviceGroups }}</td>
          <!-- 带路由跳转的Edit按钮 -->
          <td style="border-left: none; border-right: none;">
            <router-link :to="`/Users_edit/${item.userId}`">
              <button class="btn edit-btn">Edit</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: '',
      tableData: Array(7).fill({
        name: 'John Doe',
        assignedDevice: 'IPhone#25',
        userId: '1654656',
        role: 'Manager',
        deviceGroups: 'Day Shift Managers, Staff, Office Staff'
      }).concat([
        {
          name: 'Jane Smith',
          assignedDevice: 'Android#18',
          userId: '7890123',
          role: 'Staff',
          deviceGroups: 'Staff, Night Shift'
        },
        {
          name: 'Mike Ross',
          assignedDevice: 'IPad#09',
          userId: '4567890',
          role: 'Admin',
          deviceGroups: 'Admin, Office Staff'
        },
       
        {
          name: 'Mike Ross',
          assignedDevice: 'IPad#09',
          userId: '4567890',
          role: 'Admin',
          deviceGroups: 'Admin, Office Staff'
        },
        {
          name: 'Mike Ross',
          assignedDevice: 'IPad#09',
          userId: '4567890',
          role: 'Admin',
          deviceGroups: 'Admin, Office Staff'
        },
       
        {
          name: 'Mike Ross',
          assignedDevice: 'IPad#09',
          userId: '4567890',
          role: 'Admin',
          deviceGroups: 'Admin, Office Staff'
        },
      ])
    }
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) return this.tableData
      const query = this.searchQuery.toLowerCase()
      return this.tableData.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.assignedDevice.toLowerCase().includes(query) ||
        item.userId.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.deviceGroups.toLowerCase().includes(query)
      )
    }
  }
}
</script>
<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 100%!important;
    }
}.text-orange {
    font-weight: 600;
  color: #FF9900 !important;
  background-color: transparent;
  border: none;
}

.text-blue {
    font-weight: 600;
  color: #7389A3 !important;
  background-color: transparent;
  border: none;
}
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td{
    line-height: 2.5;
}
/* =====滚轮样式 */
.user-management-page {
  padding: 16px;
  overflow: auto;
  height: 730px;
}

.user-management-page::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.user-management-page::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.user-management-page::-webkit-scrollbar-thumb {
  background: #2C4F9E;
  border-radius: 4px;
}
.user-management-page::-webkit-scrollbar-thumb:hover {
  background: #2C4F9E;
}
/* ====== */
.top-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}
.search-input {
  width: 200px;
}
.add-group-btn {
  margin-left: auto;
}
/* 表格样式补充 */
.table-hover tbody tr:hover {
  background-color: #f5f5f5 !important;
}
.table thead tr th:first-child {
  border-top-left-radius: 6px;
}
.table thead tr th:last-child {
  border-top-right-radius: 6px;
}
.table thead {
  border-bottom: 1px solid #e8e8e8 !important;
}

/* Edit按钮样式优化（符合需求） */
.edit-btn {
  color: #0C306C;
  background: transparent;
  border: 1px solid #0C306C; /* 1px黄色边框 */
  border-radius: 4px; /* 圆角4px */
  text-decoration: none; /* 去除下划线 */
  padding: 4px 12px; /* 宽度刚好包裹文字 */
  cursor: pointer;
  font-size: 14px;
}
/* hover效果保持简洁，与整体风格统一 */
.edit-btn:hover {
  background-color: rgba(255, 153, 0, 0.05);
}
/* 去除router-link默认下划线 */
a {
  text-decoration: none;
}
</style>