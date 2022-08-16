import {useContext} from "react";
import {FormContext} from "./context";

// 返回父Form对象
// FormContext的value 是从FormProvider 传下来的 Form对象
export function useParentForm() {
  const form = useContext(FormContext);
  return form;
}