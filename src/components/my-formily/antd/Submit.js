import {useParentForm} from "@/which";

const Submit = ({
  children,
  onSubmit,
  onSubmitSuccess,
  onSubmitFailed,
  onClick, // 防止重复提交，返回false不提交
}) => {
    // 获取form表单 
    // 用formily下提供的自定义hook，用于仅找到父Form表单，因为要提交这个
  const form = useParentForm();

  return (
    <button
        // 防止重复提交，返回false不提交
      onClick={(e) => {
        if (onClick) {
          if (onClick(e) === false) {
            return;
          }
        }
        // 提交
        if (onSubmit) {
          form
            .submit(onSubmit)
            .then(onSubmitSuccess)
            .catch(onSubmitFailed);
        }
      }}>
      {children}
    </button>
  );
};

export default Submit;