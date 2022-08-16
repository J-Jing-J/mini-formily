// core是一个独立的包
// 核心意义：将领域模型从UI框架中抽离出来 --- 处理数据
// 表单的数据模型：数据管理、字段管理校验管理、联动管理
// 这里面的组件和UI无关，都是处理数据的

// 数据管理在core，UI更新在reactive
// 其实就是将数据变成可观察的，数据变化，组件要跟着更新

import createForm from "./createForm";

export {createForm};