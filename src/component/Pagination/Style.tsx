import styled from "styled-components";

import pageNext from "@img/page-next.png";
import pagePrev from "@img/page-prev.png";
import  pageinputBG from "@img/page-input-bg.png"
export default styled.div`
  height: 2.5rem;
  svg {
    height: 1.125rem;
  }
  display:flex;
  align-items:center;
  justify-content:center;
  .pagination-button {
    display: inline-block;
    width:42px;
    height:42px;
    margin: 0 1.25rem;
  }
  .pagination-input {
    display: inline-block;
    width: 12.5rem;
  }
  input{
    background-image:url(${pageinputBG});
    background-size:100% 100%;
    width:10rem;
  }
  .pagination-total {
    margin-left: 1.25rem;
    @media only screen and (max-width: 768px) {
      margin-left: 0rem;
    }
  }

  .next-page{
    background-image:url(${pageNext});
    background-size:100% 100%;
  }
  .prev-page{
    background-image:url(${pagePrev});
    background-size:100% 100%;

  }
`;
