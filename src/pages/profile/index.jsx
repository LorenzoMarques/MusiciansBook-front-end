import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Header from "../../components/header";

import {
  ProfileContainer,
  User,
  Info,
  Posts,
  Card,
  UserInfo,
  Sp,
  StyledSongButton,
  StyledImageButton,
  StyledMessage,
  ModalContainer,
  ModalHeader,
  StyledButton,
  ButtonsContainer,
} from "./style";
import { toast } from "react-toastify";
import { Background } from "../../components/publishModal/style";
import { Line } from "../../components/publishModal/style";
import { GrClose } from "react-icons/gr";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ProfilePage = ({ setPlaylist, playlist, setCurrentTrackIndex }) => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    user: {
      id: "",
      name: "",
      email: "",
    },
    followers: 1,
    images: [],
    songs: [],
  });
  const [songsOrImages, setSongsOrImages] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const customId = "custom-id-yes";
  const [transition, setTrantision] = useState(false);
  const navigate = useNavigate();

  const enableScroll = () => {
    window.onscroll = function () {};
  };

  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("Email inválido"),
    password: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    console.log(data);
    api
      .patch(`/users/${id}`, data, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message, {
          toastId: customId,
        });
        navigate(`/`);
      })
      .catch((err) => {
        toast.error(err.message, {
          toastId: customId,
        });
      });
  };

  const followUser = (id) => {
    api
      .post(
        `/followers/${id}`,
        {},
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setIsFollowing(true);
        toast.success(`Agora você segue ${userInfo.user.name}`, {
          toastId: customId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollow = (id) => {
    console.log(id);
    api
      .delete(`/followers/${id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setIsFollowing(false);
        toast.success(`Você deixou de seguir ${userInfo.user.name}`, {
          toastId: customId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
    api
      .get("/users/validate", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then()
      .catch((err) => {
        window.location.href = "/";
      });

    api
      .get(`followers/${id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(() => {
        setIsFollowing(true);
      });
    api
      .get(`/users/posts/${id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <ProfileContainer>
      {isModalOpen && (
        <Background>
          <ModalContainer
            transition={transition}
            onSubmit={handleSubmit(submit)}
          >
            <ModalHeader>
              <h3>Atualizar perfil</h3>
              <button
                type="button"
                onClick={() => {
                  setTrantision(true);
                  setTimeout(() => {
                    setIsModalOpen(false);
                    enableScroll();
                  }, 200);
                }}
              >
                <GrClose size={25} />
              </button>
            </ModalHeader>
            <Line></Line>

            <input type="text" placeholder="Email" {...register("email")} />
            <input type="text" placeholder="Name" {...register("name")} />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <ButtonsContainer>
              <StyledButton
                onClick={() => {
                  enableScroll();
                }}
              >
                Atualizar
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() => {
                  setTrantision(true);
                  setTimeout(() => {
                    setIsModalOpen(false);
                    enableScroll();
                  }, 200);
                }}
              >
                Cancelar
              </StyledButton>
            </ButtonsContainer>
          </ModalContainer>
        </Background>
      )}
      <Header
        setPlaylist={setPlaylist}
        playlist={playlist}
        setCurrentTrackIndex={setCurrentTrackIndex}
      />
      <User>
        <img
          src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="#"
        />
        <UserInfo>
          <div>
            <h3>{userInfo.user && userInfo.user.name}</h3>
            {userInfo.user.id === userId ? (
              <button
                onClick={() => {
                  setTrantision(false);
                  setIsModalOpen(true);
                  disableScroll();
                }}
              >
                Editar perfil
              </button>
            ) : (
              <>
                {isFollowing ? (
                  <button
                    onClick={() => {
                      unfollow(userInfo.user.id);
                    }}
                  >
                    Deixar de seguir
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      followUser(userInfo.user.id);
                    }}
                  >
                    Seguir
                  </button>
                )}
              </>
            )}
          </div>

          <div className="songs-fans">
            <h3>{userInfo.songs && `${userInfo.songs.length} Músicas`}</h3>
            <h3>{userInfo.followers && `${userInfo.followers}`} Fans</h3>
          </div>
        </UserInfo>
      </User>
      <Info>
        <h3>{userInfo.songs && `${userInfo.songs.length} Músicas`}</h3>
        <h3>{userInfo.followers && `${userInfo.followers} Fans`}</h3>
      </Info>
      <Sp>
        <StyledSongButton
          songsOrImages={songsOrImages}
          onClick={() => {
            setSongsOrImages(false);
          }}
        >
          Músicas
        </StyledSongButton>
        <StyledImageButton
          songsOrImages={songsOrImages}
          onClick={() => {
            setSongsOrImages(true);
          }}
        >
          Fotos
        </StyledImageButton>
      </Sp>
      <Posts>
        {!songsOrImages ? (
          <>
            {!userInfo.songs[0] ? (
              <StyledMessage>
                Este usuário não possui nenhuma música
              </StyledMessage>
            ) : (
              userInfo.songs.map((element) => (
                <Card
                  onClick={(e) => {
                    setPlaylist([{ name: `song`, audio: e.currentTarget.id }]);
                    setCurrentTrackIndex(0);
                  }}
                  id={element.url}
                >
                  <img
                    src="https://www.apaulista.org.br/wp-content/uploads/2020/02/play-button.png"
                    alt=""
                  />
                </Card>
              ))
            )}
          </>
        ) : (
          <>
            {!userInfo.images[0] ? (
              <StyledMessage>
                Este usuário não possui nenhuma imagem
              </StyledMessage>
            ) : (
              userInfo.images.map((element) => (
                <Card
                  onClick={() => {
                    window.location.href = element.url;
                  }}
                >
                  <img src={element.url} alt="" />
                </Card>
              ))
            )}
          </>
        )}
      </Posts>
      {/* {song && (
        <AudioContainer isHidden={isHidden}>
          <button
            onClick={() => {
              setIsHidden(!isHidden);
              console.log(isHidden);
            }}
          >
            {!isHidden ? (
              <BsChevronDoubleDown size={25} color={"var(--color-grey2)"} />
            ) : (
              <BsChevronDoubleUp size={25} color={"var(--color-grey2)"} />
            )}
          </button>

          <AudioPlayer
            autoPlay
            src={song}
            onPlay={(e) => console.log("onPlay")}
          />
        </AudioContainer>
      )} */}
    </ProfileContainer>
  );
};

export default ProfilePage;
