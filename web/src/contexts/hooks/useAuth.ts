import {useEffect, useState} from "react";
import api from "../../services/api";
import {UserView} from "../../../../backend/src/models/User";

export interface Auth {
    user: UserView
    token: string
}

export interface LoginForm {
    email: string
    password: string
    remember: boolean
}

export default function useAuth() {
    const [auth, setAuth] = useState<Auth|null>(null)

    async function getSessionAuth() {
        let user = sessionStorage.getItem('@Happy.user') || null
        let token = sessionStorage.getItem('@Happy.token')
        if (!user || !token) {
            return null
        }

        api.defaults.headers.Authorization = `Bearer ${token}`

        await setAuth({
            user: JSON.parse(user),
            token
        })

    }

    useEffect(() => {
        (async () => await getSessionAuth())()
    }, [])

    async function handleLogin(form: LoginForm) {
        try {
            const {data} = await api.post('auth/login', form)
            sessionStorage.setItem('@Happy.user', JSON.stringify(data.user))
            sessionStorage.setItem('@Happy.token', data.token)

            await setAuth(data)

            return true
        } catch (err) {
            return err.response?.data.errors || []
        }
    }

    async function handleLogout() {
        sessionStorage.removeItem('@Happy.user')
        sessionStorage.removeItem('@Happy.token')
        await setAuth(null)
    }

    return {auth, handleLogin, handleLogout}
}
