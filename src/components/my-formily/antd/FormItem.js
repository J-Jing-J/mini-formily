import {observer, FieldContext} from "@/which";
import {useContext} from "react";

// FormItem 是对 Field 的封装
// formily的响应式用的是 Mobx --- 包一层formily提供的 observer
const FormItem = observer(({children}) => {

//   因为是antd的FormItem组件，要与formily交互，所以不能自己定义context，要使用formily传进来的FieldContext
  const field = useContext(FieldContext);

  return (
    <div>
      <div>{field.title}</div>
      {children}
      {/* 校验没有通过的数组：通过红色字体显示 */}
      <div className="red">{field.selfErrors.join(",")}</div>
    </div>
  );
});

export default FormItem;