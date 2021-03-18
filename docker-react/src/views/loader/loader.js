import React from "react";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import "./loader.scss";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const parent = css``;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading loader-container d-flex align-items-center justify-content-center flex-direction-column">
        <div
          style={{ position: "absolute", color: "#fff", textAlign: "center" }}
        >
          {" "}
          {this.props.children}{" "}
        </div>
        <RingLoader
          css={override}
          size={150}
          color={"#fff"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

Loader.defaultProps = {
  children: "Loading...",
};

export default Loader;
