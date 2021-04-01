import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../helpers/axiosHelper";

const jwt = require('jsonwebtoken');

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const value = useAuthFunction({user, setUser})
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    const data = useContext(AuthContext)
    return data
}

function useAuthFunction({user, setUser}) {

    let history = useHistory();

    function saveToken(token) {
        localStorage.setItem("token", token)
        const user = jwt.decode(token)
        setUser(user)
    }

    function isUserLoggedIn() {
        const token = localStorage.getItem("token")
        if (token) {
            const user = jwt.decode(token)
            setUser(user)
        }
    }

    function logout() {
        localStorage.removeItem("token")
        setUser(null)
    }

    const register = useMutation(({ name, email, password }) => {
        const data = { email, password, name }
        return axiosInstance.post("auth/register", data)
            .then((result) => {
                const data = result.data
                if (data.success){
                    saveToken(data.data.token)
                    history.push("/")
                }
            })
    });

    const login = useMutation(({ email, password }) => {
        const data = { email, password }
        return axiosInstance.post("auth/login", data)
            .then((result) => {
                const data = result.data
                if (data.success){
                    saveToken(data.data.token)
                    history.push("/")
                }
            })
    });

    useEffect(() => {
        isUserLoggedIn()
    }, [])

    return { user, register, login, logout }
}

export { useAuth, AuthProvider }