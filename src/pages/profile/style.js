import styled, { keyframes } from "styled-components";

export const ProfileContainer = styled.div`
  padding-top: 70px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  width: 90vw;
  margin: auto;
  margin-top: 30px;
  justify-content: flex-start;

  img {
    background-color: black;
    border-radius: 100%;
    width: 100px;
    margin-right: 20px;
  }
  div {
    height: 70px;
    h3 {
      margin-bottom: 15px;
    }

    button {
      background-color: transparent;
      border: 2px solid var(--color-grey4);
      border-radius: 5px;
      padding: 5px;
      width: 120px;
      font-weight: 900;
    }
  }

  @media (min-width: 800px) {
    width: 80vw;
    margin: auto;
    margin-top: 30px;
    justify-content: flex-start;
  }
`;

export const Posts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 800px) {
    width: 80vw;
    margin: auto;
  }
`;

export const Card = styled.div`
  width: 30vw;
  height: 30vw;
  cursor: pointer;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-grey3);

  img {
    width: 150%;
  }

  @media (min-width: 800px) {
    width: 25vw;
    height: 25vw;
  }
`;

export const Info = styled.div`
  height: 50px;
  border-top: 2px solid var(--color-grey4);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 25px;
  padding: 25px;

  @media (min-width: 800px) {
    width: 0px;
    visibility: hidden;
  }
`;

export const UserInfo = styled.div`
  .songs-fans {
    width: 0px;
    height: 0px;
    visibility: hidden;
  }
  div {
    display: block;

    button {
      width: fit-content;
      height: fit-content;
      font-size: large;
      :hover {
        filter: brightness(80%);
      }
    }

    h3 {
      margin-right: 25px;
    }
  }

  @media (min-width: 800px) {
    .songs-fans {
      width: auto;
      height: auto;
      visibility: visible;
    }

    div {
      display: flex;
    }
  }
`;

export const Sp = styled.div`
  margin: auto;
  width: 100vw;
  border-top: 2px solid var(--color-grey4);
  display: flex;
  justify-content: space-evenly;

  button {
    background-color: transparent;
    color: var(--color-grey1);
    font-size: large;
    font-weight: 900;
    border: none;
    height: 55px;
  }
`;

export const StyledSongButton = styled.div`
  cursor: pointer;
  background-color: transparent;
  color: var(--color-grey1);
  font-size: large;
  font-weight: 900;
  border: none;
  height: 55px;
  border-top: ${(props) =>
    !props.songsOrImages && `2px solid var(--color-grey3)`};
`;

export const StyledImageButton = styled.div`
  cursor: pointer;
  background-color: transparent;
  color: var(--color-grey1);
  font-size: large;
  font-weight: 900;
  border: none;
  height: 55px;
  border-top: ${(props) =>
    props.songsOrImages && `2px solid var(--color-grey3)`};
`;

export const StyledMessage = styled.h3`
  margin: auto;
`;

const inKeyFrame = keyframes`
  from {
    opacity: 0;
  }

  to {
    transform: 1;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: unset;
  }
`;

export const ModalContainer = styled.form`
  opacity: ${(props) => (props.transition ? "0" : "1")};
  width: 100vw;
  padding: 25px;
  max-width: 500px;
  transition: opacity 200ms linear;
  animation: ${inKeyFrame} 0.2s linear;
  background-color: var(--color-grey10);

  display: flex;
  flex-direction: column;

  input {
    border: 1px solid var(--color-grey6);
    border-radius: 5px;
    height: 45px;
    margin-bottom: 25px;
    padding: 15px;
  }
`;

export const StyledButton = styled.button`
  background-color: var(--color-brand3);
  font-size: large;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: unset;
  border-radius: 25px;
  width: fit-content;

  :hover {
    filter: brightness(80%);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
