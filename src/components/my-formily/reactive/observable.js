// observable: 订阅对象，创建可观察对象
// mobx同理

// 原理HOC
// 1. 用observable包裹一个对象{count: xxx, ...}，  --- 变成可观察对象，如get时记录对应的reaction
// 2. observer包裹组件，observer中useObserver包裹组件，返回新组件，组件中包含变量（HOC） ---  
        // --- 收集reaction：useObserver中定义tracker，背后就是定义了reaction，reaction去forceUpdate
// 3. 变量变化就执行对应的reaction更新

import {
    bindTargetKeyCurrentReaction,
    runReactionsFromTargetKey,
  } from "./reaction";
  
  const baseHandlers = {

    get(target, key) {
      const result = target[key];
  
      // 收集依赖/收集可观察对象相关的reaction
    //   当前这个可观察对象只关心跟自己有关的依赖--- 这也是为什vue响应式变化颗粒度很小
    // 确定依赖性：reaction和targetKey建立关系
      bindTargetKeyCurrentReaction({target, key});
  
      return result;
    },

    // 加上：值发生变化时要做的事情 --- forceUpdate
    set(target, key, value) {
      target[key] = value;
  
      // 执行reactions
      runReactionsFromTargetKey({target, key, value});
  
      return true;
    },
  };
  

//   接收数据对象 如：{count: xxx, ...}
  export default function observable(target) {
    // 拿到值之后拦截一下 --- 数据劫持
    // Proxy IE 不支持
    const proxy = new Proxy(target, baseHandlers);
  
    return proxy;
  }