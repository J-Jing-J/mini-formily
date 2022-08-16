import {autorun, batch, toJS} from "@/which";

// 单个Field的校验，校验自己
export const validateSelf = (field) => {
  let value = field.value;
  if (typeof value == "string") {
    value = value.trim();
  }

  const query = field.query;
//   校验require
//   required参数先传给Field组件 --- Field组件拿到props传给createField --- 最终被数据层的Field拿到
  if (query.required && (value == "" || value == undefined)) {
    field.selfErrors = ["请输入必填项"];
  }
};

// 输入框即时校验，不用等提交才校验
export const createReactions = (field) => {
  const reactions = field.props.reactions;
  if (typeof reactions === "function") {
    // 用autorun（reactive提供的API）自动触发校验
    autorun(
        // batch：批量执行
      batch.scope.bound(() => {
        reactions(field);
      })
    );
  }
};

// 提交时校验所有，target是form实例
export const batchValidate = async (target) => {
  target.errors = [];
  let i = 0;
//   按name取值，循环每个调用Field的单个校验方法
  for (const key in target.fields) {
    const field = target.fields[key];

    validateSelf(field);

    if (field.selfErrors[0]) {
    // 如果有校验不通过的项，存到form的errors上
      target.errors.push({key, msg: field.selfErrors[0]});
    }
  }

  if (target.errors.length > 0) {
    throw target.errors;
  }
};

// 接受一个onSubmit事件
export const batchSubmit = async (target, onSubmit) => {
    // 校验可能会有异步，写成async
  await batchValidate(target);
//   提交是要把observable的proxy 改成 普通数据
// toJS --- reactive的API，从Proxy转成普通数据
  const res = onSubmit(toJS(target.values));
  return res;
};