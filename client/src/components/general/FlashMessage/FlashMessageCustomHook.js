import { useDispatch, useSelector } from 'react-redux';

const useFlashMessage = (callback) => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.flashMessageReducer.message);
    const type = useSelector((state) => state.flashMessageReducer.type);
    const hideFlashMessage = () => dispatch(callback);
    return {
        message, type, hideFlashMessage
    };
};

export default useFlashMessage;
