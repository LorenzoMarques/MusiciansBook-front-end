import styled from "styled-components";

export const LoginRegisterContainer = styled.div`
  background-color: var(--color-grey9);
  width: 90vw;
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 800px) {
    max-width: 350px;
    margin-top: 0px;
    position: absolute;
    right: 10%;
    top: 15%;
  }
`;

export const Logo = styled.h2`
  font-family: "Marcellus";
  font-style: normal;
  font-weight: 400;
  font-size: 45px;
  line-height: 38px;
  color: var(--color-brand2);
  margin-top: 25px;
  margin-bottom: 50px;
`;

export const ButtonCotainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  @media (min-width: 800px) {
    position: absolute;
    top: 18%;
    left: 10%;

    .inside {
      visibility: hidden;
      width: 0px;
      height: 0px;
      margin-bottom: 0px;
    }
    .h2 {
    }
    .p {
      width: 70%;

      @media (max-width: 934px) {
        width: 45%;
      }
    }
  }

  @media (max-width: 799px) {
    .outside {
      visibility: hidden;
      width: 0px;
      height: 0px;
      margin-bottom: 0px;
    }
  }
`;
