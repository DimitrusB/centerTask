import { useEffect, useState } from "react";
import { getUser, getUserRepo } from "../../api";
import * as S from "./main.style";

export const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listEmpty, setListEmpty] = useState(true);
  const [selectUser, setSelectUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectUser = async (login) => {
    setSelectUser(true);
    try {
      const repos = await getUserRepo(login);
      setSelectedUser(repos);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getUser(searchQuery)
      .then((data) => {
        // Устанавливаем в состояние массив items, а не весь объект
        setUserData(data.items);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  };

  useEffect(() => {
    if (userData.length === 0) {
      setListEmpty(true);
    } else {
      setListEmpty(false);
    }
  }, [userData]);

  console.log(userData);
  console.log(selectedUser);

  return (
    <>
      <h1>Поиск пользователей GitHub</h1>
      <S.Search__form onSubmit={handleSearchSubmit}>
        <S.Search__text
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
          onChange={handleSearch}
          value={searchQuery}
        />
        <S.Search__btn type="submit">Найти</S.Search__btn>
      </S.Search__form>
      <p>Список пользователей GitHub</p>
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
                  <p onClick={() => handleSelectUser(user.login)}>
                    {user.login}
                  </p>
                </S.Name__list>
              ))}
          </S.List__ofName>
          <p>Данные пользователей:</p>
          {Array.isArray(selectedUser) &&
            selectedUser.map((repo, index) => (
              <div key={index}>
                <ul>
                  <li>{repo.name}</li>
                </ul>
              </div>
            ))}
        </S.Main__list>
      )}
    </>
  );
};
