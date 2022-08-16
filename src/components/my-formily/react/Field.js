import React, {useContext} from "react";
import {observer, FieldContext} from "@/which";
import {FormContext} from "./context";

// 组件层的Field
// Field组件：上面有value， --- 每一项的值，在form表单上和Field上都存了

// observer 用mobx实现，实现响应式--每次自动渲染
const Field = observer((props) => {
    // 拿到表单
  const form = useContext(FormContext);
    //   调用form上的createField 传 props 拿到这个表单项的 field对象
  const field = form.createField(props);

//   真正要渲染的是 传给Field组件的component属性
//   component属性接受 [0]为元素 [1]为属性
//   生成ReactElement元素，并传递一些props
  const component = React.createElement(field.component[0], {
    ...field.component[1], //component的props
    value: field.value || "",
    onChange: field.onInput,
  });

//   Field组件的decorator属性
// 用法：若传了decorator，component作为decorator元素的children
  const decorator = React.createElement(
    field.decorator[0], // 元素
    field.decorator[1], // 元素属性
    component // children
  );

  return (
    // 这里通过 Provider 传下去，所以 antD的FormItem 才能拿到 Field表单项的数据，渲染标题等信息
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  );
});

export default Field;