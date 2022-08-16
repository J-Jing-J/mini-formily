import {observer} from "@/which";
import {useContext} from "react";
import {FormContext} from "./context";

// 使用方法：<FormConsumer> () => {xxx} </FormConsumer>
// 包observer --- 响应式
const FormConsumer = observer((props) => {
  const form = useContext(FormContext);
  // 给children函数 传一个 form对象，FormConsumer可以接收或不接收
  const children = props.children(form);
  return children;
});

export default FormConsumer;