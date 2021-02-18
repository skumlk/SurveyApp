import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useMutation } from "react-query";
const jwt = require('jsonwebtoken');

const AuthContext = createContext()

function AuthProvider({ children }) {
    const value = useAuthFunction()
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    const data = useContext(AuthContext)
    return data
}

function useAuthFunction() {

    const [user, setUser] = useState(null)


    function saveToken(token) {
        localStorage.setItem("token", token)
        const user = jwt.decode(token)
        setUser(user)
    }

    const register = useMutation(({ name, email, password }) => {
        const data = { email, password, name }
        return axios.post("http://localhost:4000/api/auth/register", data)
            .then((result) => {
                const data = result.data
                if (data.success)
                    saveToken(data.data.token)
            })
    });

    const login = useMutation(({ email, password }) => {
        const data = { email, password }
        console.log(data)
        return axios.post("http://localhost:4000/api/auth/login", data)
            .then((result) => {
                const data = result.data
                if (data.success)
                    saveToken(data.data.token)
            })
    });

    useEffect(() => {

    }, [])

    return { user, register, login }
}

export { useAuth, AuthProvider }