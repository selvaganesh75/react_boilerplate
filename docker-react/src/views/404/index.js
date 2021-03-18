import React, { Component } from "react";
import { Row } from "antd";
import { withRouter } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <div
          className="justify-content-center align-items-center d-flex flex-column"
          style={{ height: "100vh" }}
        >
          <div
            className="text-white mb-3"
            style={{
              lineHeight: 1.5,
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Page Not Found...
          </div>

          <a
            target="_self"
            className="btn btn-default p-2 text-white"
            style={{ fontSize: "13px", fontWeight: "bold" }}
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/login");
            }}
          >
            Home
          </a>
        </div>
      </Row>
    </div>
  );
};

export default withRouter(NotFound);
