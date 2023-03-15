import styled from "styled-components";

export const ChatPageContainer = styled.div`
  overflow-y: hidden;

  @media (min-width: 800px) {
    display: flex;
  }
`;

export const Contacts = styled.div`
  background-color: var(--color-grey9);
  width: 100vw;
  height: 100vh;
  padding-top: 80px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;

  .currentUserChat {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 800px) {
    width: 300px;
    border-right: 2px solid var(--color-grey6);
  }
`;

export const Chat = styled.form`
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
  width: 100vw;
  height: 100vh;
  background-color: var(--color-grey9);
  position: fixed;
  top: 0px;
  padding-top: 70px;
  padding-left: 10px;
  padding-right: 10px;

  .oldMessagesLoading {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  @media (min-width: 800px) {
    position: relative;
  }
`;

export const InputContainer = styled.div`
  background-color: var(--color-grey6);
  height: 35px;
  width: 90%;
  margin-top: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-bottom: ${(props) => (props.loading ? "50px" : "0px")};
  input {
    padding: 15px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: unset;
  }
`;

export const ContactsHeader = styled.div`
  border-top: 1px solid var(--color-grey6);
  border-bottom: 1px solid var(--color-grey6);
  padding: 15px;
  width: 100%;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-top: 15px;
  margin-left: 10px;
  cursor: pointer;
  :hover {
    background-color: var(--color-grey6);
  }
  img {
    border-radius: 100%;
    width: 50px;
    margin-right: 15px;
  }
`;

export const ChatMessages = styled.div`
  background-color: var(--color-grey9);
  width: 100%;
  height: 90%;
  overflow: auto;
  padding-bottom: 15px;
  padding-top: 70px;

  .me {
    background-color: var(--color-brand3);
    width: fit-content;
    border-radius: 8px;
    padding: 5px;
    padding: 10px;
  }

  .you {
    background-color: var(--color-grey6);
    width: fit-content;
    border-radius: 8px;
    padding: 5px;
    padding: 10px;
  }
`;

export const MyMessages = styled.div`
  position: relative;
  display: flex;
  margin-top: 15px;
  justify-content: flex-end;
`;

export const YourMessages = styled.div`
  position: relative;
  display: flex;
  margin-top: 15px;
  justify-content: flex-start;
`;

export const ChatMessagesHeader = styled.div`
  border-bottom: 1px solid var(--color-grey6);
  padding: 15px;
  display: flex;
  align-items: center;
  position: fixed;
  height: 65px;
  top: 70px;
  background-color: var(--color-grey9);
  z-index: 9999;
  width: 100%;
  left: 0px;
  p {
    margin-left: 15px;
  }

  button {
    border: unset;
    padding-top: 5px;
    background-color: transparent;
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 100%;
    margin-right: 15px;
    border-radius: 10px;
    height: 35px;
    padding: 15px;
    border: 1px solid var(--color-grey2);
  }

  button {
    border: unset;
    background-color: transparent;
    margin-right: 15px;
  }
`;

export const TextContainer = styled.div`
  max-width: 50%;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
`;
