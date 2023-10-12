import { useEffect } from "react";
import Users from '../components/Users';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../modules/users";

const UsersContainer = () => {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if(users) return;   //users가 이미 유효하지 않다면 요청하지 않는다
        dispatch(getUsers());
    }, [dispatch, users]);

    return <Users users={users}></Users>;
};

export default UsersContainer;