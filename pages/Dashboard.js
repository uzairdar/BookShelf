import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBooks } from "./services/bookService";
import { useRouter } from "next/router";
import AddBooks from "./Components/AddBooks";
import { Row, Col, Button, Input } from "reactstrap";
import Cards from "./Components/Cards";
import CardContainer from "./Components/CardContainer";
import { loadUser, logoutSuccess, loadBook } from "./redux/ActionCreators";
function Dashboard(props) {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState(false);
  const { user, getUser } = props;
  useEffect(() => {
    getBooks(user?._id)
      .then((response) => {
        if (response?.data) {
          setBooks(response.data.books);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [user, check]);
  useEffect(() => {
    if (!user) {
      router.push("/LandingPage");
    } else {
      setBooks(props.bookData);
    }
  }, [props]);
  const sort = () => {
    var byTitle = books.slice(0);
    byTitle.sort(function (a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    setBooks(byTitle);
  };
  const searchTitle = (e) => {
    setSearch(e.target.value);
    setSearchBooks(
      books.filter((c) => {
        if (c.title.toLowerCase().includes(search.toLowerCase())) {
          return c;
        }
      })
    );
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
        }}
      >
        <Button color="primary" onClick={() => sort()}>
          Sort
        </Button>
        <Input
          value={search}
          type="text"
          style={{ width: "50%" }}
          onChange={(e) => searchTitle(e)}
        />
        <Button color="danger" onClick={() => {}}>
          Delete account
        </Button>
        <Button color="primary" onClick={() => props.logout()}>
          Logout
        </Button>
      </div>
      {search == "" ? (
        <>
          <CardContainer category="plan" books={books} />
          <CardContainer category="reading" books={books} />
          <CardContainer category="complete" books={books} />
        </>
      ) : (
        <CardContainer searchbar={true} category="plan" books={searchBooks} />
      )}
      <center className="mb-3">
        <AddBooks />
      </center>
    </div>
  );
}

const mapStateToProps = (state) => {
  //   console.log("state", state);
  const { user, bookData } = state;
  return { user, bookData };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (user) => dispatch(setUser(user)),
    logout: () => dispatch(logoutSuccess()),
    getUser: () => dispatch(loadUser()),
    loadBooks: (id) => dispatch(loadBook(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
