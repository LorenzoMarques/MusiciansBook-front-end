import {
  Background,
  InputFileContainer,
  Line,
  ModalHeader,
  PublishButton,
  PublishModalContainer,
  StyledInput,
  TextAreaContainer,
  UserContainer,
} from "./style";
import { GrClose } from "react-icons/gr";
import { FilesButton, FilesContainer } from "../../pages/feed/style";
import { AiFillPicture } from "react-icons/ai";
import { RiFolderMusicFill } from "react-icons/ri";
import { useState } from "react";
import api from "../../api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PublishModal = ({ setPublishModal, publishModalType }) => {
  const customId = "custom-id-yes";
  const [transition, setTrantision] = useState(false);
  const { name } = useSelector((state) => state.userInfo);

  const enableScroll = () => {
    window.onscroll = function () {};
  };

  const schema = yup.object().shape({
    file: yup.mixed().required("Arquivo obrigatório"),
    text: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    if (publishModalType === "images") {
      data = {
        image: data.file[0],
        imagestype_id: 2,
        text: data.text,
      };
    } else {
      data = {
        song: data.file[0],
        text: data.text,
      };
    }

    api
      .post(`${publishModalType}`, data, {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setPublishModal(false);
        enableScroll();
        toast.success(res.data.message);
        document.location.reload();
      })
      .catch((err) => {
        toast.error(err.message, {
          toastId: customId,
        });
      });
  };

  return (
    <Background>
      <PublishModalContainer
        onSubmit={handleSubmit(submit)}
        transition={transition}
      >
        <ModalHeader>
          <h3>Criar publicação</h3>
          <button
            type="button"
            onClick={() => {
              setTrantision(true);
              setTimeout(() => {
                enableScroll();
                setPublishModal(false);
              }, 200);
            }}
          >
            <GrClose size={25} />
          </button>
        </ModalHeader>

        <Line></Line>

        <UserContainer>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user"
          />
          <h3>{name}</h3>
        </UserContainer>

        <TextAreaContainer
          placeholder="Escreva algo aqui!"
          {...register("text")}
        />

        <FilesContainer>
          {publishModalType === "songs" ? (
            <FilesButton
              type="button"
              onClick={() => {
                toast.warning(
                  "Você não pode enviar uma imagem de capa no momento",
                  {
                    toastId: customId,
                  }
                );
              }}
            >
              <AiFillPicture size={25} />
              Imagem de capa
            </FilesButton>
          ) : (
            <InputFileContainer>
              <label for="arquivo">
                <AiFillPicture size={25} />
                Imagem
              </label>
              <StyledInput
                type="file"
                name="arquivo"
                id="arquivo"
                {...register("file")}
              />
            </InputFileContainer>
          )}

          {publishModalType === "songs" && (
            <InputFileContainer>
              <label for="arquivo">
                <RiFolderMusicFill size={25} />
                Música
              </label>
              <StyledInput
                type="file"
                name="arquivo"
                id="arquivo"
                {...register("file")}
              />
            </InputFileContainer>
          )}

          <PublishButton>Publicar</PublishButton>
        </FilesContainer>
      </PublishModalContainer>
    </Background>
  );
};

export default PublishModal;
