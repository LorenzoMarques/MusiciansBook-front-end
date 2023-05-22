import { createGlobalStyle, keyframes } from "styled-components";
import styled from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing:border-box;
        outline: 0;
    }
    :root {
        --color-brand1: #101434;
        --color-brand2: #0819B1;
        --color-brand3: #B0A6F0;
        --color-brand4: #EDEAFD;
        --color-grey0: #0B0D0D;
        --color-grey1: #212529;
        --color-grey2: #495057;
        --color-grey3: #868E96;
        --color-grey4: #ADB5BD;
        --color-grey5: #CED4DA;
        --color-grey6: #DEE2E6;
        --color-grey7: #e9ecf5;
        --color-grey8: #F1F3F5;
        --color-grey9: #F8F9FA;
        --color-grey10: #FDFDFD;
        --color-whiteFixed: #FFFFFF;
        
        --color-alert1: #CD2B31;
        --color-alert2: #FDD8D8;
        --color-alert3: #FFE5E5;
        --color-sucess1: #18794E;
        --color-sucess2: #CCEBD7;
        --color-sucess3: #DDF3E4;
        --color-random1: #E34D8C;
        --color-random2: #C04277;
        --color-random3: #7D2A4D;
        --color-random4: #7000FF;
        --color-random5: #6200E3;
        --color-random6: #36007D;
        --color-random7: #349974;
        --color-random8: #2A7D5F;
        --color-random9: #153D2E;
        --color-random10: #6100FF;
        --color-random11: #5700E3;
        --color-random12: #30007D;
    }
    button {
        cursor: pointer;
    }
    li {
        list-style: none;
    }
    body {
        background-color: var(--color-grey7);


      @media (min-width: 800px) {

        &::-webkit-scrollbar {
        width: 10px;
        }

        &::-webkit-scrollbar-thumb {
        background-color: var(--color-grey4);
        border-radius: 5px;
        }
      }

    }

    a {
        text-decoration: none;
    }
`;

export const LoginRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;

  input {
    border: 1px solid var(--color-grey4);
    padding: 5px;
    margin-top: 25px;
    width: 100%;
    border-radius: 5px;
    height: 45px;
  }

  a {
    font-size: 12px;
    color: blue;
    margin-top: 15px;
  }
`;

export const Line = styled.div`
  border-top: 1px solid var(--color-grey4);
  width: 100%;
  margin-top: 21px;
`;

export const StyledButton = styled.button`
  background-color: var(--color-brand1);
  border: unset;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-top: 25px;
  margin-bottom: 25px;
  height: 45px;
  width: ${(props) => (props.isBig ? "100%" : "50%")};
  font-size: ${(props) => (props.isBig ? "20px" : "12px")};
`;

export const Span = styled.span`
  color: red;
  margin-bottom: -20px;
  margin-top: 20px;
  font-size: small;
`;

const spinner = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

export const LoadingSpinner = styled.div`
  width: ${(props) => (props.isBig ? "50px" : "25px")};
  height: ${(props) => (props.isBig ? "50px" : "25px")};
  border: ${(props) => (props.isBig ? "10px" : "5px")} solid #f3f3f3; /* Light grey */
  border-top: ${(props) => (props.isBig ? "10px" : "5px")} solid #383636; /* Black */
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.3);
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 9999;
  position: fixed;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const inKeyFrame = keyframes`
  from {
    opacity: 0;
  }

  to {
    transform: 1;
  }
`;
