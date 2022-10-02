import { createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateEmail,
	updatePassword,
    signOut } from 'firebase/auth'
import { Container } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) 
    const [userEmail, setUserEmail] = useState(null)
	const [loading, setLoading] = useState(true)

    const signup =  async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password)

        await reloadUser()
	}

    const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

    const logout = () => {
        return signOut(auth)
    }

    const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserEmail(auth.currentUser.email)
		return true
	}

    const setEmail = (email) => {
		return updateEmail(currentUser, email)
	}

    const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setUserEmail(user?.email)
            setLoading(false)
        })
    }, [])
    
    const contextValues = {
		currentUser,
        signup,
        login,
        logout,
        reloadUser,
        setEmail,
		setPassword,
		userEmail,
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


