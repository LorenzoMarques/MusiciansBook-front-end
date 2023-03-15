import {
  LoginRegisterForm,
  Line,
  StyledButton,
  Span,
  LoadingSpinner,
  LoadingContainer,
} from "../../globalStyle";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../api";
import { toast } from "react-toastify";
import { useState } from "react";

const RegisterForm = ({ setRegister }) => {
  const customId = "custom-id-yes";
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    name: yup.string().required("Nome obrigatório"),
    confirmPassword: yup
      .string()
      .required("Confirmação de senha obritatória")
      .oneOf([yup.ref("password"), null], "Senhas devem ser iguais"),
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
    api
      .post("/users", data)
      .then((res) => {
        setRegister(false);
        toast.success("Account created successfully");
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

      {errors.name && <Span>{errors.name.message}</Span>}
      <input type="text" placeholder="Nome e sobrenome" {...register("name")} />

      {errors.password && <Span>{errors.password.message}</Span>}
      <input type="password" placeholder="Senha" {...register("password")} />

      {errors.confirmPassword && <Span>{errors.confirmPassword.message}</Span>}
      <input
        type="password"
        placeholder="Confirmar senha"
        {...register("confirmPassword")}
      />

      <Line></Line>
      <a href="/">Já possui uma conta?</a>

      <StyledButton type="submit" isBig={true}>
        Criar nova conta
      </StyledButton>
    </LoginRegisterForm>
  );
};

export default RegisterForm;
