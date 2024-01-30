import { useEffect, useRef, useState } from "react";
import { getUser, getUserRepo } from "../../api";
import * as S from "./main.style";

export const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listEmpty, setListEmpty] = useState(true);
  const [selectUser, setSelectUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserLogin, setSelectedUserLogin] = useState("");
  const [selectedUserAvatar, setSelectedUserAvatar] = useState("");
  const [selectedUserURL, setSelectedUserURL] = useState("");
  const [page, setPage] = useState(1);
  const [pageUs, setPageUs] = useState(1);
  const refdata = useRef();
  const refuser = useRef();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectUser = async (login, avatar, url) => {
    setSelectUser(true);
    setSelectedUserLogin(login);
    setSelectedUserAvatar(avatar);
    setSelectedUserURL(url);
    setPage(1);
    try {
      const repos = await getUserRepo(login, page);
      setSelectedUser(repos);
      refdata.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getUser(searchQuery, pageUs)
    .then((data) => {
      if (data && data.items) {
        setUserData(data.items);
      } else {
        setUserData([]);
        alert('Ведите значение для поиска')
      }
    })
  };

  useEffect(() => {
    if (selectedUserLogin) {
      handleSelectUser(selectedUserLogin, selectedUserAvatar, selectedUserURL);
    }
  }, [page, selectedUserLogin, selectedUserAvatar, selectedUserURL]);

  useEffect(() => {
    if (searchQuery) {
      getUser(searchQuery, pageUs)
        .then((data) => {
          setUserData(data.items);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
        });
    }
  }, [pageUs]);

  useEffect(() => {
    if (userData.length === 0) {
      setListEmpty(true);
    } else {
      setListEmpty(false);
    }
  }, [userData]);

  return (
    <S.Wrapper>
      <h1>Поиск пользователей GitHub</h1>
      <S.Search__form onSubmit={handleSearchSubmit}>
        <S.Search__text
          type="search"
          placeholder="Поиск по пользователям"
          name="search"
          onChange={handleSearch}
          value={searchQuery}
        />
        <S.Search__btn type="submit">Найти</S.Search__btn>
      </S.Search__form>
      <h1 ref={refuser}>Список пользователей GitHub</h1>
      {listEmpty ? (
        <p>Список пуст</p>
      ) : (
        <S.Main__list>
          <S.List__ofName>
            {Array.isArray(userData) &&
              userData &&
              userData.map((user, index) => (
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
            <button
              onClick={() => {
                setPageUs(pageUs - 1);
                if (refuser.current) {
                  refuser.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              disabled={pageUs === 1}
            >
              Предыдущая страница
            </button>
            <button
              onClick={() => {setPageUs(pageUs + 1)
                if (refuser.current) {
                  refuser.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              disabled={userData.length < 30}
            >
              Следующая страница
            </button>
          </S.List__ofName>
          <div>
            {selectUser ? (
              <>
                <h1 ref={refdata}>Данные пользователя:</h1>
                <S.Img__Main
                  src={selectedUserAvatar}
                  alt="Аватар пользователя"
                ></S.Img__Main>
                <p>Логин: {selectedUserLogin}</p>
                <a href={selectedUserURL} target="block">
                  Git-страница пользователя
                </a>
                <div>
                  <h1>Репозитории пользователя ({selectedUser.length} ):</h1>
                  {Array.isArray(selectedUser) &&
                    selectedUser.map((repo, index) => (
                      <ul key={index}>
                        <li>{repo.name}</li>
                      </ul>
                    ))}
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Предыдущая страница
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={selectedUser.length < 30}
                  >
                    Следующая страница
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </S.Main__list>
      )}
    </S.Wrapper>
  );
};
