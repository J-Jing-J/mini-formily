// reaction：反应
// 数据管理在core，UI更新在reactive（依赖对冲，数据消费方）
// 其实就是将数据变成可观察的，数据变化，组件要跟着更新

// 在响应式编程当中，reaction是可订阅对象的订阅者

// 可订阅对象：用observable
// 订阅者：用reaction
// 订阅事件：用reaction

// Tracker（reaction提供的一些接口）：比如：实例化Tracker的时候可以设定某些事件发生时forceUpdate
// 过程：Observer订阅的对象Props变化 --- 通过Tracker


import observable from "./observable";
import Tracker from "./Tracker";
import action from "./action";
import autorun from "./autorun";
import batch from "./batch";
import {define} from "./model";
import {toJS} from "./externals";

export {observable, Tracker, action, autorun, batch, define, toJS};