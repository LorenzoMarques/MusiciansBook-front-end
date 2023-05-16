import { AiOutlineLike } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

export const Post = styled.div`
  background-color: var(--color-grey10);
  margin-top: 15px;
  padding-top: 15px;
  width: 100%;
  overflow: hidden;
  p {
    margin-bottom: 15px;
    margin-left: 10px;
  }

  @media (min-width: 769px) {
    width: 500px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-left: 25px;
    padding-left: 15px;
    padding-right: 15px;
    p {
      margin-left: 0px;
    }
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 15px;
  @media (min-width: 769px) {
    margin-left: 0px;
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background-color: black;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const FakeImage = styled.div`
  background-color: var(--color-grey1);
  height: 400px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    margin: auto;
  }
`;

export const LikeCommentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 55px;

  button {
    border: unset;
    background-color: transparent;
    padding: 5px;
    border-radius: 5px;
    transition: 0.2s;
    :hover {
      background-color: rgba(128, 128, 128, 0.2);
    }
  }
`;

export const FeedContainer = styled.div`
  padding-top: 70px;
  height: ${(props) => props.publishModal && "100vh"};
  /* overflow: ${(props) => props.publishModal && "hidden"}; */
`;

export const FollowingContainer = styled.div`
  height: 90vh;
  position: fixed;
  left: 0px;
  top: 70px;
  background-color: var(--color-grey7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 250px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.followersLoading && "center"};
  justify-content: ${(props) => props.followersLoading && "center"};
  font-size: small;
  z-index: 999;
  overflow-y: hidden;
  overflow-x: hidden;
  transition: 0.5s;

  :hover {
    overflow-y: auto;
  }

  h2 {
    margin-bottom: 25px;
  }

  &::-webkit-scrollbar {
    border-radius: 5px;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey4);
  }
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    max-width: 700px;
  }
`;

const show = keyframes`
  from {
    bottom: -90px;
  }

  to {
    bottom: 0px;
  }
`;

export const AudioContainer = styled.div`
  width: 100vw;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  transition: 0.5s;
  animation: ${show} 0.5s;
  bottom: ${(props) => (props.isHidden ? "-90px" : "0px")};

  @media (min-width: 769px) {
    width: 500px;
  }

  button {
    background-color: transparent;
    border: unset;
  }
`;

export const CreatePost = styled.div`
  background-color: var(--color-grey10);
  width: 100vw;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 25px;
  margin-bottom: ${(props) => (props.followersLoading ? "50px" : "")};
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 769px) {
    width: 500px;
    margin-left: 25px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-around;
  width: 100%;
`;

export const CreatePubButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-grey2);
  width: 90%;
  height: 45px;
  border-radius: 25px;
  text-align: left;
  padding-left: 25px;
  font-weight: 600;
`;

export const FilesButton = styled.button`
  background-color: transparent;
  border: unset;
  display: flex;
  align-items: center;
`;

export const LikeButton = styled.button`
  :focus {
    .liked {
      animation: ${pulseAnimation} 0.5s;
    }
  }
`;
