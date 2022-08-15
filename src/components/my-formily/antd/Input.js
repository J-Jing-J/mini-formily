const Input = (props) => {
    // 可以用普通input，也可以用antd的input组件
    return (
      <input
        {...props}
        value={props.value || ""}
        style={{...props.style, border: "solid 1px green"}}
      />
    );
  };
  
  export default Input;