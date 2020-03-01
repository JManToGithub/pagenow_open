# PageNow（基于SpringBoot+Vue构建的数据可视化开发平台）

### 介绍
基于SprigBoot+Vue构建的数据可视化开发平台，灵活的拖拽式布局、支持多种数据源、丰富的通用组件，帮助您快速的构建与迭代数据大屏页面。

官方网站：[PageNow官网](http://118.178.226.141/)

演示地址（演示系统为企业版本，开源版删减了部分功能）：[http://139.9.101.78:8080/pagenow/login](http://139.9.101.78:8080/pagenow/login) 演示用户账号：user/123

### 目录结构
1. server：存放系统后端程序JAR包与数据库初始化脚本等其他相关部署文件
2. web：前端主程序源码（基于Vue-cli3.0为基础构建的项目结构）

### 后端架构选型
 **（备注：开源版本后端源码不开放）** 

| 1、 | SpringBoot | 主架构框架         |
| --- | ---------- | ------------------ |
| 2、 | JFinal     | 基于Db的数据库操作 |
| 3、 | Druid      | 数据库连接池       |
| 4、 | Swagger2   | 接口测试框架       |
| 5、 | Maven      | 项目构建管理       |


### 前端架构选型
| 1、 | vue        | mvvm框架   |
| --- | ---------- | ---------- |
| 2、 | vue-router | 路由管理   |
| 3、 | vuex       | 状态管理   |
| 4、 | axios      | HTTP 库    |
| 5、 | echarts    | 可视化图表 |
| 6、 | iview      | UI 组件库  |
| 7、 | jquery     | 函式库     |

### 特性

1.  支持移动端响应式布局和大屏绝对定位布局两种页面布局方案
2.  功能强大且的拖拽式页面布局设计器，支持框选组件、多选组件、组件成组等灵活的设计器功能
3.  支持组件自定义样式脚本编辑
4.  支持运行时自定义代码编辑，更方便的实现您的个性化需求
5.  丰富的组件进出场动画，让你的页面动起来
6.  动态编译运行的图表组件，让你的图表开发更灵活
7.  支持工程级别与页面级别的图表主题定制与切换
8.  组件支持多种数据源绑定（静态数据、API接口、数据库脚本、CSV数据文件）
9.  灵活的部署与发布
10. 及时响应的定制开发

### 环境搭建

#### 开发工具
- Git: 版本管理
- DataGrip: 数据库管理工具（Mac环境下使用）
- Navicat for MySQL: 数据库客户端（Window环境下使用）
- WebStorm: web开发工具（此为推荐使用，按个人情况选择）

#### 开发环境
- JDK7+
- Mysql5.5+
- NodeJS 最新版本
- Yarn （个人推荐使用yarn而不是npm）

#### 资源下载
请自行上网下载，如果找不到相关资源，请联系我。

### 开发环境部署

#### 数据库初始化
使用数据库管理工具，新建数据库，命名为pagenow_open，然后运行server目录下的pagenow_open.sql初始化脚本，开源版本总共有7张表，如下图所示
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/213717_ead06d7e_145187.png "WX20200227-213629@2x.png")

#### 后端程序部署

注意：建议JDK版本在1.7及以上，环境变量配置请自行百度。

- 运行环境检测：在cmd中运行

```
java -version
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/103618_e5d86616_145187.png "java-version.png")

-  **注意：建议将server目录中的pagenow_serve-0.0.1-SNAPSHOT.jar文件拷贝出来，放到其他盘符某个非中文指定目录下，例如：如果您是window系统，那么建议在任意盘符下新建一个pagenow目录，然后将jar包拷贝至此目录下，然后同样在此目录下新建一个文件夹，命名为pagenowUpload，用于存储上传附件** 

- 然后修改JAR包中的相关配置文件，MAC系统环境与Window系统环境下操作不一样，但主要目的都是为了修改下图中显示的这两个配置文件，一般window系统下使用解压软件打开jar包，将这两个配置文件拷贝出来，然后修改配置，重新覆盖即可；mac系统下就稍微有点麻烦，如果遇到问题，请联系我。

![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/212214_fc8cd52b_145187.png "WX20200227-212053@2x.png")

- db.properties配置文件主要用于配置数据库连接，根据您的系统环境自行配置即可
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/213040_03f352e9_145187.png "WX20200227-212347@2x.png")

- application.properties配置文件主要配置一些系统运行环境变量，例如文件上传目录等，文件中都有相关备注，按照您的系统环境自行配置即可
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/213144_2abef145_145187.png "WX20200227-212425@2x.png")

- 修改完相关配置之后，cmd进入jar包所在根目录，运行如下命令：

```
java -jar pagenow_serve-0.0.1-SNAPSHOT.jar
```
看到如下图所示，及代表启动成功
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/213857_c4998b93_145187.png "WX20200227-213841@2x.png")

- 测试运行，打开浏览器，输入http://localhost:8090，显示下图界面及代表后端程序部署成功
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/214015_393d126b_145187.png "WX20200227-213944@2x.png")


#### 前端部署

- 进入web根目录，安装相关依赖包：

```
# 使用 npm    
npm install

# 使用 yarn    
yarn install
```

- 修改.env配置文件
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/214351_88f473d4_145187.png "WX20200227-214337@2x.png")

- 前端项目默认使用8081端口启动，可以在vue.config.js文件中修改，运行如下命令启动项目：

```
# 使用 npm    
npm run serve

# 使用 yarn    
yarn serve
```

### 系统截图

![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/214910_6a41159c_145187.png "WX20200227-134232@2x.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/214919_a3a1b401_145187.png "WX20200227-134746@2x.png")

### 组件开发规范

请前往官网查看 [PageNow官网](http://116.62.12.155:8080/)

### 联系方式：购买咨询，学习交流

QQ：229041307；微信：huangjian325（加微信请做好备注）




