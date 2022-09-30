import { createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Container } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) 
	const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

    const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])
    
    const contextValues = {
		currentUser,
        signup,
        login,
        logout,
	}

    return (
		<AuthContext.Provider value={contextValues}>
            {loading ? (
                <Container className='vh-100 d-flex justify-content-center align-items-center'>
                    <LoadingSpinner />
                </Container>
            ) : (
                children
            )}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}


