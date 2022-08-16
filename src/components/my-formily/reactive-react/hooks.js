import { useEffect, useRef } from "react"
import { Tracker } from "../reactive"

// 让组件更新的操作需要复用 --- 用tracker订阅forceUpdate
// 其实就是加了tracker：有属性发生变化时，就forceUpdate组件
export function useObserver(view) {

    // 可观察对象发生变化 --- 更新组件
    const [, forceUpdate] = useReducer(x => x + 1, 1)

    // Tracker构造函数接收函数 --- 告诉tracker：可观察对象的属性值发生变化时需要做什么 --- 我们需要forceUpdate
    // new操作不能写在函数体里：因为会随着函数组件的更新而多次执行 --- 将实例存起来 --- useRef
    const trackerRef = useRef(null)
    // 只初始化一次，ref在组件的整个生命周期内都有效
    if(!trackerRef.current) {
        trackerRef.current  = new Tracker(() => {
            forceUpdate()
        })
    }
    useEffect(() => {
        // 组件卸载时 清理ref
        return () => {
            if(trackerRef.current) {
                // dispose 是 tracker 里面实现的函数
                trackerRef.current.dispose()
                // 卸载时设为null --- 下次进不去if结构，就不能在已经卸载的组件上执行forceUpdate了
                trackerRef.current = null
            }
        }
    })

    // 返回组件
    // track 是 tracker 提供的函数
    return trackerRef.current.track(view)
}