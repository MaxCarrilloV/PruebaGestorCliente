import { createContext,useReducer,useContext } from 'react'
const notificationReducer = (state, action) => {
    switch(action.type){
        case 'setNotification':
            return action.payload
        case 'hideNotification':
            return ''
        default:
            return state
    }
}
const notificationContext = createContext()
export const NotificationContextProvider = (props) => {
    const [notification,notificationDispatch] = useReducer(notificationReducer,'')
    return (
        <notificationContext.Provider value={[notification,notificationDispatch]}>
            {props.children}
        </notificationContext.Provider>
    )
}
export const useNotificationValue = () => {
    const notificatioAndDispatch = useContext(notificationContext)
    return notificatioAndDispatch[0]
}
export const useNotificatioDispatch = () => {
    const notificatioAndDispatch = useContext(notificationContext)
    return notificatioAndDispatch[1]
}
export default notificationContext