import styled from "styled-components";

export default styled.div`
  .login {
    /* margin-right: 3.125rem; */
  }

  .link-success{
    display: inline-block;
    width: 11rem;
    text-align: center;
  }
  .link-menu{
    width:16.5rem;
    display:inline-block;
    text-align:center;
    margin-top:2.2rem;
    color:#fff;
    @media only screen and (max-width: 768px) {
      width:auto;
    margin-top:0;
    }
  }
  .line{
    height:1px;
    background:#8c443c;
    width:70%;
    margin:0 auto;
  }
  .account {
    position: relative;
    font-family: ArialMT;
    font-size: 0.875rem;
    color: rgba(255,255,255,1);
    margin-top:2.5rem;
    @media only screen and (max-width: 768px) {
      margin-top:0;
    }
    .address-text{
      line-height:1.9rem;
    }
    .txt-img{
      display:flex;
      justify-content:center;
      align-items:center;
      line-height: 1.5rem;
    }
    .txt-img>img {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      // vertical-align: middle;
      margin-right: 0.3125rem;
      @media only screen and (max-width: 768px) {
        width: 1rem;
        height: 1rem;
      }
    }
    .txt-extra {
      position: absolute;
      width: 100%;
      background-color: rgba(0,0,0,0.3);
      transform-origin: top;
      transform: scaleY(0);
      transition: transform 0.3s ease-out;
      text-align: center;
      margin-top: -5px;
      right:0

      .menu-txt-label {

        background:rgba(0,0,0,0.3);
        &:hover {
          // background-color: #301c1c;
        }
        .menu-txt {
          color:#fff;
          line-height: 6.25rem;
          // &:hover {
          //   color: white;
          // }
        }
      }

      .txt {
        line-height: 3.75rem;
        // &:hover {
        //   background-color: #301c1c;
        // }
      }
    }
    &:hover {
      .txt-extra {
        transform: scaleY(1);
      }
    }
  }
`;

export const ModalBody = styled.div`
  padding: 0 1.25rem;
  @media only screen and (max-width: 768px) {
    padding: 0 0.25rem;
  }
  .title {
    width: 100%;
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    padding-bottom: 2.5rem;
    border-bottom: 0.0625rem solid #362828;
  }
  .content {
    padding: 2.5rem 0.3125rem 1rem 0.3125rem;
    display: flex;
    justify-content: space-between;
    .connect {
      /* width: 6.25rem; */
      flex: 1;
      height: 6.25rem;
      border-radius: 0.625rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:hover {
        border: 0.0625rem solid #574444;
        background: linear-gradient(180deg, #12090a, #281b18, #1b1110);
      }
      .connect-icon {
        flex-grow: 1;
        display: flex;
        align-items: center;
        > img {
          width: 2rem;
        }
      }
      .connect-title {
        font-size: 0.875rem;
        color: #ffffff;
        padding-bottom: 0.9375rem;
      }
    }
  }
`;
