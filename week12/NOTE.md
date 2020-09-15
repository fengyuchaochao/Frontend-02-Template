# 组件化

## 组件的基本组成成分

组件化，可能是我们日常开发过程中最重要的思想，因为通过它，我们也可以良好的实现代码的复用，节省开发效率。

那么通过设计一个组件，需要考虑哪些因素呢？

![image](http://note.youdao.com/yws/res/8563/F96D8D5E6CF74091B837526D93B00908)

#### attribute与property的区别

* attribute：它是html标签上的特性，它的值只能是字符串
* property: 它是html标签对应的dom对象的属性，它是javascript里的对象中的某个属性.

总结起来：两者一个属于html标签的特性，一个是javascript对象的属性，本质上属于不同范畴的东西，但是两者用来实现的效果是一致的，并且是可以相互修改的，例如，想要为html标签设置一个类选择球，我们既可以直接在html标签中设置class，也可以在js中通过div.setAttribute('class','') 去设置，同时也可以div.className = ''。

**案例一**
```
<div class="cls1 cls2"></div>
<script>
var div = document.getElementsByTagName(‘div’)[0];
div.getAttribute('class') //cls1 cls2 
div.className // cls1 cls2 
```
说明：以上代码中，我们在html中设置的attribute是class，但由于class是一个关键字，所以我们通过js获取的时候只能通过className。

**案例二**
```
<div class="cls1 cls2" style="color:blue" ></div>
<script>
let div = document.getElementsByTagName('div')[0];
console.log(div.getAttribute('style')) //字符串
console.log(div.style); //对象
```
说明：在html中设置的attribute是一个字符串，但是在js中，通过gertAttribute获取时，原样输出也是一个字符串，但是获取property时，返回的是一个对象。


**案例三**
```
let input = document.getElementsByTagName('input')[0];
console.log(input.value); // ''
console.log(input.getAttribute('value')); // null
input.value = 1;
console.log(input.value); // 1
console.log(input.getAttribute('value')); //null


let input = document.getElementsByTagName('input')[0];
console.log(input.value); //''
console.log(input.getAttribute('value')); //null
input.setAttribute('value', 3);
console.log(input.value); //3
console.log(input.getAttribute('value')); //3
```
通过上面这个例子可以看到，当我们同时设置attribute与property的时候，优先显示property，如果没有设置property，则显示attribute，同时设置property对attrbute没有影响，即我们设置了input.value的值，但是input.getAttribute('value')不会变。但是反过来，设置了input.setAttribute('value'), input.property的值会发生变化。


**总结：我们直接在html中设置class,id等特性，和在js中setAttribute的方式设置，两者是完全一致的，而通过property的方式可能会有所不同，但是他们都可以实现我们想要的效果，只是写法不同。**


## 如何设计组件？

![image](http://note.youdao.com/yws/res/8572/DC2850F7A31742A78D56B19AD25CEA44)


## vue template 与 react jsx

react 认为现在浏览器追求的js css html 这三种文件分工协作的方式效率低下，他认为js css html 应该是一个整体，而不是像现在这样分的这么清楚，协作的时候造成了很多麻烦，所以他们推荐一个组件的所有代码都写在一个jsx当中，这样更有利于组件化开发。

 jsx 本身也是js的一种扩展，可以完全写js 没问题，基本上一个有状态的组件就是一个类。在一个固定的render方法里返回标签，标签和数据逻辑全都耦合在一个类里面。

而vue template依然更贴近html，js分离实现的写法，即将数据与视图进行分离，准备好数据以后，只需要通过入口设置到视图中即可渲染，如果有进一步的逻辑，则配合指令系统，例如v-for,v-if等进行逻辑控制。


显然，vue 推荐使用 template这种写法，因为相对简单，也更容易上手，能够覆盖我们大多数场景，但是如果涉及到比较多的业务逻辑的时候，更推荐使用jsx。


参考文档：https://blog.csdn.net/qq_35430000/article/details/79505716

**基本使用**
```
//定义一个组件 Comp.js
export default {
    data () {
        return {
            name: 'kobe'
        };
    },
    render () {
        console.log(this.name);
        return (
            <div>{this.name}</div>
        );
    }
};
//然后在其他文件中，依然是通过import引入，并且在components上注册。
import Comp from './Comp.js';
export default {
    components: {
        Comp
    }
}
```
注意：采用jsx去定义组件的时候，它是一个.js文件啦，而不是.vue文件，同时，我们又可以通过之前熟悉的方式进行注册和使用。


## 常见dom操作


**案例1: 拖拽事件的模版代码**
```
let dom = document.getElementById('container');

dom.addEventListener('mousedown', () => {
    let move = () => {
        /**
            鼠标移动时的逻辑，通常会借助event.clientX等位置信息进行判断。
        */
    }
    let up = () => {
        /*
            鼠标抬起之后的逻辑
        */ 
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
});

```
**案例2: 创建节点**
```
document.createElement('div'); //创建元素节点
document.createTextNode('hello') //创建文本节点
```

**案例3: 设置attributes**

```
dom.setAttribute('href', '');
dom.getAttribute('href');
```
**案例4: 设置类和样式**
```
dom.classList.add('box'); //设置类名
dom.style.color = 'red'; //设置样式
```

