# HTTP 


## ISO-OSI 七层网络模型
![image](http://note.youdao.com/yws/res/3234/5609003C81484B589ED85341A1BB8A14)

> 如何更深刻生动的理解7层网络模型，可以参考：https://www.zhihu.com/question/24002080/answer/410983148

## Request Headers

![image](http://note.youdao.com/yws/res/3304/46318C7177C34C12B1D248BAC646C80F)

重点说一下其中几个字段：

1. User-Agent： 主要是获取浏览器的标识，一般通过该字段可以获取到浏览器的类型，以及是网页端，还是移动端等信息
2. Cookie：主要是浏览器端是通过请求头的cookie向服务器端发送cookie，服务器端是通过响应头的set-cookie，通知客户端要保存哪些cooke.

#### Response Headers
![image](http://note.youdao.com/yws/res/3303/047A35BDD02B4CC8B466088B23B9F9DD)


## Request Body

该属性放在请求头中，表示要传给服务器端的数据的格式，放在响应头中表示返回给客户端的数据的格式。

常见主要有三种：
1. 以text开头
```
text/html: html格式
text/plain: 纯文本格式
text/xml：xml格式
```
2. 以image开头
```
image/gif: gif图片
image/png: png图片
image/jpeg: jpg图片
```
3. 以application开头
```
application/json: json数据格式
application/pdf: pdf格式
application/msword: word文档格式
application/octet-stream: 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded: 浏览器表单提交的默认方式，
```
4. 文件上传
```
multipart/form-data 

// 即我们上传文件时，必须要将请求头中的Content-Type置为multipart/form-data
```

## 缓存总结

我们所开发的页面，时常会因为一些缓存问题出现意想不到的效果，那么，到底什么时候会设置缓存，什么时候读取缓存，以及哪些是浏览器端缓存，哪些是服务器端缓存等等一系列问题，今天我们就来整体掌握我们所设计到的各种缓存问题。

* 数据库缓存
* 服务器端缓存
    * 代理服务器缓存
    * CDN缓存
* 浏览器端缓存
    * http缓存
    * indexDB
    * cookie
    * localStorate/sessionStorage

这里我们重点说一下Http缓存：

#### 缓存分类

![image](http://note.youdao.com/yws/res/3357/5C20A8DFF5634F37A0BD79D384B6FCCB)

1. 强缓存：响应头中设置expires/Cache-Control来设置规则

即浏览器第一次发送请求某接口的数据的时候，响应头中返回返回exprires/Cache-Control字段，来表明下次访问该接口时，是否直接读取浏览器缓存，还是要重新请求接口数据。

expires是http/1.0的标准，表示设置一个过期时间，
Cache-Control是http/1.1的标准，表示设置一个时间间隔，即从第一访问之后，在指定时间间隔内再次访问，则直接读取浏览器缓存。两者同时存在时，Cache-Control的优先级更高。

Cache-Control的常见值：
* max-age=31536000，单位是s
* no-store： 禁止缓存，每次请求都要想服务器请求重新获取数据
* no-cache: 浏览器需要想服务器发送请求以校验资源是否新鲜，来决定是从浏览器缓存中读取，还是重新请求数据。

除此之外，还有 s-maxage,public，private等值，主要用于设置缓存是否被共享。

2. 协商缓存：

即浏览器第一次请求数据之后，会将数据和响应头中缓存标识（Etag和Last-Modified）存储起来，再次请求时会将这两个字段值分别放到If-None-Match和If-Modified-Since，

然后服务器端接受到这两个请求头字段的值之后，会优先利用If-None-Match的值（即Etag值）来判断数据是否发生变化，如果一致，说明数据没有发生变化，返回304，如果有改动，则返回新数据以及新数据对应的Etag值，

如果服务器收到的请求头中没有Etag值，则判断If-Modified-Since的值（即Last-Modified值）和被请求数据的最后修改时间做对比，如果一致，说明数据没被修改过，返回304，否则则返回新数据，并且把最新修改时间赋值给响应头中中的Last-Modified，返回给浏览器端。


我们来实际在浏览器端看一个例子：请求一张图片

第一次请求：
![image](http://note.youdao.com/yws/res/3403/67222182007D4C7195E62266D0E17A72)

发现第一次请求，请求头中是没有If-None-Match和If-Modified-Since字段的，响应头中返回了expires/cache-control/etag/last-modified等信息

然后我们再请求一次：

![image](http://note.youdao.com/yws/res/3401/8576ABBFEE2B41B9B03EA47C1E11925A)

此时我们发现，当我们再次请求时，请求头中就包含了If-None-Match和If-Modified-Since字段，且他们的值是上一次请求响应头中返回的ETag和Last-Modified的值。

参考文档：
1. https://zhuanlan.zhihu.com/p/29750583
2. https://zhuanlan.zhihu.com/p/25953524


## 状态码

* 1xx: 临时回应，表示客户端继续
* 2xx
    * 200 成功
* 3xx
    * 301/302 永久重定向/临时重定向：典型的场景就是，例如我们的旧的公共登陆服务到期啦，架构组提供了一个新的登陆服务，这时，我们旧的登陆服务我们不能直接下掉，如果我们还访问旧的登陆服务时，这时就需要后端做一下重定向到新的登陆服务。
    * 304：例如一张图片，我们第一次请求成功后，状态码为200，之后请求，由于图片再也没有更改过，这时返回304，表示Not Modified.
* 4xx
    * 400：请求无效，即请求还没有走到后台服务，一般可能是参数错误导致的。
    * 404：即路径找不到
    * 405: 请求方式错误，例如服务器端要求是get请求，却用了post
* 5xx
    * 500: 服务器端错误，一般是后端代码报错
    * 502：一般是后端服务挂了
    * 503：服务器端端不能处理http请求，一般是服务器进行维护导致的
    

