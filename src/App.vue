<template>
  <div>
    <div class="row">
      <!-- 左侧导航栏 -->
      <div class="col-xs-2 col-xs-offset-" v-if="isMenuVisible">
        <div class="list-group custom-nav">
          <!-- 原有路由链接 -->
          <router-link to="/Notifications" class="list-group-item">
            <img src="./menu_img/notifications.png" alt="Home">
            <span>Notifications</span>
          </router-link>
          <router-link to="/home" class="list-group-item">
            <img src="./menu_img/home.png" alt="Home">
            <span>Home</span>
          </router-link>
          <router-link to="/lockers" class="list-group-item">
            <img src="./menu_img/phone_android.png" alt="Home">
            <span>Lockers</span>
          </router-link>
          
          <!-- 受控制的四个导航按钮 -->
          <router-link to="/devices" class="list-group-item" v-if="showExtraMenus">
            <img src="./menu_img/reports.png" alt="Home">
            <span>Devices Types</span>
          </router-link>
          <router-link to="/Device_Groups" class="list-group-item" v-if="showExtraMenus">
            <img src="./menu_img/deviceGroups.png" alt="Home">
            <span>Groups</span>
          </router-link>
          <router-link to="/Users_1" class="list-group-item" v-if="showExtraMenus">
            <img src="./menu_img/users.png" alt="Home">
            <span>Users</span>
          </router-link>
          <router-link to="/BayManagement_1" class="list-group-item" v-if="showExtraMenus">
            <img src="./menu_img/bayManagement.png" alt="Home">
            <span>BayManagement</span>
          </router-link>
          
          <!-- Logout按钮 - 添加点击事件 -->
          <router-link 
            to="/login_index" 
            class="list-group-item hide-menu-btn"
            @click.native="handleLogout"
          >
            <img src="./menu_img/heid.png" alt="Hide Menu">
            <span style="color: #FFF;font-weight: 600;">Logout</span>
          </router-link>
        </div>
      </div>
      <!-- 右侧内容区 -->
      <div :class="isMenuVisible ? 'col-xs-10' : 'col-xs-12'">
        <div class="panel">
          <div class="panel-body">
            <keep-alive>
              <router-view msg="abc"></router-view>
            </keep-alive>
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
      isMenuVisible: true,
      showExtraMenus: false // 控制四个按钮显示状态
    }
  },
  created() {
    // 监听全局事件，用于显示菜单
    this.$root.$on('showExtraMenus', () => {
      this.showExtraMenus = true;
    });
  },
  watch: {
    $route(to) {
      this.isMenuVisible = to.path !== '/login_index';
    }
  },
  methods: {
    // 处理登出事件，隐藏四个按钮
    handleLogout() {
      this.showExtraMenus = false;
    }
  },
  mounted() {
    this.isMenuVisible = this.$route.path !== '/login_index';
  },
  beforeDestroy() {
    // 移除事件监听，防止内存泄漏
    this.$root.$off('showExtraMenus');
  }
}
</script>

<style>
/* 保持原有样式不变 */
.custom-nav {
  box-shadow: 4px 0px 16px 0px #0000001F;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
}

.custom-nav .list-group-item {
  background-color: #fff;
  border: none;
  padding: 15px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #333;
}

.custom-nav .list-group-item img {
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.custom-nav .list-group-item:hover {
  background-color: #ff9900;
  color: #fff;
}

.custom-nav .list-group-item:hover img {
  transform: scale(1.1);
}

.custom-nav .list-group-item.router-link-exact-active {
  background-color: #ff9900;
  color: #fff;
}

.hide-menu-btn {
  margin-top: auto;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center;
  background-color: #0C306C !important;
  color: #fff !important;
}

.hide-menu-btn img {
  margin-bottom: 0 !important;
  margin-right: 8px !important;
}
</style>