## css总体结构

#### @规则

* @charset
* @import
* @media
* @keyframes
* @fontface
* @page
* @support
* @namespace

其中，我们常用的主要是，@import @media @keyframe @fontface需要重点掌握，其他几个，理解其应用场景即可。

#### 普通规则

这里的普通规则，也是我们日常开发过程中接触最多的。

首先，说一下普通规则的基本格式: 

```
div {
    background-color: blue
}
```
通过代码可以清晰的看到： <b>主要包含选择器和声明两部分, 声明部分是一个key-value格式</b>

那接下来，我们就围绕这三个元素来整理学习css:
* 选择器
* key
    * Properties
    * Variables
* value

## @规则

#### @charset

主要用于设置css的编码方式，一般不需要我们手动设置。
```
@charset "utf-8";
```
#### @import

主要用于引入其他样式文件，一般一些公共样式都可以采用@import引入到其他页面中。
```
@import "mystyle.css";
@import url("mystyle.css");
```
#### @media

这就是大名鼎鼎的css媒介查询，主要用于响应式布局，可以根据设备特性（例如：视口宽度，设备方向）等设置不同的样式。
```
@media screen and (max-width: 320px) {
    body {
        background: blue;
    }
}

@media screen and (min-width: 320px) and (max-width:540px) {
    body {
        background: red;
    }    
}

@media screen and (min-width: 540px) {
    body {
        background: green;
    }
}
```
以上代码就实现了一个简单的响应式布局，当视口宽度小于320px时，背景颜色为blue，大于320px且小于540px时，背景颜色为red，大于540px时，背景颜色为green。

#### @keyframes

主要用于定义动画，然后配合animation属性使用
```
@keyframes slide {
    from {
        width: 0px
    }
    to {
        width: 100px
    }
}
```
#### @fontface
主要用于定义一种字体，icon font就是采用该特性实现的。
```
@fontface {
    font-family: aaa;
    src: url(http://example.com/fonts/Gentium.woff);
}

p {
    font-family: aaa;
}
```
上面的代码，我们引入了一个外部字体文件，并且自定义该字体类型为 aaa， 然后我们就可以在其他标签中通过font-family:aaa 使用该自定义字体了。

#### @page

主要用于对打印进行更多的设置，比如指定页面的尺寸，边距，页眉页脚，实际开发中，几乎不会使用。

#### @counter-style
主要用于自定义列表项的样式表现。
```
@counter-style triangle {
  system: cyclic;
  symbols: ‣;
  suffix: " ";
}
```
#### @support
主要是根据判断浏览器的兼容性问题，从而设置不同的样式，和@media类似，@media是根据视口宽度等设置不同的样式，@support是根据对于属性的兼容性，设置不同的样式。
```
#demo {
    float: left;
}

@support (display:flex) {
    display:flex;
}
```
上面代码的功能就是，对所有浏览器的#demo设置浮动效果，同时对支持flex布局的浏览器，设置#demo元素的display属性为flex;

#### @namespace

首先要理解命名空间到底是啥意思？这里我们简单说一下：主要目的是为了避免命名冲突，例如html中有a标签，svg中也有a标签，那我们在一个页面中使用a标签时，那它到底是属于html还是svg呢？这时我们就可以通过加前缀的方式解决，例如html:a，svg:a, 但是每次加前缀也很麻烦，然后命名空间就出现了，它可以提供默认的前缀，从而避免冲突。

```
<html xmlns="http://www.w3.org/1999/xhtml">
    <a></a>
</html>

<svg xmlns="http://www.w3.org/2000/svg">
    <a></a>
</svg>
```

具体可以参考：
* <a href="https://www.w3school.com.cn/tags/tag_prop_xmlns.asp">html 命名空间</a>
* <a href="https://www.w3school.com.cn/xml/xml_namespaces.asp">xml 命名空间</a>

## 选择器

#### 一. 分类
* 基本选择器
    * \*选择器：*
	* id选择器: #id
	* 标签选择器: div
	* 类选择器:  .box
* 伪类选择器
    * 链接类   
    	* :link
    	* :hover
    	* :active
    	* :visited
    	* :focus
    	* :checked
    	* :disabled
    	* :enabled
    * 树结构
    	* :first-child/:last-child
    	* :nth-child()/:nth-last-child()
    	* :only-child/only-of-type
    	* :nth-of-type()/:nth-last-of-type()
    	* :empty
    * 逻辑类
	    * :not()
* 伪元素选择器
    * ::after
    * ::before
    * ::first-letter
    * ::first-line
* 属性选择器
	* [attribute]
	* [attribute=value]
	* [attribute^=value]
	* [attribute$=value]
	* [attribute*=value]
	* [attribute~=value]
	* [attribute|=value]

* 层次选择器
	* 后代选择器：E F (包含子孙)
	* 子选择器：E > F (必须是直接子元素)
	* 相邻兄弟选择器：E + F
	* 通用选择器：E ～ F
	
#### 二：常见问题

接下来，我们重点说一下其中的几点：
##### 1. 标签选择器和命名空间有关
##### 2. 伪类与伪元素的区别
    
伪类是选择一个已存在的元素，通常用于ui的交互效果，例如:hover，而伪元素是选择一个不存在的元素，或者换句话说，伪元素选择器可以增加一个元素，例如：::after, ::before。

实际开发过程中，我们推荐伪类选择器用单冒号：，而伪元素选择器用双冒号::。

##### 3. 属性选择器是可以替代id选择器，class选择器

通过上面的例子，我们也可以感受到属性选择器更加强大，它拥有更多的规则去匹配属性值，同样，它也可以替换一些简单选择器，例如：

```
div.box {
    //...
}
//等价于
div[class='box'] {
    //...   
}

```
那两者的区别呢？优先级不同。

##### 4. 选择器的优先级问题

首先，我们可能大部分都知道如下优先级：

> 行内样式（1000） > id选择器（100） > class选择器（10） > 标签选择器（1）

但是按照上面的权重来分析的话，如果有11个id选择器，那么该选择器的总权重是1100， 那会覆盖掉行内样式吗？实际上并不会，

那么我们就来看看浏览器具体是如何计算选择器权重的？

优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

* 如果存在内联样式，那么 A = 1, 否则 A = 0;
* B 的值等于 ID选择器 出现的次数;
* C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
* D 的值等于 标签选择器 和 伪元素 出现的总次数 。

我们来实际看看一些例子：
```
li                                  /* (0, 0, 0, 1) */
ul li                               /* (0, 0, 0, 2) */
ul ol+li                            /* (0, 0, 0, 3) */
ul ol+li                            /* (0, 0, 0, 3) */
h1 + *[REL=up]                      /* (0, 0, 1, 1) */
ul ol li.red                        /* (0, 0, 1, 3) */
li.red.level                        /* (0, 0, 2, 1) */
a1.a2.a3.a4.a5.a6.a7.a8.a9.a10.a11  /* (0, 0, 11,0) */
#x34y                               /* (0, 1, 0, 0) */
li:first-child h2 .title            /* (0, 0, 2, 2) */
#nav .selected > a:hover            /* (0, 1, 2, 1) */
html body #nav .selected > a:hover  /* (0, 1, 2, 3) */
```
然后，比较规则是: <b>从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的</b>

参考文档：https://juejin.im/post/6844903709772611592
https://www.cnblogs.com/cnblogs-jcy/p/8574177.html

##### 5. 伪类

这里，主要注意一点：之前我们可能只把:hover，:active等链接类的伪类归为归类，其实:nth-child，:not等都是伪类。

##### 6. 伪元素机制

伪元素其实有两种机制，第一种是::after和::before,他们是添加一个不存在的元素（会直接体现在页面中），而::first-line和::first-letter是给已存在的元素包一层元素(注意只是浏览器内部包了一层，并不会体现在页面中)，本质上，他们两都会添加元素，所以都归为伪元素。

![image](http://note.youdao.com/yws/res/4397/D55700CF1161498FB56EE1BDD4CBC7A2)

##### 7. ::first-line与::first=letter的区别

主要区别体现在两者的可用属性有些区别：

![image](http://note.youdao.com/yws/res/4402/A3C752E8326F4AFE8746DE3CFC652ABE)

这就解释了，为什么float等属性用在::first-line时没有效果。

还有一点要注意：

::first-letter 伪元素 只在display属性值为block, inline-block, table-cell, list-item 或者 table-caption的元素上才起作用. 其他情况下, ::first-letter 毫无意义.

```
<span>123123</span>
<p>12312</p>

span::first-letter {
    color: red
}
p::first-letter {
    color: red
}

//结果是：只有p标签首字母会变成红色，span标签不会。
```


## CSS属性与属性值

#### 一：css变量

这里首先要知道一点：css3引入了 Variables，属性和属性值都可以设置为变量。

<b>变量定义以--开头，通过var()函数引用</b>
```
:root {
    --main-color: #aaa
    --custom-key: color
}

h1 {
    color: var(--main-color) //Value为变量
    var(--custom-key): #aaa //Key为变量
}
```

#### 二：css属性值类型

* CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
* 字符串：比如 content 属性。
* URL：使用 url() 函数的 URL 值。
* 整数 / 实数：比如 flex 属性。
* 维度：单位的整数 / 实数，比如 width 属性。
* 百分比：大部分维度都支持。
* 颜色：比如 background-color 属性。
* 图片：比如 background-image 属性。
* 2D 位置：比如 background-position 属性。
* 函数：来自函数的值，比如 transform 属性

接下来，我们再看看css常见的一些计算型函数：
* calc()
* max()
* min()
* clamp()
* toggle() //兼容性非常差，chrome都没支持
* attr() //试验性功能，可以在css中获取属性值

1. 首先是 toggle(),典型应用场景就是：让一个列表的圆点或者方格图标交替出现。

```
ul { list-style-type: toggle(circle, square); }
```

2. attr()
```
<p data-foo="hello">world</p>

div::before {
  content: attr(data-foo) " "; //在css中可以获取data-info属性的值。
}
```
