import * as S from "../../pages/main/main.style"

export const ListOfUser = ({userData, handleSelectUser}) => {
    return(
        <>
            {Array.isArray(userData) && userData.map((user, index) => (
                <S.Name__list key={index}>
                    <S.Img__Main src={user.avatar_url}></S.Img__Main>
                    <p
                        style={{ cursor: "pointer", marginRight: "15px" }}
                        onClick={() =>
                            handleSelectUser(
                                user.login,
                                user.avatar_url,
                                user.html_url
                            )
                        }
                    >
                        {user.login}
                    </p>
                </S.Name__list>
            ))}
        </>
    )
}
