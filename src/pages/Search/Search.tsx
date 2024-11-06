import { useState } from "react";
import { useAuth } from "../../AuthProvider";

import * as S from "./Search.style";
import SearchSong from "./SearchSong";

function Search() {
  const { isLoggedIn, nickname, logout, uid } = useAuth();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  const closeSearchPopup = () => {
    setIsSearchPopupOpen(false);
  };

  return (
    <S.SearchContainer>
      <S.SearchBtn onClick={() => setIsSearchPopupOpen(true)}>
        search
      </S.SearchBtn>
      {isSearchPopupOpen && (
        <SearchSong
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={closeSearchPopup}
        />
      )}
    </S.SearchContainer>
  );
}

export default Search;
