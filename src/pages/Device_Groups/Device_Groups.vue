<template>
  <div class="container devices-groups-container">
    <!-- 顶部导航栏 -->
    <div class="row top-bar">
      <div class="col-md-4">
        <h1 class="page-title">Groups ({{ devicesGroups.length }})</h1>
      </div>
      <div class="col-md-8">
        <div class="search-bar pull-left">
          <div class="input-group">
            <input 
              type="text" 
              class="form-control search-input" 
              placeholder="Search"
            >
            <span class="input-group-addon search-icon">
               <img src="../img/Vector.png" style="height: 18px;" alt="">
            </span>
          </div>
        </div>
        <div class="button-group pull-right">
          <button type="button" class="btn text-orange">Import File</button>
        <button type="button" class="btn text-blue">Export File</button>
          <router-link :to="{
            path: '/Device_Groups_add',
            query: { type: 'add' }
          }">
            <button class="btn add-group-btn">Add New Group</button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 设备组卡片网格 -->
    <div class="row groups-grid">
      <div 
        v-for="(group, index) in devicesGroups" 
        :key="index"
        class="col-md-4 group-card-container"
      >
        <div class="group-card panel panel-default">
          <div class="panel-body">
            <div class="group-info">
              <div class="group-name-section">
                <p class="info-label">Group Name</p>
                <p class="info-value">{{ group.groupName }}</p>
              </div>
              <div class="devices-count-section">
                <p class="info-label">Devices in Group</p>
                <p class="info-value">{{ group.deviceCount }} Devices</p>
              </div>
            </div>
            <router-link :to="{
              path: '/Device_Groups_add',
              query: { 
                type: 'edit',
                groupID: group.groupID 
              }
            }">
              <button class="btn edit-group-btn">Edit Group</button>
            </router-link>
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
      // 示例数据 - 实际项目中可从API获取
      devicesGroups: [
        { groupID: 1, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 2, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 3, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 4, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 5, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 6, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 7, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 8, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 9, groupName: 'Name Goes Here', deviceCount: '?' },
        { groupID: 10, groupName: 'Name Goes Here', deviceCount: '?' },
      ]
    };
  }
};
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 100%;
    }
}
.devices-groups-container {
  padding: 20px;
}
.groups-grid{

}

/* =====滚轮样式 */
.groups-grid {
  padding: 16px;
  overflow: auto;
  height: 730px;
}

.groups-grid::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.groups-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.groups-grid::-webkit-scrollbar-thumb {
  background: #2C4F9E;
  border-radius: 4px;
}
.groups-grid::-webkit-scrollbar-thumb:hover {
  background: #2C4F9E;
}
/* ====== */
/* 顶部导航栏样式 */
.top-bar {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  line-height: 34px;
}

.search-bar {
  margin-top: 5px;
  width: 250px;
  margin-right: 20px;
}

.search-input {
  border-radius: 4px 0 0 4px;
  border-right: none;
}

.search-icon {
  background-color: #fff;
  border-left: none;
  border-radius: 0 4px 4px 0;
  color: #999;
}

.button-group {
  margin-top: 5px;
}
.text-orange {
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


.add-group-btn {
  background-color: #0C306C;
  color: white;
  font-size: 14px;
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
}

.add-group-btn:hover {
  background-color: #0a2a66;
  color: white;
}

/* 卡片网格样式 */
.groups-grid {
  margin: 0 -15px;
}

.group-card-container {
  padding: 0 15px;
  margin-bottom: 20px;
}

.group-card {
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  box-shadow: none;
}

.group-card .panel-body {
  padding: 20px;
}

.group-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-label {
  font-size: 13px;
  color: #000;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.info-value {
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: 500;
}

.edit-group-btn {
  background-color: #FFF5E7;
  color: #000;
  border: 1px solid #FF9900;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 14px;
}

.edit-group-btn:hover {
  background-color: #FF9900;
  color: #000;
  border-color: #FF9900;
}

/* 响应式调整 */
@media (max-width: 767px) {
  .top-bar {
    flex-direction: column;
  }
  
  .search-bar {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .button-group {
    width: 100%;
    text-align: center;
  }
}
</style>