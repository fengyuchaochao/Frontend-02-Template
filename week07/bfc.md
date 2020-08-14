##  BFC是什么？

在介绍BFC之前，我们要先理清楚如下概念的关系：

* Box 盒
* Formatting Context 格式化上下文
* Display属性

Box是css布局的基本单位，也就是说页面是由一个个Box组成的。而display属性决定了Box的类型，不同类型的Box是采用不同的Formatting Context去渲染页面，可以把Formatting Context理解为一个看不见的容器，它规定了内部的子元素如何去渲染。

理解清楚了这三者的关系，我们再来具体看看这个概念：
1. Box类型

* block-level box: display 属性为 block, list-item, table 的元素，会生成 block-level box。并且采用 block fomatting context；
* inline-level box： display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且采用 inline formatting context；
* run-in box： css3新增
2. Formatting Context
 Formatting context 是 W3C CSS2.1 规范中的一个概念。它的作用就是固定页面的某块区域（或者容器）采用什么样的规则去渲染，它决定了它的子元素如何去定位，以及与其他元素是如何相互作用和影响的。
* BFC: Block Formatting Context 块级格式化上下文
* IFC: Inline Formatting Context  行内级格式化上下文
* FFC: Flex Formatting Context 自适应格式化上下文
* GFC：Grid Formatting Context 网格布局格式化上下文

今天，我们看一下BFC的布局规则：

* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算


## BFC布局规则实际场景

我们首先来看一下，默认情况下，哪些情况会生成BFC, 或者哪些元素本身就是采用BFC布局的。

* 根元素
*


接下来，我们来针对上面这些规则，来实际通过代码体验一下：

##### 1. 内部的Box会在垂直方向，一个接一个地放置。

参考文档：https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html
