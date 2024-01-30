import styled from "styled-components";

export const StyledMain = styled.div`
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  width: 100%;

  overflow: hidden;
  background-color: #f1f1f1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

export const Search__form = styled.form`
  margin-left: 60px;
  max-width: 1044px;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  @media screen and (max-width: 590px) {
    margin-left: 10px;
    max-width: 1044px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
`;

export const Search__text = styled.input`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: transparent;
  padding: 13px 19px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;

  &::-webkit-input-placeholder {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  :-ms-input-placeholder {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  ::-ms-input-placeholder {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  ::-ms-input-placeholder {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  ::placeholder {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  @media screen and (max-width: 590px) {
    display: inline-block;
    width: 100%;
    height: 32px;
    border: none;
    border-radius: 30px;
    background-color: #ffffff;
    padding: 5px 17px;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
  }
  ::-webkit-input-placeholder {
    background-color: transparent;
    color: #b3b3b3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }
  :-ms-input-placeholder {
    background-color: transparent;
    color: #b3b3b3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }
  ::-ms-input-placeholder {
    background-color: transparent;
    color: #b3b3b3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }
  ::placeholder {
    background-color: transparent;
    color: #b3b3b3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }
`;

export const Search__btn = styled.button`
  margin-left: 10px;
  width: 158px;
  height: 50px;
  background-color: #009ee4;
  border: 1px solid #009ee4;
  border-radius: 6px;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  &:hover {
    background-color: #0080c1;
  }
  @media screen and (max-width: 590px) {
    display: none;
  }
`;

export const Main__list = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Img__Main = styled.img`
  margin-right: 15px;
  width: 55px;
  height: auto;
  border-radius: 50%;
`;

export const Name__list = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const List__ofName = styled.div`
  width: 300px;
  border-right: solid;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
`;

export const But_Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
