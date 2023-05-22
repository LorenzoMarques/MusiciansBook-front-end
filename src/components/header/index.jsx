import { HeaderContainer, InputContainer, Nav, User } from "./style";
import { useState, useEffect, useRef } from "react";
import { NavToggle } from "./style";
import { MdLegendToggle, MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SearchModal from "../searchModal";
import img from "../../assets/logo2.png";
import api from "../../api";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../store/features/userInfo/userInfoSlice";
import apiJamendo from "../../api/apiJamento";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiRadio } from "react-icons/hi2";
import { IoExit } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

const Header = ({ setPlaylist, playlist, setCurrentTrackIndex }) => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const modalRef = useRef();
  const id = localStorage.getItem("id");

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const getSongsRadio = () => {
    apiJamendo
      .get(
        `/v3.0/tracks/?client_id=${process.env.REACT_APP_CLIENT_ID}&format=json&limit=10&fuzzytags=groove+rock&speed=high+veryhigh&include=musicinfo&groupby=artist_id`
      )
      .then((res) => {
        setPlaylist([
          ...res.data.results.filter((element) => element.audio !== ``),
        ]);

        setCurrentTrackIndex(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const search = () => {
    api
      .post(
        `users/search/${searchPage}`,
        {
          searchValue: searchValue,
        },
        {
          headers: {
            authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setSearchItems([...searchItems, ...res.data.results]);
        setSearchPage(res.data.nextPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [name]);

  useEffect(() => {
    setSearchPage(1);
    setSearchItems([]);
    setTimeout(() => {
      search();
    }, 1000);
  }, [searchValue]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    const handleClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    dispatch(fetchUserInfo({ id: id, token: token }));
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
      setNavVisibility(false);
    } else {
      setIsSmallScreen(false);
      setNavVisibility(true);
    }
  };
  return (
    <HeaderContainer>
      <Link to={"/feed"} className="teste">
        <img src={img} alt="MB" />
      </Link>

      {isSmallScreen && (
        <NavToggle onClick={toggleNav}>
          <MdLegendToggle color="white" size="35" />
        </NavToggle>
      )}

      {isNavVisible && (
        <Nav>
          <InputContainer ref={modalRef}>
            {isSmallScreen ? (
              <MdSearch
                size={25}
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onFocus={() => {
                    setOpenModal(true);
                  }}
                />
              </>
            )}

            {openModal && (
              <SearchModal
                setOpenModal={setOpenModal}
                users={searchItems}
                search={search}
                searchPage={searchPage}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            )}
          </InputContainer>
          <Link to="/feed" className="link">
            <AiFillHome className="icon" size={20} />
            {isSmallScreen && `Página Inicial`}
          </Link>
          <Link to="/chat" className="link">
            {<BsFillChatDotsFill className="icon" size={20} />}
            {isSmallScreen && `Mensagens`}
          </Link>

          <button onClick={getSongsRadio} className="link">
            <HiRadio className="icon" size={20} />
            {isSmallScreen && `Rádio`}
          </button>

          <a
            href="/"
            className="link"
            onClick={() => {
              localStorage.clear();
            }}
          >
            <IoExit className="icon" size={20} />
            {isSmallScreen && `Sair`}
          </a>
          <User
            onClick={() => {
              navigate(`/profile/${id}`);
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="#"
            />
            <h3>{name}</h3>
          </User>
        </Nav>
      )}
    </HeaderContainer>
  );
};

export default Header;
