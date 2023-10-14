import { Route, Routes } from "react-router-dom";
import UsersContainer from "../containers/UsersContainer";
import UserPage from "./UserPage";

const UsersPage = () => {
    //return <UsersContainer />;
    return (
        <>
            <UsersContainer />
            <Routes>
                <Route path=":id" element={<UserPage />}></Route>
            </Routes>
        </>
    );
};

export default UsersPage;
