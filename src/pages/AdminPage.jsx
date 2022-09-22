import { useAuthContext } from '../contexts/AuthContext'

const AdminPage = () => {
    const { currentUser } = useAuthContext()

    return (
            <>
                <div>AdminPage</div>

                {currentUser 
                    ? <p>You are logged in as {currentUser.email}</p> 
                    : <p>Vem e du egentligen?</p>}
            </>
        )
}

export default AdminPage