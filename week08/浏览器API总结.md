# DOM API

在浏览器 API中，其实主要就是dom api ，也就是围绕操作dom，或者dom树所提供的一系列api，他们的基类就是Node，最常用的两个对象就是Element和Document。

![image](http://note.youdao.com/yws/res/3422/4509FF7887FF49BCAF930CD68CEB585F)

## Element

我们来通过代码实际看一下：
```
let a = document.createElement('a');
console.log(a) 
console.log(a.__proto__) //HTMLAnchorElement
console.log(a.__proto__.__proto__) //HTMLElement
console.log(a.__proto__.__proto__.__proto__) //Element
console.log(a.__proto__.__proto__.__proto__.__proto__) //Node
```
在控制台输出结果为：
![image](http://note.youdao.com/yws/res/3425/F856C6A1C0F6402B951E1E41A19016D7)

再来看一个例子：

```
let a = document.createComment('// 注释');
console.log(a)
console.log(a.__proto__)
console.log(a.__proto__.__proto__)
console.log(a.__proto__.__proto__.__proto__)
console.log(a.__proto__.__proto__.__proto__.__proto__)
```

在控制台输出结果为：
![image](http://note.youdao.com/yws/res/3439/BADED822F092444FAEF20F88077D4E81)

通过上面的例子，我们可以清晰的感受到，dom中，不管是节点，还是文档，或者文本，其实都有对应的对象，同时，他们的原型链上都有个根节点Node对象,

接下来，我们就来看看Node对象

![image](http://note.youdao.com/yws/res/3441/465C28B987304D82968F88608A6C19E2)

我们打印出来以后，可以看到一些常用的属性和方法:

常见属性：
* parentNode：获取父节点
* childNodes：获取子节点
* firstChild：获取第一个子节点
* lastChild：获取最后一个子节点
* nextSibling：获取下一个兄弟节点
* previousSibling：获取上一个兄弟节点

常见方法：
* appendChild
* insertBefore
* removeChild
* replaceChild

还有一些高级api:
* compareDocumentPosition 是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
* cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝。

## Element与Attribute

常用方法：
* getAttribute
* setAttribute
* removeAttribute
* hasAttribute

我们来实际运行代码看看：
```
let dom = document.querySelector('#aaa');
dom.setAttribute('href', '/aaa');
console.log(dom); //<a href='/aaa' id='aaa'></a>
console.log(dom.getAttribute('href')); // /aaa
dom.removeAttribute('href');
console.log(dom); //<a id="aaa"></a>
console.log(dom.hasAttribute('href')) //false
```

## Document

在js中，dom标准规定必须通过create方法创建对象，而不能使用new运算.

* createElement: 创建html节点
* createTextNode：创建文本节点
* createCDATASection
* createComment: 创建注释节点
* createProcessingInstruction
* createDocumentFragment
* createDocumentType

除此之外，Document还提供了查找元素的能力

* querySelector
* querySelectorAll
* getElementById
* getElementsByName
* getElementsByTagName
* getElementsByClassName


## Dom事件
简单来说，捕获就是从外到里依次触发，而冒泡就是从内到外，依次触发。
```
//html
<div id="parent">
    <div id="child"></div>
</div>

//javascript
let parent = document.getElementById('parent');
let child = document.getElementById('child');
parent.addEventListener('click', function () {
    console.log('parent')
}, true);
child.addEventListener('click', function () {
    console.log('child2')
})
child.addEventListener('click', function () {
    console.log('child')
}, true)

```
点击child元素，输出结果依次是：parent，child2，child。


## Range

Range API 是一个比较专业的领域，如果不做富文本编辑类的业务，不需要太深入。这里我们就仅介绍概念和给出基本用法的示例，你只要掌握即可。


# CSSOM

我们上面讲到的dom相关对象，其实是对html的一个抽象，使js能够操作html，同理，对css文档的一个抽象就是CSSOM，js可以通过CSSOM实现对css样式的操作。

```
//html
<div id="parent">
    <div id="child">
    </div>
</div>

//css
<style>
    #parent {
        width: 400px;
        height: 300px;
        border: 1px solid red;
    }
    #child {
        width: 200px;
        height: 200px;
        background: green;
    }
</style>
```

此时效果如下：

![image](http://note.youdao.com/yws/res/6091/4D235D1FEB49473D8D4C5988910B5025)


然后，我们通过js获取css样式相关对象：
1. document.styleSheets
![image](http://note.youdao.com/yws/res/6099/E01E9639AACC455BBFB1B3C856037EB5)

我们可以看到，一个style标签对应一个CSSStyleSheet，一个style标签中有很多样式规则，那对应着，CSSStyleSheet中也会多个cssRules，cssRules不仅包含普通规则对应的CSSStyleRule， 还包含@规则对应的CSSImportRule等，

同时，我们也可以采用insertRule在js中插入指定样式，例如；
```
document.styleSheets[0].insertRule('#parent {background: red}', 0)
```
此时，效果如下:

![image](http://note.youdao.com/yws/res/6110/643DF78FE2734BF4A78C50F960C7E2C6)

当然对应的，我们也可以通过removeRule移除指定样式对象，
```
document.styleSheets[0].removeRule(0)
```
至此，我们就知道了如何在js中修改cssom对象来改变页面样式啦，

还有一个重要的api： 

getComputedStyle： 获取最终页面渲染的样式对象

```
getComputedStyle(document.getElementById('child'))
```
结果如下：

![image](http://note.youdao.com/yws/res/6121/37BA20892BBC4E92B4DA57FC73CDB15D)

除此之外，我们也可以获取页面渲染之后，元素所在盒子的位置信息

* getClientRects
* getBoundingClientRect

```
let dom = document.getElementById('child');
console.log(dom.getClientRects()); //结果会有多个盒子
console.log(dom.getBoundingClientRect()); //只有一个盒子
```

![image](http://note.youdao.com/yws/res/6127/0E7E65E48C7F4A7296FC18A7A5567BCD)
![image](http://note.youdao.com/yws/res/6132/F7FA39209A2D4CF6A14C5EF537452840)

这两个API，在实现拖拽效果时，会非常有用。


# API分类

W3C 标准下的 API：
* Web Audio API
* Web Cryptography API
* Media Source Extensions
* The Screen Orientation API
* Network Information API
* Web MIDI (Musical Instrument Digital Interface ) API
* IndexedDB API
* Gamepad API
* DeviceOrientation Event
* Web App Manifest
* WebVTT: The Web Video Text Tracks Format
* Touch Events
* Scalable Vector Graphics (SVG)
* Resize Observer API
* Intersection Observer
* Mutation Observer
* Cooperative Scheduling of Background Tasks
* Service Worker API
* Payment Request API
* Presentation API
* Web Authentication API

WICG 标准下的 API：
* Input Device Capabilitie
* Web Bluetooth API
* WebUSB API

ECMA 标准下的 API：
* JavaScript 全局变量
* ECMAScript 2018 Internationalization API

WHATWG 标准下的 API：
* Streams
* Encoding
* URL

Khronos 标准下的 API：
* WebGL

未标准化的 API：
* Web Background Synchronization
* WebRTC API
* Document Object Model XPath
* Visual Viewport API
* Performance Timeline API

参考文档：https://overapi.com/html-dom

