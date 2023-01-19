# Chinaz SEO 简易爬虫（基于 Cloudflare Worker）

## 使用方法：

请求

```
https://whois-api.dustella.workers.dev/q?domain=qq.com
```

qq.com 换成要查询的域名

返回数据格式

```js
{
"icp": {
"register": "MarkMonitor Inc",
"mail": "",
"expires": "27年8月15天（过期时间为2030年07月27日)"
},
"whois": {
"code": "粤B2-20090059",
"name": "",
"company": "深圳市腾讯计算机系统有限公司",
"type": "企业",
"time": "2023-01-04"
},
"dns": {
"ip": "183.3.226.35[中国广东深圳 电信]"
}
}
```
