import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

interface IUseAdminCheck {
    listingId: string;
}

const useAdminCheck = ({
    listingId
}: IUseAdminCheck) => {
    const router = useRouter();

    const checkListing = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        try {
            let request;
            request = () => axios.post(`/api/admin_check/${listingId}`);
            await request();
            router.refresh();
            toast.success('Success');
        }
        catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }

    }, [
        listingId,
        router
    ]);

    const deleteListing = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        try {
            let request;
            request = () => axios.delete(`/api/admin_check/${listingId}`);
            await request();
            router.refresh();
            toast.success('Success');
        }
        catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }

    }, [
        listingId,
        router
    ]);

    return {
        checkListing,
        deleteListing
    };
}

export default useAdminCheck;
