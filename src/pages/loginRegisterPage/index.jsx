import { useState } from "react";
import RegisterForm from "../../components/registerForm";
import { LoginRegisterContainer, Logo, LogoContainer } from "./style";
import LoginForm from "../../components/loginForm";

const LoginRegisterPage = () => {
  const [resgister, setRegister] = useState(false);

  return (
    <>
      <LogoContainer>
        <Logo className="outside h2">MusiciansBook</Logo>
        <p className="outside p">
          O MusiciansBook ajuda você a acompanhar os músicos que fazem parte da
          sua vida.
        </p>
      </LogoContainer>
      <LoginRegisterContainer>
        <LogoContainer>
          <Logo className="inside">MusiciansBook</Logo>
        </LogoContainer>

        {!resgister ? (
          <LoginForm setRegister={setRegister} />
        ) : (
          <RegisterForm setRegister={setRegister} />
        )}
      </LoginRegisterContainer>
    </>
  );
};

export default LoginRegisterPage;
