import React, { useState, createContext } from "react"


export const AuthContext = createContext({
    isAdmin: false,
    setIsAdmin: () => undefined
})

export const AuthProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <AuthContext.Provider
            value={{
                isAdmin,
                setIsAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}