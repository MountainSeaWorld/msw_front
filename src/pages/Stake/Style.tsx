import { Layout } from "antd";
import styled from "styled-components";
import StakingBG from "@img/staking-banner.png";
import StakingTitle from "@img/staking-title.png";
import StoreTitlePhone from "@img/phone/store-title-phone.png";
import StakingMain from "@img/staking-bg.png"
import Tabon from "@img/tab_on.png";
import Taboff from "@img/tab_off.png";
import Btndefault from "@img/button-normal-default-disabled.png"
import TabDivider from "@img/home/partner-top-line.png"
import cardBg from "@img/card-bg.png"
import nftbg from "@img/nft-img-back-green.png"

import buyBtn from "@img/store-buy-btn.png"
import stakebtn from "@img/stake-btn.png"
import stakeinbtn from "@img/stakein-btn.png"

export default styled(Layout)`

  background-image: url(${StakingBG});
  background-size: 100% 100%;
  background-position: center top;
  align-items: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  @media only screen and (max-width: 768px) {
    background-size: 100% 16%;
  }
  .title {
    width: 29.25rem;
    height: 6.9375rem;
    margin-top: 11.125rem;
    background-image: url(${StakingTitle});
    background-size: 100% 100%;
    @media only screen and (max-width: 768px) {
      width: 19.5rem;
      height: 4.5625rem;
      background-image: url(${StakingTitle});
      margin-top: 6.875rem;
    }
  }
  .staking-content{
        padding:5rem 0;
        margin-top: 5.375rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background-image: url(${StakingMain});
        background-size: 100% 100%;
        width:70%;
        margin-bottom:40px;
        @media only screen and (max-width: 768px) {
          display: block;
          height: 36.5rem;
          width:90%;
          padding:1rem 3rem;
          text-align:center;
        }

        .reward{
            display: flex;
            flex-direction: column;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            border-right:solid 2px #2b0e0b;
             @media only screen and (max-width: 768px) {
                border-right:none;
                border-bottom:solid 2px #2b0e0b;
              }
            .label{
                font-size: 1.125rem;
                color: white;
                line-height: 3.5rem;
                font-weight: bold;
                @media only screen and (max-width: 768px) {
                  position:relative;
                  top:1rem;
                }
            }
            .stakeline{
              background:#2b0e0b;
              width:1px;
              height:80%;
            }
            .value{
                font-size: 1.125rem;
                color: white;
                line-height: 3.5rem;
                font-weight: bold;
                .unit{
                      font-size: 0.875rem;
                      font-weight: 400;
                }

            }
      }
      .early{
          display: flex;
          flex-direction: column;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;

          .label{
              font-size: 1.125rem;
              color: white;
              line-height: 3.5rem;
              font-weight: bold;
              @media only screen and (max-width: 768px) {
                position:relative;
                top:1rem;
              }
          }
          .value{
              font-size: 1.75rem;
              color: white;
              line-height: 3.5rem;
              font-weight: bold;
          }
          .btn{
              width: 10.5rem;
              margin-top: 0.625rem;
          }
          .record{
              font-size: 0.875rem;
              color: white;
              text-decoration: underline;
              opacity: 0.5;
              cursor: pointer;
          }
      }
      .tips{
          display: flex;
          justify-content: space-evenly;
          -webkit-box-align: center;
          align-items: center;
          border-left:solid 2px #2b0e0b;
          @media only screen and (max-width: 768px) {
            position:relative;
            top:2rem;
            padding-top:30px;
            border-left:none;
            border-top:solid 2px #2b0e0b;

          }
          .tip{
                text-align: center;
                .icon{
                      display: inline-block;
                      width: 1.8125rem;
                      height: 1.75rem;
                      background-size: 100% 100%;
                }
                .icon.green{
                      background-image: url(data:image/png;base64,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);
                }
                .label{
                  font-size: 0.875rem;
                      color: white;
                      line-height: 2.5rem;
                }
                .value{
                  font-size: 0.875rem;
                      color: white;
                      line-height: 2.5rem;
                      opacity: 0.5;
                }
                .icon.blue{
                  background-image: url(data:image/png;base64,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);
                }
          }

      }
  }
  .jqPWEm{
        background-image:url(${buyBtn});
        width: 100%;
        height: 35px;
        min-width: 6.75rem;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.5);
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        background-size: 100% 100%;
        cursor: pointer;
        pointer-events: auto;
  }

  .actions{
        display: flex;
        width:100%;
        width:70%;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        margin-top: 3.9375rem;
        margin-bottom: 2.5rem;
        position: relative;
        @media only screen and (max-width: 768px) {
          // display: block;
          justify-content: space-between;

          width:90%;
        }
        .tabs{
              display: flex;
              -webkit-box-pack: start;
              justify-content: flex-start;
              -webkit-box-align: center;
              align-items: center;
              margin-left: 2.5rem;
              @media only screen and (max-width: 768px) {
                position:relative;
                top:-10px;
                left:-20px;
              }

              .tabs-item.on {
                  height: 4.4375rem;
                  width: 10.75rem;
                  line-height: 4.4375rem;
                  background-image: url(${stakeinbtn});
                   @media only screen and (max-width: 768px) {
                    width: 4.4375rem;
                    height: 2.7375rem;
                    line-height: 2.7375rem;
                  }

              }
              .tabs-item.off {
                  height: 4.2rem;
                  width: 10.75rem;
                  line-height: 3.75rem;
                  background-image: url(${stakebtn});
                  color: rgba(255, 255, 255, 0.5);
                  @media only screen and (max-width: 768px) {
                    width: 3.95rem;
                    height: 2.55rem;
                    line-height: 2.55rem;
                  }
              }
              .tabs-item {

                  background-size: 100% 100%;
                  cursor: pointer;
                  color: rgb(255, 255, 255);
                  text-align: center;
                  margin-right: 0.625rem;
                  @media only screen and (max-width: 768px) {
                    font-size:14px;
                  }

              }
        },

        .confirm > span {
            color: white;
            margin-right: 1rem;
        }
        .confirm > div {
            width: 10.5rem;
            @media only screen and (max-width: 768px) {
              width: 5rem;
            }
        }
        .yVfNx {
            background-image: url(${Btndefault});
            filter: grayscale(1);
            width: 100%;
            height: 40px;
            min-width: 6.75rem;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.5);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            background-size: 100% 100%;
            cursor: not-allowed;
            pointer-events: none;
        }
  }
  .actions::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 1rem;
      background-image: url(${TabDivider});
      background-size: 100% 100%;
      bottom: -0.875rem;
      pointer-events: none;
  }
  .actions>.confirm{
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                align-items: center;
                margin-right: 1.25rem;
                position: relative;
                @media only screen and (max-width: 768px) {
                  top:45px;
                  right:3rem;
                }

  }
 .list{
   margin-bottom:50px;
   width: 70%;
   display:flex;
   flex-wrap: wrap;
   justify-content:space-between;
 }
 .paging {
   text-align: center;
   margin-bottom:80px;
 }


.stake-btn>div{
  @media only screen and (max-width: 768px) {
    width:4rem;
  }
}
.no-data{
  margin-top:50px;
  border-top:none;
}

`;
