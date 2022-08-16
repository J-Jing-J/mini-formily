// 如tracker概念
// observable观察的对象的属性值一旦发生变化 --- 执行对应的reaction

import {ReactionStack, RawReactionsMap} from "./environment";
import {ArraySet} from "./array";

// 传入当前reaction和key，建立关系，存到map中
function addRawReactionsMap(target, key, reaction) {
  let reactionsMap = RawReactionsMap.get(key);

   // 可能一个对象上有多个reaction，好几个组件都用到了 --- 存储：ArraySet
  if (reactionsMap) {
//   不是第一次进来
// 获取外层map：可观察对象对应的map
// 先对象，后对象的key
    const reactions = reactionsMap.get(key);

    if (reactions) {
        // 已经有了arraySet
      reactions.add(reaction);
    } else {
        // 刚初始化没有还reaction
      reactions.set(key, new ArraySet([reaction]));
    }
  } else {
    // 是第一次进来：初始化
    // 可能一个对象上有多个reaction，好几个组件都用到了 --- 存储：ArraySet
    reactionsMap = new Map([[key, new ArraySet([reaction])]]);
    RawReactionsMap.set(target, reactionsMap);
  }

  return reactionsMap;
}

// 拦截get时，收集依赖/收集可观察对象相关的reaction
// 确定依赖性：reaction和targetKey建立关系
export function bindTargetKeyCurrentReaction({target, key}) {
    // 找到当前的reaction --- tracker实例
    // reaction可能有好几个 --- 把这些reaction管理一下 ---很多地方都要用 --- 全局存一下
    //  --- 在environment建立一个栈结构，在Tracker class中存reaction势力（即tracker实例）

    // 从全局栈里取 --- 取当前的（栈顶元素）
  const current = ReactionStack[ReactionStack.length - 1];

//   取到了当前reaction，放到map中
  if (current) {
    addRawReactionsMap(target, key, current);
  }
}

// 执行reactions，（跟当前可观察对象相关的依赖项）
export function runReactionsFromTargetKey({target, key, value}) {
  const reactions = [];

//   找到这些要执行的reaction
// 先拿到最外层的reactionMap（代表这是一个可观察对象），target代表对象，对象里面又有一个一个key值
  const reactionMap = RawReactionsMap.get(target);

  if (reactionMap) {
//  如果这是一个可观察对象
// 去取target对象里面每个key值的reaction
    const map = reactionMap.get(key);

    // 遍历取到本次应该更新的reaction
    map.forEach((reaction) => {
      reactions.push(reaction);
    });
  }

//   一个一个执行reaction
  for (let i = 0, len = reactions.length; i < len; i++) {
    const reaction = reactions[i];
    // _scheduler是构造时传的forceUpdate，挂载到Tracker实例上
    if (typeof reaction._scheduler === "function") {
      reaction._scheduler();
    }
  }
}