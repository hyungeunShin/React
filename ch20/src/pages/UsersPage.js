import {Route, Routes} from 'react-router-dom';
import UsersContainer from "../containers/UsersContainer";
import UserPage from './UserPage';

const UsersPage = () => {
    return (
        <>
            <UsersContainer></UsersContainer>
            <Routes>
                <Route path=":id" element={<UserPage></UserPage>}></Route>
            </Routes>
        </>
    );
};

export default UsersPage;