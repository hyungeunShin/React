import { useEffect } from 'react';
import Users from '../components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../modules/users';
import { Preloader } from '../lib/PreloadContext';

const UsersContainer = () => {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    // 컴포넌트 마운트될 때 호출
    useEffect(() => {
        if(users) return; // users가 이미 유효하다면 요청하지 않음
        dispatch(getUsers());
    }, [dispatch, users]);

    
    return (
        <>
            <Users users={users} />
            <Preloader resolve={() => dispatch(getUsers)} />
        </>
    );
};

export default UsersContainer;


