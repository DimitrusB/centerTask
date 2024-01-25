import { useEffect, useState } from "react";
import { getUser } from "../../api";
import * as S from "./main.style";

export const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getUser(searchQuery)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  };

//   useEffect(() => {
//     getUser();
//   }, []);

console.log(userData);
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
      {userData &&
 Array.isArray(userData) &&
 userData.length > 0 &&
 userData.map((user, index) => (
    <div key={index}>
   <p>{user.login}ввв</p>
</div>
 ))}
    </>
  );
};
