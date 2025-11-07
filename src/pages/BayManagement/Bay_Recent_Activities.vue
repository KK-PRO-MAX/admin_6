<template>
  <div class="container">
    <!-- 顶部区域：返回图标 + 居中标题 -->
    <div class="row" style="margin-bottom: 15px;">
      <!-- 返回图标（最左侧） -->
      <div class="col-md-1">
        <router-link to="/BayManagement_1">
            <img src="./left.png" alt="">
        </router-link>
       
      </div>
      <!-- 居中标题 -->
      <div class="col-md-10 text-center">
        <h2 class="page-header" style="margin: 0;">Bay {{ bayNumber }} - Recent Activities</h2>
      </div>
      <!-- 右侧占位（保持布局平衡） -->
      <div class="col-md-1"></div>
    </div>

    <div class="panel panel-default">
      <div class="panel-body">
        <!-- 开关、保存按钮、停用原因下拉 -->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Bay Activate</label>
              <label class="switch">
                <input type="checkbox" v-model="bayActivate">
                <span class="slider round"></span>
              </label>
              <button class="btn btn-orange" style="margin-top: 10px;margin-left: 10px;">Save</button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Deactivation reason</label>
              <select class="form-control">
                <option>Select Reason</option>
                <option>Not Needed</option>
                <option>Device Malfunction</option>
                <option>Bay Malfunction</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 操作按钮组 -->
        <div class="row">
          <div class="col-md-12">
            <h4>What do you want to do?</h4>
            <div>
              <button class="btn btn-orange">Open Bay</button>
              <button class="btn btn-orange">Check-Out</button>
              <button class="btn btn-orange">Check-In</button>
            </div>
          </div>
        </div>

        <!-- 历史记录与导出链接 -->
        <div class="row" style="margin-top: 20px;">
          <div class="col-md-8">
            <h4>Recent Bay Activity History</h4>
          </div>
          <div class="col-md-4 text-right export-links">
            <a href="#">Export as PDF</a> | <a href="#">Export as CSV</a>
          </div>
        </div>

        <!-- 历史记录表格 -->
        <div class="row">
          <div class="col-md-12">
            <table class="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Device</th>
                  <th>Bay</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(activity, index) in activities" :key="index">
                  <td>{{ activity.time }}</td>
                  <td>{{ activity.status }}</td>
                  <td>{{ activity.device }}</td>
                  <td>{{ activity.bay }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BayActivity',
  data() {
    return {
      // 从路由参数中获取bayNumber，默认值为4
      bayNumber: this.$route.query.bayNumber || 4,
      bayActivate: false,
      activities: [
        { time: '11/21/2023 - 12:56 PM', status: 'Checked-out', device: 'iPhone002', bay: 'Bay2' },
        { time: '10/15/2023 - 2:56 PM', status: 'Checked-out', device: 'iPhone002', bay: 'Bay2' },
        { time: '10/13/2023 - 11:30 AM', status: 'Checked-out', device: 'iPhone002', bay: 'Bay2' },
        { time: '09/21/2023 - 5:19 PM', status: 'Checked-out', device: 'iPhone002', bay: 'Bay2' },
        { time: '09/12/2023 - 7:00 PM', status: 'Checked-out', device: 'iPhone002', bay: 'Bay2' }
      ]
    }
  }
}
</script>

<style  scoped>
@media (min-width: 1200px) {
    .container {
        width: 1280px;
    }
}
/* 按钮样式：默认浅黄色，hover橘色，带间距 */
.btn-orange {
  background-color: #fecf8f; /* 浅黄色默认 */
  border-color: #fecf8f;
  color: #000;
  margin-right: 10px;
}
.btn-orange:hover {
  background-color: #fec163; /* 橘色hover */
  border-color: #fec163;
}
.btn-orange:last-child {
  margin-right: 0; /* 最后一个按钮取消右间距 */
}

/* 表格样式 */
.table {
  border-collapse: collapse;
}
.table th, .table td {
  border-top: 1px solid #ddd;
  border-bottom: none;
  border-left: none;
  border-right: none;
  padding: 8px 12px;
}
.table th {
  font-weight: bold;
}
.table tr:last-child td {
  border-bottom: 1px solid #ddd;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 10px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}
input:checked + .slider {
  background-color: #fec163;
}
input:focus + .slider {
  box-shadow: 0 0 1px #fec163;
}
input:checked + .slider:before {
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}

/* 导出链接样式 */
.export-links a {
  color: #428bca;
  text-decoration: none;
}
.export-links a:hover {
  text-decoration: underline;
}

/* 表单标签对齐 */
.control-label {
  margin-right: 10px;
  line-height: 34px;
}

/* 返回链接样式 */
.back-link {
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
}
.back-link:hover {
  color: #fec163; /* hover时变橘色 */
}
</style>