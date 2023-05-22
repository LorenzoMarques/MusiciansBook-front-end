import styled from "styled-components";
import { inKeyFrame } from "../../globalStyle";

export const CommentContainerModal = styled.div`
  display: flex;
  width: 100vw;
  max-width: 550px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  height: 80vh;
  background-color: var(--color-grey6);
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.transition ? "0" : "1")};
  transition: opacity 200ms linear;
  animation: ${inKeyFrame} 0.2s linear;
`;

export const ToComment = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-grey6);
  padding: 10px;
  width: 100%;
  padding: 20px;
  border-radius: 15px;

  img {
    width: 45px;
  }

  form {
    justify-content: center;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      margin-right: 25px;
    }

    button {
      background-color: var(--color-brand1);
      color: white;
      margin-left: 10px;
      height: 35px;
      padding: 10px;
      border-radius: 15px;
      border: unset;
      border: 1px solid var(--color-grey3);
      transition: 0.2s;

      :hover {
        filter: brightness(1.75);
      }
    }
  }

  textarea {
    border: unset;
    border-radius: 15px;
    background-color: transparent;
    border: 2px solid var(--color-grey3);
    resize: none;
    width: 80%;
    height: 50px;
    padding: 8px;
  }
`;

export const Comment = styled.div`
  width: 100%;
  margin-bottom: 15px;
  max-width: 500px;
  border-radius: 10px;
  display: flex;
  div {
    align-items: center;
    background-color: var(--color-grey6);
    margin-left: 15px;
    width: 90%;
    padding: 10px;

    p {
      word-wrap: break-word;
    }

    h5 {
      margin-bottom: 10px;
    }
  }
  img {
    width: 45px;
    height: 45px;
  }
`;

export const ReadComment = styled.button`
  border: unset;
  background-color: transparent;
  color: blue;
`;

export const CommentsContainer = styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const CommentsContainerHeader = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  padding: 20px;
  padding-top: 35px;
  padding-bottom: 35px;
  border-bottom: 1px solid var(--color-grey4);
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  button {
    border: unset;
    background-color: transparent;
  }
`;
