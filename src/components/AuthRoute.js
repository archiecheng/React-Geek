// 封装高阶组件

// 核心逻辑: 有 token 正常跳转 无 token 取登录
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
export function AuthRoute({children}) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} />
    }
}