import { useMemo } from 'react'
import SortableTable from '../components/SortableTable'
import useGetAdmins from '../hooks/useGetAdmins'
import LoadingSpinner from '../components/LoadingSpinner'

const AdminList = () => {
    const { data: admins, isLoading } = useGetAdmins()

    const columns = useMemo(() => {
        return [
            {
                Header: 'Admins',
                accessor: 'email'
            },
        ]
    },[])

    return (
        <div className='list-wrapper my-4'>
            <h5 className='mb-4'>Admin Lista</h5>

            {isLoading && <LoadingSpinner />}

            {!isLoading && admins && (
                <SortableTable columns={columns} data={admins} />
            )}

        </div>
    )
}

export default AdminList