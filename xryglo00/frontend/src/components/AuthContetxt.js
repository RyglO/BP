import React, { useState, createContext, useEffect } from "react"


export const AuthContext = createContext({
    isAdmin: false,
    setIsAdmin: () => undefined
})

export const AuthProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        console.log('nooow', isAdmin)
    }, [isAdmin, setIsAdmin])

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