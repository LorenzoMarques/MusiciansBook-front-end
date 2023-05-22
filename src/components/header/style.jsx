import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 70px;
  width: 100vw;
  background-color: var(--color-brand1);
  color: white;
  display: flex;
  align-items: center;
  padding-left: 25px;
  margin-right: 25px;
  position: fixed;
  top: 0px;
  left: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 9998;

  h3 {
    font-family: cursive;
    font-weight: 100;
  }

  img {
    width: 150px;
    margin-top: 5px;
  }
`;

export const NavToggle = styled.button`
  position: absolute;
  right: 25px;
  background-color: var(--color-brand1);
  border: unset;
`;

export const Nav = styled.nav`
  display: flex;
  width: 100vw;
  flex-direction: column;
  padding: 25px;
  position: fixed;
  margin-top: 100px;
  top: -28px;
  left: 0px;
  background-color: var(--color-brand1);

  div {
    display: flex;
  }

  .link {
    transition: 0.5s;
    width: fit-content;
    margin-bottom: 20px;
    display: flex;
    .icon {
      margin-right: 10px;
    }
    :hover {
      filter: brightness(70%);
    }
  }
  a {
    color: var(--color-grey5);
    text-decoration: none;
    margin-bottom: 10px;
    width: 100px;
    margin-left: 10px;
  }

  button {
    color: var(--color-grey5);
    text-decoration: none;
    margin-bottom: 10px;
    width: fit-content;
    border: unset;
    margin-left: 10px;
    background-color: transparent;
    font-size: 14px;
    transition: 0.5s;
    margin-bottom: 20px;
    :hover {
      filter: brightness(70%);
    }
  }
  @media (min-width: 800px) {
    display: flex;
    flex-direction: row;
    margin-top: 0px;
    height: 70px;
    margin-left: 0px;
    position: absolute;
    top: 0px;
    left: auto;
    right: 25px;
    width: 50vw;
    justify-content: right;
  }
`;

export const User = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  border-top: 1px solid var(--color-grey5);
  padding-top: 25px;
  margin-top: 15px;
  button {
    border: unset;
    background-color: var(--color-brand2);
    border-radius: 100%;
    height: 35px;
    width: 35px;
    color: var(--color-grey5);
  }
  h3 {
    margin-top: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
  }

  img {
    width: 40px;
    border-radius: 100%;
    margin-left: 5px;
    margin-right: 15px;
  }

  @media (min-width: 800px) {
    padding-top: unset;
    border-top: unset;
    margin-top: unset;
    border-left: 2px solid var(--color-grey2);
    height: 70px;
    margin-left: 25px;
    margin-top: -25px;
    padding-left: 25px;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  margin-left: 5px;
  @media (min-width: 800px) {
    position: relative;
    background-color: var(--color-grey7);
    padding: 5px;
    width: 150px;
    min-width: 150px;
    border-radius: 5px;
    height: 22px;
    input {
      background-color: transparent;
      border: unset;
      width: 100%;
    }
  }
`;
