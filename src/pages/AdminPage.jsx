import { auth } from '../firebase'

const AdminPage = () => {
  return (
        <>
            <div>AdminPage</div>

            {auth.currentUser ? <p>You are logged in as {auth.currentUser.email}</p> : <p>Nils</p>}
        </>
    )
}

export default AdminPage