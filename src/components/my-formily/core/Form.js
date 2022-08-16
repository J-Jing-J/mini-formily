import Field from "./Field";
import {define, observable} from "@/which";
import {batchSubmit, batchValidate} from "./internals";

export default class Form {
  constructor(props) {
    this.initialize(props); // 初始化
    this.makeObservable();  // 将fields和values变成响应式
  }

//   初始化
  initialize = (props) => {
    this.props = {...props};
    // 数据层的Form要统一管理Field --- Field挂载到Form上的Fields
    this.fields = {};  
    this.initialValues = props.initialValues;
    // 所有field的value
    this.values = {...props.initialValues};

    this.errors = [];
  };

//   定义Observable，用define变成响应式
  makeObservable = () => {
    define(this, {
    // 将fields和values变成响应式
      fields: observable.shallow,
      values: observable,
    });
  };

//   数据层的Field
//   创建Field时，component、decorator等参数要传下来，一直传到Field构造函数中
  createField = (props) => {
    const {name} = props;
    // 数据层的Form要统一管理Field --- Field挂载到Form上的Fields
    // 不能每次都new一个，而是要更新 --- 判断一下
    if (!this.fields[name]) {
      new Field(name, props, this);
    }
    return this.fields[name];
    // 在这里没有挂载到Form上，在Field class中才挂载上
  };

//   form表单挂载/卸载
  onMount = () => {};
  onUnmount = () => {};

//   提交时校验全部
  validate = () => {
    return batchValidate(this);
  };

//   提交
  submit = (onSubmit) => {
    return batchSubmit(this, onSubmit);
  };
}