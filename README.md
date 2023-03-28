# 个人简历小程序

### 介绍

使用uni-app + uniCloud开发的个人简历小程序，目前只支持微信小程序，其他端如果需要再做兼容。

### 功能

1. 添加简历
2. 编辑简历
3. 删除简历
4. 预览简历
5. 分享简历
6. 简历模板
7. 切换模板

目前简历内容分为几块：基本信息、教育经历、工作经历、项目经历、专业技能、自我评价

简历模板 目前比较少，将会陆续开发。支持切换模板，展示不一样的简历~

### 使用说明

1. 关联云服务空间：阿里云，没有则创建再关联（也可以右键uniCloud选择“云服务空间初始化向导”，会自动执行下面2、3的步骤）
2. 右键\uniCloud-aliyun\cloudfunctions目录，选择“上传所有云函数、公共模块及actions”
3. 右键\uniCloud-aliyun\cloudfunctions\database目录下的db_init.json，选择”初始化云数据库“
4. 修改\uniCloud-aliyun\cloudfunctions\common\uni-id\config.json`文件中的『微信小程序appId』和『微信小程序appSecret』（uni-id登录需要用到）

### 上线准备

小程序后台配置合法域名

公测版域名：https://api.bspapp.com 
非公测版域名：https://api.next.bspapp.com

具体配置哪些，可以运行到微信小程序后，详情 - 本地设置 - 取消勾选『不校验合法域名、web-view（业务域名）、TLS版本以及HTTPS证书』
然后每个页面测试一遍，根据控制台提示加域名。

### 联系我

QQ: 964279742

Email: hhb219@163.com