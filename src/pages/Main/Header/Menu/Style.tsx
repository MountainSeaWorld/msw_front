import styled from "styled-components";
import MenuMiddleOff from "@img/menu-middle-off.png";
import MenuMiddleOn from "@img/menu-middle-on.png";

export default styled.div`
  display: flex;
  align-items:center;

  .menu-item {
    margin:0 1.8rem;
    text-align: center;
    background-size: 100% 100%;
    cursor: pointer;
    .icon{
      margin:0 20px;
      display:flex;
      height:100%;
      align-items:center;
    }
    .menu-txt {
      display: flex;
      justify-content: center;
      align-items: center;
      
      color:#fff;
      .icon {
        display: inline-flex;
        width: 0.75rem;
        height: 0.5rem;
        margin-left: 0.75rem;
      }
    }
    &.on {
      position: relative;
      .menu-txt {
        background: linear-gradient(0deg, #ffffff 0%, #d3d3d3 100%);
        -webkit-background-clip: text;
      }
    }
  }

`;
