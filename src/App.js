import ReactivePage from "./pages/ReactivePage";

// 组件什么情况下会更新：forceUpdate/setState/Context变化/父组件的props改变
export default function App() {
  return (
    <div>
      <ReactivePage />
    </div>
  );
}