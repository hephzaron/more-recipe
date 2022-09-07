import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useFlashMessage = (callback) => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.flashMessageReducer.message);
    const type = useSelector((state) => state.flashMessageReducer.type);

    const hideFlashMessage = () => dispatch(callback());

    useEffect(() => {
        const timer = setTimeout(() => hideFlashMessage(), 5000);
        return () => clearTimeout(timer);
    }, []);

    return {
        message, type, hideFlashMessage
    };
};

export default useFlashMessage;
