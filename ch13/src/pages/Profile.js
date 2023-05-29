import { useParams } from "react-router-dom";

const data = {
    my: {
        name: '홍길동',
        description: '홍길동전의 주인공',
    },
    gildong: {
        name: '김길동',
        description: '리액트 공부 중',
    },
};

const Profile = () => {
    const params = useParams();
    const profile = data[params.username];

    return(
        <div>
            <h1>사용자 프로필</h1>
            {profile ? (
                <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.description}</p>
                </div>
            ) : (
                <p>존재하지 않는 프로필입니다.</p>
            )}
        </div>
    );
};

export default Profile;