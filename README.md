# PageNow-基础开源版（基于SpringBoot+Vue构建的数据可视化开发平台）

### 介绍
基于SprigBoot+Vue构建的数据可视化开发平台，灵活的拖拽式布局、丰富的通用组件，帮助您快速的构建与迭代数据大屏页面。

基础开源版仅作为交流学习使用，基础开源版将于2021年3月1日起正式维护更新。

如需购买功能更强大且完善的企业版，请前往官网进行查看并在线体验企业版。

官方网站：[http://pagenow.cn](http://pagenow.cn)

### 目录结构
1. server：后端程序源码
2. web：前端主程序源码（基于Vue-cli3.0为基础构建的项目结构）

### 后端架构选型

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

1、原生支持多设备自动适配，真正做到一次开发，多处运行

2、拖拽式页面布局设计器，支持框选组件、组件复制粘贴、多组件组合等灵活的设计器功能

3、运行时样式编辑，实现一切你能想象的画面

4、运行时自定义脚本编辑，通过丰富的API接口，助你实现更为丰富的页面交互效果

5、丰富的组件进出场动画，让你的页面不再枯燥无味

6、支持可扩展的Echarts图表配置

7、支持工程级别与页面级别的图表主题定制与切换

8、原生支持多种数据源绑定（静态数据、API接口、数据库脚本、CSV数据文件）

### 环境搭建

#### 开发工具
- Git: 版本管理
- DataGrip: 数据库管理工具（Mac环境下使用）
- Navicat for MySQL: 数据库客户端（Window环境下使用）
- WebStorm: web开发工具（此为推荐使用，按个人情况选择）
- IntelliJ IDEA：server后端开发

#### 开发环境
- JDK7+
- Mysql5.5+
- NodeJS 最新版本
- Yarn （个人推荐使用yarn而不是npm）

#### 资源下载
请自行上网下载，如果找不到相关资源，请联系我。

### 开发环境部署

#### 数据库初始化
使用数据库管理工具，新建数据库，命名为pagenow_open，然后运行目录server/src/main/resources/db下的pagenow_open.sql初始化脚本，开源版本总共有7张表，如下图所示
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/213717_ead06d7e_145187.png "WX20200227-213629@2x.png")

#### 后端程序启动

注意：建议JDK版本在1.7及以上，环境变量配置请自行百度。

- 运行环境检测：在cmd中运行

```
java -version
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/103618_e5d86616_145187.png "java-version.png")


使用IDEA开发工具，直接打开server目录，然后运行mvn相关命令安装相关依赖包，一般IDEA会自动下载相关依赖包

打开resources目录下的db.properties配置文件，如下图所示

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/231436_5942a009_145187.png "WX20210228-231421.png")

修改相关数据库连接配置

然后打开resources目录下的application.properties配置文件

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/231638_899b4071_145187.png "WX20210228-231628.png")

此配置文件中，需要修改红框内的配置，file.uploadFolder配置的是系统附件存储目录，根据您的操作系统环境进行配置，项目启动前，必须先创建pagenowUpload文件夹，然后将绝对路径配置到file.uploadFolder下，结尾必须带斜杠。

然后在主文件PagenowApplication上右键，选择Run 'PagenowApplication'运行

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/232146_40c393b6_145187.png "WX20210228-232106.png")

如下图所示，即为启动成功

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/232506_17df9a32_145187.png "WX20210228-232227.png")

打开浏览器，输入localhost:8090验证是否正常运行，如下图所示，证明后端程序运行成功

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/232415_873c2f7d_145187.png "WX20210228-232323.png")


#### 前端程序启动

- 使用webstorm打开web目录，然后运行一下命令安装相关依赖包：

```   
yarn install
```

 **注意：PageNow项目不支持使用npm安装依赖包和启动工程，否则会出现工程无法启动的问题，如果没有安装yarn，可以自行百度进行安装** 

- 修改.env配置文件
![输入图片说明](https://images.gitee.com/uploads/images/2020/0227/214351_88f473d4_145187.png "WX20200227-214337@2x.png")

- 前端项目默认使用8081端口启动，可以在vue.config.js文件中修改，运行如下命令启动项目：

```   
yarn serve
```

启动成功后，打开浏览器，输入http://localhost:8081/pagenow即可访问系统

 **注意：建议使用chrome浏览器访问系统，以获得更好的使用体验** 

### 系统截图

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/233812_8af33eee_145187.png "WX20210228-233749.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/233854_079a9e19_145187.png "WX20210228-233844.png")

### 联系方式：

官方客服QQ：354300651；

项目负责人QQ：229041307；

项目负责人微信：huangjian325（加微信请做好备注）

官方公众号：

![输入图片说明](https://images.gitee.com/uploads/images/2021/0228/233330_b5e29c74_145187.jpeg "qrcode_for_gh_e58296c923fb_258.jpg")




