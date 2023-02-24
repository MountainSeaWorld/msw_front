import styled from "styled-components";

export default styled.div<{ backImg: string; type?: "number" }>`
  width: ${(props) => (props.type ? "" : "100%")};
  height: 36px;
  line-height: 36px;
  background:#130202;
  background-size: 100% 100%;
  @media only screen and (min-width: 1440px) {
    padding: 0 1rem;
  }
  input {
    text-align: ${(props) => (props.type ? "center" : "")};
    color: #6c6666;
  }
  input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6c6666;
    opacity:1;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #6c6666;
  }

  input::-ms-input-placeholder { /* Microsoft Edge */
    color: #6c6666;
  }
`;
