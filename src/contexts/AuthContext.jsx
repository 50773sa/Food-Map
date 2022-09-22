import { createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	
    const [currentUser, setCurrentUser] = useState(null) 

    const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])
    
    const contextValues = {
		currentUser,
        login,
        logout,
	}

    return (
		<AuthContext.Provider value={contextValues}>
            {children}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}
