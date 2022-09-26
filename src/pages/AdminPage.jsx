import { useAuthContext } from '../contexts/AuthContext'

const AdminPage = () => {
    const { currentUser } = useAuthContext()

    return (
            <>
                <div>
                    <p>You are logged in as {currentUser.email}</p> 
                </div>
            </>
        )
}

export default AdminPage