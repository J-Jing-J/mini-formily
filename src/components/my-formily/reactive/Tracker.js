import {ReactionStack} from "./environment";

// observer用useObserver --- 实例化Tracker对象 --- 用track、dispose方法
// Tracker实例就是reaction
export default class Tracker {
    
    // _scheduler其实就是forceUpdate
  constructor(_scheduler) {
    this._scheduler = _scheduler;
  }

//   接收函数并执行，最终返回组件
  track = (tracker) => {
    this.results = tracker();

    // 全局存一下reaction实例
    ReactionStack.push(this);

    return this.results;
  };

//   组件卸载时执行
  dispose = () => {};
}