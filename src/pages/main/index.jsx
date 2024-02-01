import { useEffect, useRef, useState } from "react";
import { getUser, getUserRepo } from "../../api";
import { ListOfUser } from "../../components/LostOfUser";
import * as S from "./main.style";
import SortMountDown from "../../img/sortamountdown_120336.svg";

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
  const [sorted, setSorted] = useState();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectUser = async (login, avatar, url) => {
    setSelectUser(true);
    setSelectedUserLogin(login);
    setSelectedUserAvatar(avatar);
    setSelectedUserURL(url);
    setPage(1);
  };

  const loadUserRepos = async (login, page) => {
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
    getUser(searchQuery, pageUs, sorted).then((data) => {
      if (data && data.items) {
        setUserData(data.items);
      } else {
        setUserData([]);
        alert("Ведите значение для поиска");
      }
    });
  };

  useEffect(() => {
    if (selectedUserLogin) {
      loadUserRepos(selectedUserLogin, page);
    }
  }, [page, selectedUserLogin]);

  useEffect(() => {
    if (searchQuery) {
      getUser(searchQuery, pageUs, sorted)
        .then((data) => {
          setUserData(data.items);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
        });
    }
  }, [pageUs, sorted]);

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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <svg
                style={{ cursor: "pointer" }}
                onClick={() => setSorted("sort=repositories&order=desc")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <title>По убыванию</title>
                <path d="M6.90365714,19.8034496 C6.81268627,19.9276666 6.66576323,20.008331 6.5,20.008331 C6.33423677,20.008331 6.18731373,19.9276666 6.09634286,19.8034496 L3.14644661,16.8535534 C2.95118446,16.6582912 2.95118446,16.3417088 3.14644661,16.1464466 C3.34170876,15.9511845 3.65829124,15.9511845 3.85355339,16.1464466 L6,18.2928932 L6,4.5 C6,4.22385763 6.22385763,4 6.5,4 C6.77614237,4 7,4.22385763 7,4.5 L7,18.2928932 L9.14644661,16.1464466 C9.34170876,15.9511845 9.65829124,15.9511845 9.85355339,16.1464466 C10.0488155,16.3417088 10.0488155,16.6582912 9.85355339,16.8535534 L6.90365714,19.8034496 L6.90365714,19.8034496 Z M12.5,6 C12.2238576,6 12,5.77614237 12,5.5 C12,5.22385763 12.2238576,5 12.5,5 L20.5,5 C20.7761424,5 21,5.22385763 21,5.5 C21,5.77614237 20.7761424,6 20.5,6 L12.5,6 Z M12.5,10 C12.2238576,10 12,9.77614237 12,9.5 C12,9.22385763 12.2238576,9 12.5,9 L18.5,9 C18.7761424,9 19,9.22385763 19,9.5 C19,9.77614237 18.7761424,10 18.5,10 L12.5,10 Z M12.5,14 C12.2238576,14 12,13.7761424 12,13.5 C12,13.2238576 12.2238576,13 12.5,13 L16.5,13 C16.7761424,13 17,13.2238576 17,13.5 C17,13.7761424 16.7761424,14 16.5,14 L12.5,14 Z M12.5,18 C12.2238576,18 12,17.7761424 12,17.5 C12,17.2238576 12.2238576,17 12.5,17 L14.5,17 C14.7761424,17 15,17.2238576 15,17.5 C15,17.7761424 14.7761424,18 14.5,18 L12.5,18 Z" />
              </svg>
              <svg
                style={{ cursor: "pointer" }}
                onClick={() => setSorted("sort=repositories&order=asc")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <title>По возрастанию</title>
                <path d="M8,5.70710678 L8,19.508331 C8,19.7844734 7.77614237,20.008331 7.5,20.008331 C7.22385763,20.008331 7,19.7844734 7,19.508331 L7,5.70710678 L4.85355339,7.85355339 C4.65829124,8.04881554 4.34170876,8.04881554 4.14644661,7.85355339 C3.95118446,7.65829124 3.95118446,7.34170876 4.14644661,7.14644661 L7.14644661,4.14644661 C7.34170876,3.95118446 7.65829124,3.95118446 7.85355339,4.14644661 L10.8535534,7.14644661 C11.0488155,7.34170876 11.0488155,7.65829124 10.8535534,7.85355339 C10.6582912,8.04881554 10.3417088,8.04881554 10.1464466,7.85355339 L8,5.70710678 Z M12.5,6 C12.2238576,6 12,5.77614237 12,5.5 C12,5.22385763 12.2238576,5 12.5,5 L20.5,5 C20.7761424,5 21,5.22385763 21,5.5 C21,5.77614237 20.7761424,6 20.5,6 L12.5,6 Z M12.5,10 C12.2238576,10 12,9.77614237 12,9.5 C12,9.22385763 12.2238576,9 12.5,9 L18.5,9 C18.7761424,9 19,9.22385763 19,9.5 C19,9.77614237 18.7761424,10 18.5,10 L12.5,10 Z M12.5,14 C12.2238576,14 12,13.7761424 12,13.5 C12,13.2238576 12.2238576,13 12.5,13 L16.5,13 C16.7761424,13 17,13.2238576 17,13.5 C17,13.7761424 16.7761424,14 16.5,14 L12.5,14 Z M12.5,18 C12.2238576,18 12,17.7761424 12,17.5 C12,17.2238576 12.2238576,17 12.5,17 L14.5,17 C14.7761424,17 15,17.2238576 15,17.5 C15,17.7761424 14.7761424,18 14.5,18 L12.5,18 Z" />
              </svg>
            </div>
            <ListOfUser
              userData={userData}
              handleSelectUser={handleSelectUser}
            />
            <S.But_Nav>
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
                onClick={() => {
                  setPageUs(pageUs + 1);
                  if (refuser.current) {
                    refuser.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                disabled={userData.length < 30}
              >
                Следующая страница
              </button>
            </S.But_Nav>
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
                  <S.But_Nav>
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
                  </S.But_Nav>
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
