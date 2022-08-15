import {observer, FieldContext} from "@/which";
import {useContext} from "react";

// 是对 Field 的封装
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