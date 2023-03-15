import { useNavigate } from "react-router-dom";
import { Modal, Line, User, InputContainer, SearchButton } from "./style";

const SearchModal = ({
  setOpenModal,
  users = [],
  search,
  searchPage,
  searchValue,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  return (
    <Modal>
      <InputContainer>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </button>
      </InputContainer>

      <Line></Line>

      {users.map((element) => (
        <User
          key={element.id}
          onClick={() => {
            navigate(`/profile/${element.id}`);
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="#"
          />
          <p>{element.name}</p>
        </User>
      ))}

      {searchPage && (
        <SearchButton
          onClick={() => {
            search();
          }}
        >
          {searchPage !== 1 && `Ver mais`}
        </SearchButton>
      )}
    </Modal>
  );
};

export default SearchModal;
