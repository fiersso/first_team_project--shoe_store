import { createContext, useState } from 'react';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('isLoggedIn')))

    const logout = () => {
        setUser(null)
        localStorage.removeItem('isLoggedIn')
    }

    const login = (UserData) => {
        setUser(UserData);
        localStorage.setItem('isLoggedIn', JSON.stringify(UserData));
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider