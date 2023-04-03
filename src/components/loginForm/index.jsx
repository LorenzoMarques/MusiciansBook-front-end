import { useNavigate } from "react-router-dom";
import {
  LoginRegisterForm,
  Line,
  StyledButton,
  Span,
  LoadingContainer,
  LoadingSpinner,
} from "../../globalStyle";
import { ButtonCotainer } from "../../pages/loginRegisterPage/style";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../api";
import { toast } from "react-toastify";
import { useState } from "react";

const LoginForm = ({ setRegister }) => {
  const customId = "custom-id-yes";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    setLoading(true);
    console.log(process.env.REACT_APP_RENDER_URL);
    api
      .post("/users/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
      })
      .then((res) => {
        navigate("/feed");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message, {
          toastId: customId,
        });
      });
  };

  return (
    <LoginRegisterForm onSubmit={handleSubmit(submit)}>
      {loading && (
        <LoadingContainer>
          <LoadingSpinner isBig={true} />
        </LoadingContainer>
      )}

      {errors.email && <Span>{errors.email.message}</Span>}
      <input type="text" placeholder="Email" {...register("email")} />
      {errors.password && <Span>{errors.password.message}</Span>}

      <input type="password" placeholder="Senha" {...register("password")} />

      <StyledButton isBig={true} type="submit">
        Entrar
      </StyledButton>

      <a href="/">Esqueceu a senha?</a>

      <Line></Line>
      <ButtonCotainer>
        <StyledButton
          onClick={() => {
            setRegister(true);
          }}
        >
          Criar nova conta
        </StyledButton>
      </ButtonCotainer>
    </LoginRegisterForm>
  );
};

export default LoginForm;
