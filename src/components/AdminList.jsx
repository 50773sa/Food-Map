import { ListGroup } from 'react-bootstrap'
import useGetAdmins from '../hooks/useGetAdmins'
import LoadingSpinner from '../components/LoadingSpinner'

const AdminList = () => {
    const { data: admins, isLoading } = useGetAdmins()

    return (
        <div className='list-wrapper'>
            <h5 className='mb-4'>Admin Lista</h5>

            {isLoading && <LoadingSpinner />}

            {!isLoading && admins &&
        
                <ListGroup variant="flush">
                    {admins.map((admin,i) =>(
                        <ListGroup.Item key={i}>{admin.email}</ListGroup.Item>
                    ))}
                </ListGroup>
                
            }

        </div>
    )
}

export default AdminList