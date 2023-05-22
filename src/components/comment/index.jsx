import api from "../../api";
import {
  Comment,
  CommentContainerModal,
  CommentsContainer,
  CommentsContainerHeader,
  ReadComment,
  ToComment,
} from "./style";
import { useState } from "react";
import InfiniteScroll from "../infinityScroll/index";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Background } from "../../globalStyle";
import { GrClose } from "react-icons/gr";

const CommentsModal = ({ postId, setPostId }) => {
  const token = localStorage.getItem("token");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [showFullComments, setShowFullComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transition, setTrantision] = useState(false);

  const schema = yup.object().shape({
    comment: yup
      .string()
      .required("Não é possivel enviar um comentário sem nenhum texto"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    api
      .post(`/comments/${postId}`, data, {
        headers: { Authorization: `token ${token}` },
      })
      .then(() => {
        fetchMoreComments(true);
        reset();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const toggleComment = (commentId) => {
    setShowFullComments((prevShowFullComments) => {
      const updatedShowFullComments = [...prevShowFullComments];
      updatedShowFullComments[commentId] = !prevShowFullComments[commentId];
      return updatedShowFullComments;
    });
  };

  const fetchMoreComments = (reset = false) => {
    const nextPage = reset ? 1 : page;

    api
      .get(`/comments/${postId}/${nextPage}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        if (nextPage) {
          if (reset) {
            setComments(res.data.results);
            setShowFullComments(Array(res.data.results.length).fill(false));
          } else {
            setComments([...comments, ...res.data.results]);
            setShowFullComments([
              ...showFullComments,
              ...Array(res.data.results.length).fill(false),
            ]);
          }
          setPage(res.data.nextPage);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Background>
      <CommentContainerModal transition={transition}>
        <CommentsContainerHeader>
          <h3>Comentários</h3>
          <button
            onClick={() => {
              setTrantision(true);
              setTimeout(() => {
                setPostId();
              }, 200);
            }}
          >
            <GrClose size={20} />
          </button>
        </CommentsContainerHeader>
        <CommentsContainer>
          {comments.map((element, index) => (
            <Comment key={index}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
              />
              <div>
                <h5>{element.user && element.user.name}</h5>

                <p>
                  {element.comment.length > 100 && !showFullComments[index]
                    ? `${element.comment.substring(0, 100)}...`
                    : element.comment}
                  {element.comment.length > 100 && (
                    <ReadComment
                      onClick={() => {
                        toggleComment(index);
                      }}
                    >
                      {showFullComments[index] ? "Ler Menos" : "Ler Mais"}
                    </ReadComment>
                  )}
                </p>
              </div>
            </Comment>
          ))}
          <InfiniteScroll
            fetchMore={() => {
              setLoading(true);
            }}
          />
          {loading && <InfiniteScroll fetchMore={fetchMoreComments} />}{" "}
        </CommentsContainer>

        <ToComment>
          <form onSubmit={handleSubmit(submit)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Escreva um comentário..."
              {...register("comment")}
            ></textarea>
            <button>Publicar</button>
          </form>
        </ToComment>
      </CommentContainerModal>
    </Background>
  );
};

export default CommentsModal;
