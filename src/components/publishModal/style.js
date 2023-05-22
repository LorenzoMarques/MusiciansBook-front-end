import styled from "styled-components";
import { inKeyFrame } from "../../globalStyle";

export const PublishModalContainer = styled.form`
  background-color: var(--color-grey10);
  width: 100vw;
  padding: 25px;
  border-radius: 5px;
  opacity: ${(props) => (props.transition ? "0" : "1")};
  transition: opacity 200ms linear;
  animation: ${inKeyFrame} 0.2s linear;

  @media (min-width: 500px) {
    width: 500px;
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

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    background-color: black;
    border-radius: 100%;
    margin-right: 15px;
  }
`;

export const TextAreaContainer = styled.textarea`
  resize: none;
  width: 100%;
  height: 200px;
  background-color: var(--color-grey10);
  border: unset;
  margin-top: 25px;
`;

export const UploadFiles = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: var(--color-grey6);
  margin-left: -25px;
  margin-top: 15px;
  margin-bottom: 25px;

  @media (min-width: 500px) {
    width: 500px;
  }
`;

export const PublishButton = styled.button`
  background-color: var(--color-brand3);
  font-size: large;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: unset;
  border-radius: 25px;

  :hover {
    filter: brightness(80%);
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const InputFileContainer = styled.div`
  label {
    text-align: center;
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: small;
  }
`;
