<template>
  <div class="bay-management container">
    <div class="header row">
      <div class="col-md-6">
        <h1>Bay Management</h1>
      </div>
      <div class="col-md-6 text-right buttons">
        <button class="btn btn-default">Charge Stats</button>
        <button class="btn btn-default" @click="showFiltersModal = true">Filters</button>
      </div>
    </div>
    <!-- 卡片容器 -->
    <div class="row bays-container">
      <div 
        v-for="bay in bays" 
        :key="bay.id" 
        class="col-md-2 bay-col"
      >
        <div class="bay-card" 
          :style="{ 
            backgroundColor: getCardColor(bay.status), 
            border: `1px solid ${getBorderColor(bay.status)}`,
            color: getTextColor(bay.status)
          }"
          @click="goToRecentActivities(bay.id)"
        >
          <div 
            class="status-indicator" 
            :style="{ backgroundColor: getIndicatorColor(bay.status) }"
          ></div>
          <div class="bay-number">{{ bay.id }}</div>
          <div v-if="bay.time" class="bay-time">
            {{ bay.time }}<br>
            <!-- 为date-format添加动态颜色，与框框字体颜色一致 -->
            <span class="date-format" :style="{ color: getTextColor(bay.status) }">MM/DD/YY</span>
          </div>
          <div class="bay-status">{{ bay.status }}</div>
        </div>
      </div>
    </div>
   
    <!-- Filters弹框 -->
    <div class="modal-backdrop" v-if="showFiltersModal">
      <div class="filters-modal">
        <!-- 标题栏 -->
        <div class="filters-header">
          <h3 class="filters-title">Filters</h3>
          <button class="close-btn" @click="showFiltersModal = false">×</button>
        </div>
        <!-- Device Types -->
        <div class="device-types-group">
          <h4 class="group-label">Device Types</h4>
          <div class="btn-group">
            <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
              All <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#">All</a></li>
              <li><a href="#">iPhone</a></li>
              <li><a href="#">iPad</a></li>
              <li><a href="#">Android Tablet</a></li>
              <li><a href="#">Zebra</a></li>
            </ul>
            <button class="btn btn-default">iPhone</button>
            <button class="btn btn-default">iPad</button>
            <button class="btn btn-default">Android Tablet</button>
            <button class="btn btn-default">Zebra</button>
          </div>
        </div>
        <!-- Status和Deactivated Bay reason 两列布局 -->
        <div class="filter-columns row">
          <div class="col-md-6">
            <h4 class="group-label">Status</h4>
            <label class="filter-checkbox">
              <input type="checkbox"> Available
            </label>
            <label class="filter-checkbox">
              <input type="checkbox" checked> Deactivated
            </label>
            <label class="filter-checkbox">
              <input type="checkbox"> Checked-Out
            </label>
            <label class="filter-checkbox">
              <input type="checkbox"> Charging
            </label>
            <label class="filter-checkbox">
              <input type="checkbox"> Full Charge
            </label>
          </div>
          <div class="col-md-6">
            <h4 class="group-label">Deactivated Bay reason</h4>
            <label class="filter-checkbox">
              <input type="checkbox"> Not Needed
            </label>
            <label class="filter-checkbox">
              <input type="checkbox" checked> Device Malfunction
            </label>
            <label class="filter-checkbox">
              <input type="checkbox"> Bay Malfunction
            </label>
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="filters-buttons text-center">
          <button class="btn btn-default clear-btn" @click="showFiltersModal = false">Clear All</button>
          <button class="btn btn-primary apply-btn" @click="showFiltersModal = false">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirmModal: false,
      showFiltersModal: false,
      bays: [
        { id: 1, status: 'AVAILABLE', time: '' },
        { id: 2, status: 'CHARGING', time: '' },
        { id: 3, status: 'CLEANING', time: '17:30' },
        { id: 4, status: 'CLEANING', time: '17:45' },
        { id: 5, status: 'OCCUPIED', time: '18:10' },
        { id: 6, status: 'UNAVAILABLE', time: '' },
        { id: 7, status: 'AVAILABLE', time: '' },
        { id: 8, status: 'OCCUPIED', time: '19:20' },
        { id: 9, status: 'CHARGING', time: '' },
        { id: 10, status: 'CLEANING', time: '20:05' },
        { id: 11, status: 'UNAVAILABLE', time: '' },
        { id: 12, status: 'OCCUPIED', time: '21:30' },
        { id: 13, status: 'OCCUPIED', time: '21:30' },
        { id: 14, status: 'INACTIVE', time: '' }
      ]
    };
  },
  methods: {
    goToRecentActivities(bayId) {
      this.$router.push({
        path: '/Bay_Recent_Activities',
        query: { bayNumber: bayId }
      });
    },
    getCardColor(status) {
      const colorMap = {
        'AVAILABLE': '#f0f9f0',
        'CHARGING': '#f0f9f0',
        'CLEANING': '#f0f7fc',
        'OCCUPIED': '#fff8e6',
        'UNAVAILABLE': '#feeaea',
        'INACTIVE': '#f5f5f5'
      };
      return colorMap[status] || '#ffffff';
    },
    getBorderColor(status) {
      const colorMap = {
        'AVAILABLE': '#1BAA00',
        'CHARGING': '#1BAA00',
        'CLEANING': '#002F6C',
        'OCCUPIED': '#B07800',
        'UNAVAILABLE': '#686868',
        'INACTIVE': '#686868'
      };
      return colorMap[status] || '#686868';
    },
    getTextColor(status) {
      const colorMap = {
        'AVAILABLE': '#1BAA00',
        'CHARGING': '#1BAA00',
        'CLEANING': '#002F6C',
        'OCCUPIED': '#B07800',
        'UNAVAILABLE': '#970300',
        'INACTIVE': '#686868'
      };
      return colorMap[status] || '#686868';
    },
    getIndicatorColor(status) {
      const colorMap = {
        'AVAILABLE': '#22D500',
        'CHARGING': '#22D500',
        'CLEANING': '#1BAAE3',
        'OCCUPIED': '#FFAE00',
        'UNAVAILABLE': '#FF0400',
        'INACTIVE': '#AFAFAF'
      };
      return colorMap[status] || '#AFAFAF';
    },
    
  }
};
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 1280px;
    }
}
/* 样式保持不变 */
.bay-management {
  font-family: Arial, sans-serif;
  position: relative;
}
.header {
  margin-bottom: 24px;
  align-items: center;
}
.header h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  line-height: 1.5;
}
.buttons {
  padding-top: 10px;
}
.buttons button {
  margin-left: 10px;
}
.bays-container {
  margin: 0 -10px;
}
.bay-col {
  padding: 0 10px !important;
  margin-bottom: 20px;
}
.bay-card {
  position: relative;
  height: 120px;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 1px 1px 0px #0000003D;
  transition: box-shadow 0.2s;
}
.bay-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.status-indicator {
  position: absolute;
  top: 0;
  right: 15px;
  width: 20px;
  height: 40px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
.bay-number {
  font-size: 36px;
  font-weight: bold;
  margin-left: 0px;
  margin-bottom: -20px;
}
.bay-time {
  text-align: right;
  font-size: 12px;
  margin-right: 5px;
  line-height: 1.4;
  margin-bottom: 8px;
}
.date-format {
  font-size: 10px;
  /* 移除固定颜色，使用动态绑定的颜色 */
}
.bay-status {
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 4px;
}
/* 确认弹窗样式 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
.confirm-modal {
  background-color: white;
  border-radius: 8px;
  width: 380px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.modal-icon {
  width: 50px;
  height: 50px;
  background-color: #0C306C;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 20px;
}
.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333333;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.cancel-btn {
  padding: 8px 24px;
  font-size: 16px;
  color: #333;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

/* Filters弹框样式 */
.filters-modal {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.filters-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333333;
}
.close-btn {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}
.device-types-group {
  margin-bottom: 20px;
}
.group-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #555555;
}
.btn-group .btn {
  border-radius: 20px !important;
  margin-right: 10px;
}
.btn-group .btn-primary {
  background-color: #0C306C;
  border-color: #0C306C;
}
.btn-group .btn-default {
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  color: #333;
}
.filter-columns {
  margin-bottom: 20px;
}
.filter-checkbox {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
}
.filter-checkbox input {
  margin-right: 8px;
  vertical-align: middle;
}
.filters-buttons {
  margin-top: 20px;
}
.clear-btn {
  border-radius: 4px;
  padding: 8px 20px;
  margin-right: 10px;
}
.apply-btn {
  border-radius: 4px;
  padding: 8px 20px;
  background-color: #0C306C;
  border-color: #0C306C;
  color: white;
}
</style>