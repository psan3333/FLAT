import { SafeUser } from '@/app/types';

interface AdminClientProps {
    currentUser?: SafeUser | null;
}

const AdminClient: React.FC<AdminClientProps> = async ({
    currentUser
}) => {

    return (
        <div></div>
    );
}
 
export default AdminClient;