import styled from "styled-components";

export const Modal = styled.div`
  height: 100vh;
  background-color: var(--color-grey5);
  position: absolute;
  top: -72px;
  left: 0px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  @media (min-width: 800px) {
    height: 350px;
    width: 350px;
    top: 50px;
    left: -50%;
  }
`;

export const Line = styled.div`
  width: 100vw;
  border-top: 1px solid var(--color-grey4);
  @media (min-width: 800px) {
    visibility: hidden;
    width: 0px;
  }
`;

export const User = styled.div`
  width: 90vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 55px;
  margin-top: 15px;
  color: black;

  img {
    width: 40px;
    border-radius: 100%;
    margin-right: 15px;
  }

  div {
    height: 45px;
    width: 45px;
    border-radius: 100%;
    background-color: black;
    margin-right: 15px;
  }

  @media (min-width: 800px) {
    width: 90%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  height: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: var(--color-grey5);

  input {
    border-radius: 5px;
    background-color: transparent;
    width: 85vw;
    margin-right: 15px;
    border: 1px solid var(--color-grey4);
    padding-left: 5px;
  }

  button {
    background-color: transparent;
    border: unset;
    font-size: 25px;
  }

  @media (min-width: 800px) {
    width: 200px;
    visibility: hidden;
    height: 0px;
    margin-bottom: 0px;

    input {
      width: 200px;
      height: 0px;
    }
  }
`;

export const SearchButton = styled.div`
  background-color: transparent;
  color: var(--color-brand1);
  font-size: small;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
`;
