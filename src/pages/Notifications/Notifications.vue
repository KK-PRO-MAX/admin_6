<template>
  <div class="container">
    <!-- 标题区域 -->
    <h3>Notifications</h3>
    
    <!-- 排序与时间/清除区域（调整时间与按钮排版） -->
    <div class="row">
      <div class="col-md-6">
        <div class="btn-group" role="group">
          <button type="button" class="btn" style="background-color: #002F6C;color: #FFF;font-weight: 600;">Prioritization sorting</button>
          <button type="button" class="btn btn-default">Time sorting</button>
        </div>
      </div>
      <div class="col-md-6 top-right-container">
        <span class="current-time">12:52:21 PM<br>May 6th, 2025</span>
        <button type="button" class="btn clear-all">Clear All</button>
      </div>
    </div>
    
    <!-- 动态通知列表（保持不变） -->
    <div class="notification-item" v-for="(item, index) in notifications" :key="index">
      <div class="row align-items-center">
        <div class="col-md-8">
          <span class="notification-bay">
            <img src="../img/report.png" style="margin-bottom: 4px;" alt="">
            BAY {{ item.bay }}</span>
          <span class="notification-title">{{ item.title }}</span>
        </div>
        <div class="col-md-4 text-right">
          <button type="button" class="btn btn-open-bay">Open Bay</button>
          <button type="button" class="btn btn-dismiss">Dismiss</button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-8">
          <span class="notification-user">
            <strong style="color: #000;background-color: #c8c8c8;border-bottom-left-radius: 4px;border-top-left-radius: 4px;padding: 8px;">USER</strong>
             {{ item.user }}</span>
        </div>
        <div class="col-md-4 text-right">
          <div class="time-date">
            <span>{{ item.time }}</span><br>
            <span style="font-weight: 600;">{{ item.date }}</span>
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
      notifications: [
        {
          bay: 8,
          title: 'Door not closed',
          user: 'Emilee Rodriguez',
          time: '12:28 PM',
          date: 'August 21st, 2023'
        },
        {
          bay: 16,
          title: 'Device returned late',
          user: 'Marco Polo',
          time: '12:30 PM',
          date: 'September 12th, 2023'
        },
        {
          bay: 20,
          title: 'Device never checked out',
          user: 'Jessica Martinez',
          time: '12:30 PM',
          date: 'September 23rd, 2023'
        },
        {
          bay: 25,
          title: 'Device marked defective',
          user: 'Juan Bueno Jr. III',
          time: '10:26 PM',
          date: 'October 3rd, 2023'
        }
      ]
    };
  }
};
</script>
<style>
span{
    color: #000;
}
button{
    font-weight: 600;
}
@media (min-width: 1200px) {
    .container {
        width: 1370px;
    }
}
/* 顶部右侧容器排版调整 */
.top-right-container {
    
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px; /* 时间与按钮间距 */
}
.current-time {
  text-align: right;
  color: #555;
  font-size: 13px;
}
.align-items-center {
        line-height: 38px;
    margin-bottom: 22px;
}
/* 原有样式保持不变 */
.notification-bay {
  line-height: 38px;
    background-color: #FF0400;
    color: white;
    padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 6px;
  font-weight: bold;
}
.notification-title {
  color: #000;
  font-size: 16px;
  font-weight: 700;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}
.notification-user {
    border: 1px solid #686868;
  background-color: #e6e6e6;
  color: #000;
  padding:8px 6px 8px 0px;
  margin-left: 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
}
.notification-item {
     border: 1px solid #970300;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 0 8px 8px 0px;
}
.btn-open-bay {
     margin-top: 10px;
  background-color: #0C306C;
  color: white;
  margin-right: 8px;
  padding: 3px 10px;
  font-size: 13px;
  border-radius: 4px;
}
.btn-open-bay:hover {
  background-color: rgb(16, 56, 92);
  color: white;
}
.btn-dismiss {
    
  background-color: #fff;
  color: #0C306C;
  border: 1px solid #0C306C;
  margin-right: 0;
  margin-top: 10px;
  padding: 3px 10px;
  font-size: 13px;
  border-radius: 4px;
  font-weight: 600;
}
.btn-dismiss:hover {
  background-color: #e6e6e6;
  color: #333;
}
.time-date {
  color: #555;
  font-size: 13px;
  line-height: 1.4;
}
.clear-all {
    margin-bottom: 6px;
  background-color: #FF0400;
  color: white;
  padding: 9px 10px;
  font-size: 13px;
  border-radius: 4px;
}
.clear-all:hover {
  background-color: #ff0400;
  color: white;
}
.align-items-center {
  align-items: center !important;
}
.mt-2 {
  margin-top: 6px !important;
}
</style>