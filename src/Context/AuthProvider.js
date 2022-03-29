import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { Spin } from 'antd'

export const AuthContext = React.createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    // const [isLoading, setIsLoading] = useState(true)
    const history = useNavigate()

    React.useEffect(() => {

        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL })
                // setIsLoading(false)
                history('/');
                return;
            }
            history('/login');
        })
        return () => {
            unsub();
        }
    }, [history])

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}

