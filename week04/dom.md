# DOM

在浏览器端，dom操作最常用的两个对象就是Element和Document, 前者表示一个节点对象，后者表示一个文档对象，用于创建节点，查找节点等功能


## Element

![image](http://note.youdao.com/yws/res/3422/4509FF7887FF49BCAF930CD68CEB585F)


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


## Range

Range API 是一个比较专业的领域，如果不做富文本编辑类的业务，不需要太深入。这里我们就仅介绍概念和给出基本用法的示例，你只要掌握即可。


## dom事件

