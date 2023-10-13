import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from '../components/User';
import { Preloader, usePreloader } from "../lib/PreloadContext";
import { getUser } from '../modules/users';

const UserContainer = ({ id }) => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    usePreloader(() => dispatch(getUser(id)));

    useEffect(() => {
        if(user && user.id === parseInt(id, 10)) return;    //사용자가 존재하고, id가 일치하면 요청하지 않음

        dispatch(getUser(id));
    }, [dispatch, id, user]);   //id가 바뀔때마다 새로 요청


    //컨테이너 유효성 검사 후 return null을 해야하는 경우에
    //null 대신 Preloader 반환
    /* if(!user) {
        return <Preloader resolve={() => dispatch(getUser(id))}></Preloader>;
    } */

    //return <User user={user}></User>;

    if(!user) return null;
    return <User user={user}></User>;
};

export default UserContainer;