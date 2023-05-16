import { useState } from "react";
import { useEffect } from "react";
import api from "../../api";
import Header from "../../components/header";
import {
  CreatePost,
  FakeImage,
  FeedContainer,
  FilesButton,
  FilesContainer,
  FollowingContainer,
  ImageContainer,
  LikeButton,
  LikeCommentContainer,
  Likes,
  Post,
  PostsContainer,
  UserContainer,
} from "./style";
import "react-h5-audio-player/lib/styles.css";
import { AiFillLike, AiFillPicture, AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { RiFolderMusicFill, RiPlayCircleLine } from "react-icons/ri";
import PublishModal from "../../components/publishModal";
import InfiniteScroll from "../../components/infinityScroll";
import { useNavigate } from "react-router-dom";
import { Line, LoadingSpinner } from "../../globalStyle";

const FeedPage = ({ setPlaylist, playlist, setCurrentTrackIndex }) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [publishModal, setPublishModal] = useState(false);
  const [publishModalType, setPublishModalType] = useState("songs");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [followersLoading, setFollowersLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const likeDislike = (postId) => {
    api.post(`like/${postId}`, null, {
      headers: { Authorization: `token ${token}` },
    });

    const findPost = likedPosts.find((element) => element === postId);

    if (findPost) {
      const updatedLikedPosts = likedPosts.filter(
        (element) => element !== postId
      );
      setLikedPosts(updatedLikedPosts);
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  const loadPage = () => {
    api
      .get(`/feed/page/${page}`, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setPosts([...posts, ...res.data.results]);
        setPage(res.data.nextPage);
        setLikedPosts([
          ...likedPosts,
          ...res.data.results
            .filter((element) => element.liked)
            .map((element) => element.id),
        ]);
      })
      .then(() => {
        setLoading(false);
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
    const mediaQuery = window.matchMedia("(max-width: 1040px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    loadPage();

    api
      .get("/followers", {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUsers(res.data);
        setFollowersLoading(false);
      });

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <FeedContainer publishModal={publishModal}>
      <Header
        setPlaylist={setPlaylist}
        playlist={playlist}
        setCurrentTrackIndex={setCurrentTrackIndex}
      />
      {publishModal && (
        <PublishModal
          setPublishModal={setPublishModal}
          publishModalType={publishModalType}
          setPosts={setPosts}
        />
      )}

      {!isSmallScreen && (
        <FollowingContainer followersLoading={followersLoading}>
          {followersLoading ? (
            <LoadingSpinner isBig={true} />
          ) : (
            <>
              {!users[0] ? (
                <h2>Você não segue ninguém</h2>
              ) : (
                <>
                  <h2>Seguindo</h2>

                  {users.map((element) => {
                    if (element.name.length > 14) {
                      element.name = element.name.slice(0, 14) + "...";
                    }
                    return (
                      <UserContainer>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="user"
                          onClick={() => {
                            navigate(`/profile/${element.id}`);
                          }}
                        />
                        <h3>{element.name}</h3>
                      </UserContainer>
                    );
                  })}
                </>
              )}
            </>
          )}
        </FollowingContainer>
      )}

      <PostsContainer>
        <CreatePost followersLoading={followersLoading}>
          Criar:
          <FilesContainer>
            <FilesButton
              onClick={() => {
                setPublishModalType("images");
                setPublishModal(true);
                disableScroll();
              }}
            >
              <AiFillPicture size={25} />
              Imagem
            </FilesButton>
            <FilesButton
              onClick={() => {
                setPublishModalType("songs");
                setPublishModal(true);
                disableScroll();
              }}
            >
              <RiFolderMusicFill size={25} />
              Música
            </FilesButton>
          </FilesContainer>
        </CreatePost>
        {followersLoading ? (
          <LoadingSpinner isBig={true} />
        ) : (
          <>
            {posts.map((element) => {
              return (
                <Post key={element.id}>
                  <UserContainer>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="User"
                      onClick={() => {
                        navigate(`/profile/${element.user_id}`);
                      }}
                    />
                    <h3>{element.user.name}</h3>
                  </UserContainer>
                  <p>{element.text}</p>

                  {element.name.split(".")[
                    element.name.split(`.`).length - 1
                  ] === "mp3" ||
                  element.name.split(".")[
                    element.name.split(`.`).length - 1
                  ] === "mp4" ||
                  element.name.split(".")[
                    element.name.split(`.`).length - 1
                  ] === "mpeg" ? (
                    <FakeImage
                      onClick={(e) => {
                        setPlaylist([
                          { name: `song`, audio: e.currentTarget.id },
                        ]);
                        setCurrentTrackIndex(0);
                      }}
                      id={element.url}
                    >
                      <RiPlayCircleLine color="white" size={200} />
                    </FakeImage>
                  ) : (
                    <ImageContainer>
                      <img src={element.url} alt={element.name} />
                    </ImageContainer>
                  )}
                  <Likes>
                    <AiFillLike size={20} color="#191970" className="likes" />
                    <p>{`${element.likes}`}</p>
                  </Likes>

                  <LikeCommentContainer>
                    <LikeButton
                      onClick={() => {
                        likeDislike(element.id);
                      }}
                    >
                      {likedPosts.includes(element.id) ? (
                        <AiFillLike
                          size={30}
                          color="#191970"
                          className="liked"
                        />
                      ) : (
                        <AiOutlineLike size={30} color="#191970" />
                      )}
                    </LikeButton>
                    <button>
                      <GoCommentDiscussion size={30} color="#191970" />
                    </button>
                  </LikeCommentContainer>
                </Post>
              );
            })}
          </>
        )}
      </PostsContainer>
      <InfiniteScroll fetchMore={() => setLoading(true)} />
      {loading && <InfiniteScroll fetchMore={loadPage} />}
    </FeedContainer>
  );
};

export default FeedPage;
