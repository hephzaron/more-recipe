import { useSelector } from 'react-redux';

const useNotification = () => {
    const notifications = useSelector((state) => state.notificationReducer.notifications);
    const {
        Recipe, User, creator, updatedAt
    } = notifications[0];

    return {
        User,
        username: creator.username,
        notifications,
        recipeName: Recipe.name,
        recipePhoto: Recipe.photoUrl,
        updatedAt
    };
};

export default useNotification;
