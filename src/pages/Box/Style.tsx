import { Layout } from "antd";
import styled from "styled-components";
import BoxBG from "@img/box-bg.png";
import  pageinputBG from "@img/page-input-bg.png"

export default styled(Layout)`
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 6.25rem;
  @media only screen and (max-width: 768px) {
    overflow-x: hidden;
  }
  .back {
    height: 61.875rem;
    background-image: url(${BoxBG});
    background-size: auto 100%;
    background-position: center;
    > video {
      height: 61.875rem;
    }
  }
  > img {
    position: absolute;
    top: 20rem;
    height: 16rem;
    @media only screen and (max-width: 768px) {
      height: unset;
      width: 90%;
      top: 24rem;
    }
  }
  .tips {
    position: absolute;
    top: 45.5rem;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: #ffffff;
    display: flex;
    justify-content: center;

    z-index:999;
    .label {
      opacity: 0.5;
    }
    .value {
      margin-left: 0.375rem;
    }
  }
  .button {
    position: absolute;
    top: 48.8125rem;
    width: 10.5rem;
    z-index:999;
  }
`;

export const ModalBody = styled.div`
  text-align: center;
  padding: 0.125rem 0 0.5625rem 0;
  .tip {
    padding: 1rem 0 1.875rem 0;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: #ffffff;
  }
  .button {
    display: inline-block;
    width: 10.5rem;
    > div {
      margin-top: 0.625rem;
    }
  }
  .selectOpenAmount-title{
    color:#fff;
    
  }
  .selectOpenAmount{
    margin:43px 0 10px 0;
    display:flex;
    color:#fff;
    align-items:center;
    justify-content: center;
    .pagination-button{
      margin:0 20px;
          cursor: pointer;
    }
    input{
      background-image:url(${pageinputBG});
          background-size: 100% 100%;
    }
  }

  .buyButton{
    width:130px;
    margin:20px auto 0 auto ;

  }
  
`;
