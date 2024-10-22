import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/loadingSlice';

const useLoading = (initialDelay: number) => {
    const dispatch = useDispatch();
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
            dispatch(setLoading(false));
        }, initialDelay);

        return () => clearTimeout(timer);
    }, [dispatch, initialDelay]);

    return { isInitialLoading };
};

export default useLoading;
