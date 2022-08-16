import {useEffect} from "react";
import {FormContext} from "./context";

// 意义：
// 1. 通过context跨层级传递Form对象
// 2. 渲染子组件
// 3. 挂载表单，做初始化，响应式
export default function FormProvider({form, children}) {

    // 挂载表单：
    // formily/core管理表单数据 --- 需要做初始化，响应式
    // form.onMount表单的挂载、卸载 ---在里面做了 初始化，响应式
  useEffect(() => {
    // 做初始化，响应式
    form.onMount();
    // 清理工作
    return () => {
      form.onUnmount();
    };
  }, []);

  return (
        <FormContext.Provider value={form}>
            {children}
        </FormContext.Provider>
    );
}