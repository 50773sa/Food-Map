import { createContext, useContext} from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	
    const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}
    
    const contextValues = {
		login,
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
