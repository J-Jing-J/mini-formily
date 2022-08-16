// 管理数据的field，和 antd Form 组件的Field不同，它不是组件，是数据管理层的field
// 处理表单每个字段的数据


import {define, observable} from "@/which";
import {createReactions, validateSelf} from "./internals";

// 数据层的Field （组件层的Field在@formily/react那个包里）
export default class Field {
    // form是数据层的form，等于把form class本身传下来了 --- 用来给form class挂载东西，比如添加fields
  constructor(name, props, form) {
    // 把传进来的参数挂载上去
    this.name = name;
    this.props = {...props};
    this.form = form;
    this.component = props.component;
    this.decorator = props.decorator;

    // 用传下来的form class来给form class挂载东西，比如添加fields
    this.form.fields[name] = this;

    this.selfErrors = [];

    // Field的value，可以从Form上获取，因为数据都是放在form层统一管理了
    this.value = this.form.values[name];

    //   required参数先传给Field组件 --- Field组件拿到props传给createField --- 最终被数据层的Field拿到
    this.query = {required: props.required};

    // 使数据可观察
    this.makeObservable();

    // 输入框即时校验，不用等提交才校验
    this.makeReactive();
  }

//   响应式
  makeObservable = () => {
    define(this, {
      value: observable,
      selfErrors: observable,
    });
  };

//   输入框即时校验，不用等提交才校验
  makeReactive = () => {
    createReactions(this);
  };

//   就是赋给Field组件的onChange事件
  onInput = (e) => {
    const newValue = e.target.value;

    // 更新Field和Form的value
    this.value = newValue;
    this.form.values[this.props.name] = newValue;

    // 单个数据的校验放在Field层，传进当前实例（this）
    validateSelf(this);
  };
}