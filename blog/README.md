# 猿人云

## 项目安装
```
npm install
```

### 开发模式的编译以及热重装
```
npm run serve
```

### 生产模式的编译以及代码压缩
```
npm run build
```

### 项目地址

- 官网地址: [https://www.apeyun.com](https://www.apeyun.com)
- 测试地址：[http://127.0.0.1:8080](http://127.0.0.1:8080)

> 注：项目启动默认的端口号为 8080，若 8080 端口被占用则默认在 8081 端口启动，具体请查看命令提示符窗口  
> 此项目启动前需先启动 ***apeyun-koa*** 项目以获取 ***token***

## 业务说明

### 套餐类型 ( goods_type )  

| goods_type | type |
| ----- | ----- |
| 1 | 用户充值 |
| 2 | 代理充值 |
| 3 | 升级白名单 |
| 4 | 隧道限量 |
| 5 | 隧道不限量 |
| 6 | 隧道高质自定义 |
| 7 | 转发锁定 IP |
| 8 | 转发随机 IP |
| 9 | 隧道指定地区 |
| 10 | 隧道不限量高质混播 |
| 11 | 隧道高质自定义套餐包 |
| 12 | 直连自定义 ( 与 goods_type == 6 类似 ) |

### 套餐升级  

#### 单词释义  

| 单词 | 释义 |
| ----- | ----- |
| ip_num_day | 每日使用上限 |
| per_extract_max | 最大提取量 |
| concurrency | 每秒请求数量 |
| ip_number | IP 数量 |
| extract_number | 提取数量 |
| request_number | 请求数量 |

#### 升级参数 ( 有多项要升级的参数,要升级某项就传某项 )  

| 套餐类型 | 升级参数 | 升级量 | 升级传参 |
| ----- | ----- | ----- | ----- |
| goods_type == 4 | ip_num_day | 1000 | ip_number |
| goods_type == 5 | per_extract_max | 5 | extract_number |
| goods_type == 6 | per_extract_max | 100 | extract_number |
| | ip_num_day | 1000 | ip_number |
| goods_type == 7 / 8 | concurrency | 5 | request_number |
| goods_type == 9 | ip_num_day | 100 | ip_number |
| goods_type == 10 | ip_per_extract_maxnum_day | 5 | extract_number |
| goods_type == 12 | ip_per_extract_maxnum_day | 5 | extract_number |
| | ip_num_day | 1000 | ip_number |

#### 套餐续费

- 续费算时间折扣
- 直连池续费从 ***月*** 开始
- 直连池续费没有折扣