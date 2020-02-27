<template>
  <div class="">
    <div id="clock">
      <p class="text">{{ date }}{{ time }}{{component.compConfigData.showWeek ? ' ' + week: ''}}</p>
      <!--<p class="time"></p>-->
    </div>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'

  let week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  const _this = {
    name: 'ClockComp',
    mixins: [FuncCompMixin],
    attr: {
      version: '1.0',
      configDataTemp: {
        fontSize: 24,
        color: '#daf6ff',
        showWeek: false
      }
    },
    data() {
      return {
        timer: null,
        date: '',
        time: '',
        week: ''
      }
    },
    mounted() {
      this.updateTime();
      this.timer = setInterval(this.updateTime, 1000);
    },
    destroyed () {
      // 清除定时器
      if(this.timer) {
        clearInterval(this.timer);
      }
    },
    methods: {
      zeroPadding (num, digit) {
        let zero = '';
        for(let i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      },
      updateTime () {
        let cd = new Date();
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ';
        this.week =  week[cd.getDay()];
      }
    },
    computed: {}
  };

  export default _this
</script>

<style scoped>
  #clock {
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    /*position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);*/
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }
  #clock .text {
    /*letter-spacing: 0.1em;*/
    font-size: 24px;
  }
</style>
