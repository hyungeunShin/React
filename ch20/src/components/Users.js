import {Link} from 'react-router-dom';

const Users = ({users}) => {
    //users가 유효하지 않다면 아무것도 보여주지 않는다
    if(!users) {
        return null;
    }

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;