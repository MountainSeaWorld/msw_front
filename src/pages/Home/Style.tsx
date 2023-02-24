import { Layout } from "antd";
import styled from "styled-components";
import Bg from "@img/home/bg.png";
import BgPhone from "@img/phone/bg-phone.png";
import BotBg from "@img/home/bot-bg.png";
import Active from "@img/home/active.png";
import Default from "@img/home/default.png";
import TimeBg from "@img/home/timeBg.png";
import TeamBg from "@img/home/teamBg.png";
import partner from "@img/home/partner-bg.png";
import partnerPhone from "@img/home/partner-phone.png";
import homeBanner from "@img/home/home-banner.png"
import secondbg from "@img/home/second-bg.png"
import timeBg from "@img/home/time-line-bg.png"

export default styled(Layout)`

  .timeMain {
    width: 100%;
    background-image: url(${TimeBg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .timeLine {
      &.p_meanfe {
        width: 60%;
        @media (max-width: 768px) {
          width: 95%;
        }
      }
      padding: 7.5rem 0 3.75rem 0;
      margin: 0 auto;

      @media (min-width: 1200px) {
        width: 1170px;
      }
      @media (min-width: 992px) {
        width: 970px;
      }
      @media (min-width: 768px) {
        width: 750px;
      }
      @media (max-width: 768px) {
        padding: 5.625rem 0 2.5rem 0;
      }
      .mainContent1 {
        .timeLineTop {
          display: flex;
          justify-content: space-between;
          @media (max-width: 768px) {
            flex-wrap: wrap;
          }
        }
        .timeLineBottom {
          display: flex;
          justify-content: center;
          @media (max-width: 768px) {
            flex-wrap: wrap;
            justify-content: left;
          }
        }
        .item {
          display: flex;
          height: 13.125rem;
          background-image:url(${timeBg});
          background-size:100% 100%;
          padding-top:4rem;
          width:100%;
          height:23rem;
          @media (max-width: 768px) {
            min-height:168px;
            height:auto;
            padding-top:2rem;
          }
          @media (max-width: 768px) {
            margin-top: 1.875rem;
          }
          &.bot {
            margin-top: 2.5rem;
            @media (max-width: 768px) {
              margin-top: 1.875rem;
            }
            &.q3 {
              margin-left: 3.75rem;
              @media (max-width: 768px) {
                margin-left: 0;
              }
            }
          }
          .line {
            margin-right: 1.25rem;
          }
          .time {
            font-size: 1.875rem;
            color: white;
            font-family: "ErasITC-Bold";
          }
          .timeDetail {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
            span {
              color: #a8a8a8;
            }
          }
        }
        .left,
        .right {
          width: 50%;
          @media (max-width: 768px) {
            width: 100%;
          }
        }
      }
    }
  }
  .teamline1{
        position: relative;
        left: -1rem;
        top: 0.5rem;
        width: 2.3rem;
        @media (max-width: 768px) {
          width: 1.5rem;
          left: 9px;
        }
  }
  .teamMain {
    width: 100%;
    background-image: url(${TeamBg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    @media (max-width: 768px) {
      padding-bottom:85px;
    }
    .teamlinebottom{
      width: 2.3rem;
      position:relative;
      top:10px;
    }
    .teamContent {
      &.p_meanfe1 {
        width: 60%;
        @media (max-width: 768px) {
          width: 95%;
        }
      }
      padding: 6.25rem 0 3.75rem 0;
      margin: 0 auto;

      @media (min-width: 1200px) {
        width: 1170px;
      }
      @media (min-width: 992px) {
        width: 970px;
      }
      @media (min-width: 768px) {
        width: 750px;
      }
      @media (max-width: 768px) {
        padding: 7.5rem 0 0 0;
      }
      .team {
        img {
          width: auto;
          height:3.2rem;
          @media (max-width: 768px) {
            height:2.5rem;
          }
        }
      }

      .mainContent2 {
        margin-top:35px;

        .contentItem {
          display: flex;
          height: 164px;
          @media (max-width: 768px) {

            height: 309px;
          }
          .img {
            width: auto;
            margin-right: 1.75rem;
            @media (max-width: 768px) {
              width: auto;
              height: 100%;
              position:relative;
              left:20px;
            }
            .teamline1{
                  position: relative;
                  left: -1rem;
                  top: 0.5rem;
                  width: 2.3rem;
                  @media (max-width: 768px) {
                    width: 1.5rem;
                    left: -0.6rem;
                  }
            }
            .teamline {
              display: block;
              max-width: 100%;
              height: 100%;
              width: 0.3rem;
              @media (max-width: 768px) {
                width: 0.2rem;
              }
            }
          }
          .info {
            flex: 1;
            position:relative;
            top:0.8rem;
            .name {
              margin-bottom: 0.625rem;
              font-size: 1.125rem;
              color: #ffffff;
              font-weight: 600;
              @media (max-width: 768px) {
                margin-bottom: 0;
              }
            }
            .topic {
              color: white;
              font-size: 0.875rem;
              margin-bottom: 0.625rem;
              @media (max-width: 768px) {
                margin-bottom: 1rem;
              }
            }
            .description {
              font-size: 0.875rem;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
  }

  .botPart {
    background-image: url(${BotBg});
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .topContent {
    width: 100%;
    text-align: center;
    position: relative;
    background-imgage:url(${homeBanner});
    background-size: 100% auto;
    background-repeat: no-repeat;
    video {
      width: 100%;
      height: 100%;
    }
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 95%;
        animation: fadenum 0.1s;
        @keyframes fadenum {
          0% {
            transform: scale(0, 0);
          }
          100% {
            transform: scale(1, 1);
          }
        }
      }
    }

    .video-hide {
      position: absolute;
      top: -6250rem;
      left: -6250rem;
    }
  }
  .middleContent {
    margin: 0 auto;
    padding:100px 10rem;
    background:url(${secondbg});
    background-size:100% 100%;
    background-repeat:no-repeat;
    @media only screen and (max-width: 768px) {
      padding: 30px  1.25rem 0 1.25rem;
    }
    .des {
      width: 40.625rem;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 1);
    }
    .topicImg {
      max-width: 60%;
    }
    .firstPart {
      @media only screen and (max-width: 768px) {
        margin-top: 3.75rem;
        padding-bottom: 10px;
      }
      .firstPartImg{
        display:flex;
        flex-direction: column;

      }
      .introduce{
        height:35px;
        margin-top:20px;
      }
      .firstDes {
        margin: 2.3125rem 0 0 0;
        @media only screen and (max-width: 768px) {
          width: 100%;
          padding: 2.3125rem 2.6875rem 0 0;
          margin: 0;
        }
      }
      .infoChange {
        margin: 2.3125rem 0 0 2.6875rem;
        display: flex;
        align-items: center;
        .left,
        .right,
        .dot {
          cursor: pointer;
        }
        .dot {
          margin: 0 0.625rem;
          img:not(:first-child) {
            margin-left: 0.3125rem;
          }
        }
      }
    }
    .secondPart {
      text-align: right;
      @media only screen and (max-width: 768px) {
        margin: 7.375rem 0 8.5rem 0;
      }
      .secondDes {
        display: flex;
        justify-content: end;
        text-align: right;

        .des {
          margin: 1.5rem 2.0625rem 0 0;
          @media only screen and (max-width: 768px) {
            width: 100%;
            padding: 2.3125rem 2.6875rem 0 2.6875rem;
            margin: 0;
          }
        }
        &.bu {
          margin-top: 42px;
          @media only screen and (max-width: 768px) {
            justify-content: center;
          }
        }
        &.bu1 {
          margin-top: 20px;
          @media only screen and (max-width: 768px) {
            justify-content: center;
          }
        }
      }
      .blind {
        width: 290px;
        height: 65px;
        line-height: 65px;
        text-align: center;
        cursor: pointer;
        background-image: url(${Default});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-family: "ArialMT";
        font-size: 18px;
        color: #d6d6d6;
        &:hover {
          background-image: url(${Active});
          transform: scale(1.01, 1.01);
        }
      }
    }
  }

  .partner {
    max-width: 75rem;
    margin: 13.5625rem auto 6.25rem auto;
    position: relative;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 768px) {
      width: calc(100% - 2.5rem);
      margin: 5rem 1.25rem 1.25rem 1.25rem;
    }
    .partner-img {
      width: 100%;
      @media only screen and (max-width: 768px) {
        height:10px;
      }
    }
    .partner-bottom{
      width: 100%;
      position:relative;
      top:-1.2rem;
      @media only screen and (max-width: 768px) {
        height:10px;
      }
    }
    .topic {
      height: 3.2rem;
      width: 24rem;
      margin-bottom:35px;
      @media only screen and (max-width: 768px) {
        width: 15.6875rem;
        height: 2.5rem;
      }
    }
    .main {
      padding: 4rem 2.375rem 3rem 2.375rem;
      display: flex;
      flex-wrap: wrap;
      background-image: url(${partner});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: relative;
      width: 98%;
      top: -1rem;
      margin-left: 1%;
      @media only screen and (max-width: 768px) {
        padding: 3.75rem 2.375rem 0 2.375rem;
        top: -0.6rem;
      }
      .blank {
        width: 20%;
      }
      .mainItem {
        cursor: pointer;
        width: 20%;
        text-align: center;
        margin-bottom: 1.25rem;
        @media only screen and (max-width: 768px) {
          width: 100%;
        }
        .p_anlefe {
          margin: 0 auto;
        }
        &:hover {
          transform: scale(1.01, 1.01);
        }
        img {
          vertical-align: middle;
          width: 100%;
          height: 100%;
          &.img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }
`;
