<template>
  <div class="container">
    <!-- 引入Bootstrap v3.3.5 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    
    <!-- 顶部区域 -->
    <div class="row header">
      <div class="col-md-8">
        <h1>Home</h1>
      </div>
      <div class="col-md-4 text-right">
        <button class="btn btn-default account-btn">
          <router-link to="/Account">
            <span style="color:#000" class="glyphicon glyphicon-cog"></span>
          <span style="color: #000;font-weight: 700;">Account Management</span>
          </router-link>
          
        </button>
      </div>
    </div>

    <!-- Lockers部分 -->
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Lockers</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-4">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="lockerIcons.total" class="icon" alt="Total Lockers">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.lockers.total }}</p>
                <p class="stat-label">Total</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="lockerIcons.online" class="icon" alt="Online Lockers">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.lockers.online }}</p>
                <p class="stat-label">Online</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="lockerIcons.offline" class="icon" alt="Offline Lockers">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.lockers.offline }}</p>
                <p class="stat-label">Offline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bays部分 -->
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Bays</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="bayIcons.total" class="icon" alt="Total Bays">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.bays.total }}</p>
                <p class="stat-label">Total</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="bayIcons.assigned" class="icon" alt="Assigned Bays">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.bays.assigned }}</p>
                <p class="stat-label">Assigned</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="bayIcons.unassigned" class="icon" alt="Unassigned Bays">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.bays.unassigned }}</p>
                <p class="stat-label">Unassigned</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="bayIcons.deactivated" class="icon" alt="Deactivated Bays">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.bays.deactivated }}</p>
                <p class="stat-label">Deactivated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Users部分 -->
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Users</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="userIcons.fullTime" class="icon" alt="Full Time Users">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.users.fullTime }}</p>
                <p class="stat-label">Full Time</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="userIcons.temporary" class="icon" alt="Temporary Users">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.users.temporary }}</p>
                <p class="stat-label">Temporary</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Record Data部分 -->
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Record Data</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="recordIcons.download" class="icon" alt="Download Data">
              </div>
              <div class="stat-info">
                <p class="stat-label">Download data</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="recordIcons.lateReturn" class="icon" alt="Late Return">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.records.lateReturn }}</p>
                <p class="stat-label">Late return</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="recordIcons.checkIn" class="icon" alt="Check In">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.records.checkIn }}</p>
                <p class="stat-label">Check in</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <div class="icon-container">
                <img :src="recordIcons.checkOut" class="icon" alt="Check Out">
              </div>
              <div class="stat-info">
                <p class="stat-value">{{ stats.records.checkOut }}</p>
                <p class="stat-label">Check out</p>
              </div>
            </div>
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
      // 动态统计数据
      stats: {
        lockers: {
          total: 100,
          online: 60,
          offline: 40
        },
        bays: {
          total: 100,
          assigned: 100,
          unassigned: 100,
          deactivated: 8
        },
        users: {
          fullTime: 100,
          temporary: 20
        },
        records: {
          lateReturn: 10,
          checkIn: 3,
          checkOut: 80
        }
      },
      // 图标路径 - 使用require()引入本地图片（解决动态加载问题）
      lockerIcons: {
        total: require('./img/1.png'), // 关键：用require包裹路径
        online: require('./img/2.png'),
        offline: require('./img/3.png')
      },
      bayIcons: {
        total: require('./img/4.png'), // 修复此处图片加载问题
        assigned: require('./img/5.png'),
        unassigned: require('./img/6.png'),
        deactivated: require('./img/7.png')
      },
      userIcons: {
        fullTime: require('./img/8.png'),
        temporary: require('./img/9.png')
      },
      recordIcons: {
        download: require('./img/10.png'),
        lateReturn: require('./img/11.png'),
        checkIn: require('./img/12.png'),
        checkOut: require('./img/13.png')
      }
    }
  },
  methods: {
    // 如需请求数据，可在此添加
    fetchData() {
      // this.$http.get('/api/data').then(response => {
      //   this.stats = response.data
      // })
    }
  },
  mounted() {
    // 可在此加载数据
    // this.fetchData()
  }
}
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 1370px;
    }
}
.stat-label[data-v-362a1c9d]{
  font-size: 22px!important;
}
.panel-body{
  padding: 0!important;
}
/* 样式保持不变 */
.header {
  margin: 0px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.account-btn {
  margin-top: 15px;
  padding: 6px 12px;
  border: 1px solid #0C306C;
}

.panel {
  margin-bottom: 20px;
  border: 0px solid #0C306C !important;
}

.panel-heading {
  background-color: #0C306C !important;
  color: white !important;
  padding: 10px 6px;
  width: 125px;
  border-color: #0C306C !important;
}

.stat-card {
  border: 4px solid #0C306C !important;
  border-radius: 4px;
  padding: 15px;
  margin: 0px;
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 100px;
}

.icon-container {
  flex: 0 0 60px;
  margin-right: 15px;
}

.icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.stat-info {
  flex: 1;
  text-align: right;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #333;
  margin: 0;
}
</style>