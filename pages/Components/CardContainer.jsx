import React from "react";
import { Row, Col } from "reactstrap";
import Cards from "./Cards";
function CardContainer(props) {
  const { books, category, searchbar } = props;
  const title =
    category === "plan"
      ? "Plan to read"
      : category === "reading"
      ? "Reading"
      : category === "complete"
      ? "Completed"
      : "";
  return (
    <div>
      {!searchbar ? (
        <center className="mt-2">
          <h2>{title}</h2>
        </center>
      ) : (
        <center className="mt-2">
          <h2>Results</h2>
        </center>
      )}
      <Row style={{ display: "flex", justifyContent: "center" }}>
        
        {!searchbar
          ? books
              ?.filter((filterbook) => filterbook.status === category)
              .map((book) => (
                <Col
                  style={{
                    minWidth: "300px",
                    maxWidth: "300px",
                  }}
                  xxs="1"
                  xs="1"
                  sm="2"
                  md="2"
                  lg="4"
                  xl="4"
                  xxl="4"
                >
                  <Cards book={book} />
                </Col>
              ))
          : books.map((book) => (
              <Col
                style={{
                  minWidth: "300px",
                  maxWidth: "300px",
                }}
                xxs="1"
                xs="1"
                sm="2"
                md="2"
                lg="4"
                xl="4"
                xxl="4"
              >
                <Cards book={book} />
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default CardContainer;
