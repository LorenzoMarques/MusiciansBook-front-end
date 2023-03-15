import { useEffect } from "react";
import { useState } from "react";
import api from "../../api";
import {
  Chat,
  ChatInputContainer,
  ChatMessages,
  ChatMessagesHeader,
  ChatPageContainer,
  Contacts,
  ContactsHeader,
  InputContainer,
  MyMessages,
  TextContainer,
  UserContainer,
  YourMessages,
} from "./style";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { io } from "socket.io-client";
import Header from "../../components/header/index";
import {
  AiOutlineCloseCircle,
  AiOutlineSearch,
  AiOutlineSend,
} from "react-icons/ai";
import { LoadingSpinner } from "../../globalStyle";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const [userId, setUserID] = useState();
  const [message, setMessage] = useState("");
  const [socket] = useState(() =>
    io.connect("https://musiciansbook-deploy.onrender.com")
  );
  const [isHidden, setIsHidden] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oldMessagesLoading, setOldMessagesLoading] = useState(false);
  const [username, setUsername] = useState(``);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const scrollDown = () => {
    const element = window.document.getElementById("scroll");
    element.scrollTop = element.scrollHeight;
  };

  const newUser = async (data) => {
    await socket.emit("newUser", data);
  };

  const leave = async (data) => {
    await socket.emit("leave", data);
  };

  const schema = yup.object().shape({
    text: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    if (message !== "") {
      api
        .post(`chats/${userId}`, data, {
          headers: {
            authorization: `token ${token}`,
          },
        })
        .then((res) => {
          socket.emit("send_message", {
            text: message,
            from: id,
            id: res.data.id,
            to: userId,
          });
          setMessages([
            ...messages,
            { from: id, text: message, id: res.data.id, to: userId },
          ]);
          setTimeout(() => {
            scrollDown();
            setMessage("");
          }, 1);
        })
        .then(() => {});
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
    leave(id);
    newUser(id);
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
      .get("/followers", {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      });
  }, []);

  const getMessages = () => {
    socket.on("private_message", (data) => {
      setMessages((prev) => [...prev, data]);
      setTimeout(() => {
        scrollDown();
      }, 1);
    });
  };

  useEffect(() => {
    getMessages();
  }, [socket]);

  useEffect(() => {
    setOldMessagesLoading(true);
    api.get(`users/${id}`, {
      headers: {
        authorization: `token ${token}`,
      },
    });
    api
      .get(`chats/${userId}`, {
        headers: {
          authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setOldMessagesLoading(false);
        setOldMessages(res.data);
      })
      .then(() => {
        setTimeout(() => {
          scrollDown();
        }, 1);
      });
  }, [userId]);

  return (
    <ChatPageContainer>
      <Header />
      <Contacts>
        <ContactsHeader>
          <h3>Contatos</h3>
        </ContactsHeader>

        <InputContainer loading={loading}>
          <AiOutlineSearch size={25} />
          <input type="text" placeholder="Pesquisar" />
        </InputContainer>

        {loading && <LoadingSpinner isBig={true} />}

        {users.map((element) => (
          <UserContainer
            key={element.id}
            onClick={() => {
              setUserID(element.id);
              setIsHidden(false);
              newUser(id);
              setUsername(users.find((user) => user.id === element.id).name);
            }}
            className={userId === element.id && `currentUserChat`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
            />
            <h3>{element.name}</h3>
          </UserContainer>
        ))}
      </Contacts>

      <Chat onSubmit={handleSubmit(submit)} isHidden={isHidden}>
        <ChatMessages id="scroll">
          <ChatMessagesHeader>
            <button
              type="button"
              onClick={() => {
                setIsHidden(true);
                setUserID();
              }}
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <p>{username}</p>
          </ChatMessagesHeader>

          {oldMessagesLoading ? (
            <LoadingSpinner className="oldMessagesLoading" isBig={true} />
          ) : (
            <>
              {oldMessages.map((element) => {
                if (element.from === id) {
                  return (
                    <MyMessages key={element.id}>
                      <TextContainer>
                        <p className="me">{element.text}</p>
                      </TextContainer>
                    </MyMessages>
                  );
                } else {
                  return (
                    <YourMessages key={element.id}>
                      <TextContainer>
                        <p className="you">{element.text}</p>
                      </TextContainer>
                    </YourMessages>
                  );
                }
              })}
            </>
          )}

          {messages.map((element) => {
            if (element.from === userId || element.to === userId) {
              if (element.from === id) {
                return (
                  <MyMessages key={element.id}>
                    <TextContainer>
                      <p className="me">{element.text}</p>
                    </TextContainer>
                  </MyMessages>
                );
              } else {
                return (
                  <YourMessages key={element.id}>
                    <TextContainer>
                      <p className="you">{element.text}</p>
                    </TextContainer>
                  </YourMessages>
                );
              }
            }
          })}
        </ChatMessages>
        <ChatInputContainer>
          <input
            type="text"
            {...register("text")}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />

          <button>
            <AiOutlineSend size={25} />
          </button>
        </ChatInputContainer>
      </Chat>
    </ChatPageContainer>
  );
};

export default ChatPage;
