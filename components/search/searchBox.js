import { Input } from "reactstrap";

const SearchBox = () => {
  return (
    <>
      <div class="search-box">
        <button class="btn-search">
          <i class="fas fa-search"></i>
        </button>
        <Input type="text" className="input-search" placeholder="Type to Search..."/>
      </div>
    </>
  );
};

export default SearchBox;
