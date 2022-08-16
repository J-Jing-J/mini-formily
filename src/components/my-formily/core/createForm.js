// 生成form对象，上面存了values等等数据
// 通过context传递下来，让子组件能消费
// 子组件校验时，其实就是从父组件传的form对象上取的值

// 响应式：Proxy
// Form中的values、fields，底层都是通过proxy（通过createForm/createFields创建出的对象【不是组件】）
// Field中的value是字符串，不是proxy --- 响应式在form中做
// mobx，vue也都是用proxy
// 一开始只是普通的值，要转成proxy存到Form实例上，最终显示时又通过proxy转回普通的值
import Form from "./Form";

// createForm就是new一个Form实例
const createForm = (options) => {
  return new Form(options);
};

export default createForm;