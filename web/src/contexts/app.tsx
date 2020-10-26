import React, {
    createContext,
    useState,
} from "react"
import Toasts from "../components/Toast";
import useToast, {Toast} from "./hooks/useToast";
import Errors from "../util/errors";
import useAuth, {Auth, LoginForm} from "./hooks/useAuth";


interface AppContextProps {
    loading: boolean
    auth: Auth|null
    toast: (toast: Toast) => void
    removeToast: (index: number) => void
    toasts: Array<Toast>
    handleLogin: (form: LoginForm) => Promise<boolean|Errors>
    handleLogout: () => void
    errors: Errors
}

const AppContext = createContext({} as AppContextProps);

const AppProvider: React.FC = ({children}) => {
    const {toasts, toast, removeToast} = useToast()
    const {auth, handleLogout, handleLogin} = useAuth()
    const [loading, setLoading] = useState(false)
    const errors = new Errors([])

    return (
        <AppContext.Provider value={{toast, toasts, removeToast, auth, handleLogin, handleLogout, loading, errors}}>
            <Toasts/>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider}
