// 核心：
// 翻译：可观察的
// 观察：谁观察？谁响应？ --- 用observable标记 -- 如何标记？ -- 变成可观察的

// 可订阅对象：用observable
// 订阅者：用reaction

// observable可以直接当做函数使用，但是它同时也是对象，上面还有其他的函数

// observer作为桥接库里面的方法，包括了observable和reaction
import {memo} from "react";
import {useObserver} from "./hooks";

// HOC，接收并返回组件
export default function observer(component) {
    
    // 用 useObserver 包裹一下，使component变成响应式
    // 返回包装的组件WrappedComponent，记得把WrappedComponent的props传给component
  const WrappedComponent = (props) => {
    return useObserver(() => component({...props}));
  };

//   优化：memo：若组件连props都没变化 --- 不需要更新 --- 手动校验props或memo
  const memoComponent = memo(WrappedComponent);

  return memoComponent;
}