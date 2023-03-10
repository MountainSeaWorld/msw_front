import { useAppDispatch } from "@ar/hooks";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import Button from "@com/Button";
import Modal from "@com/Modal";
import config from "@utils/web3/config";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useWeb3React } from "@web3-react/core";
import { useBoolean, useMemoizedFn } from "ahooks";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style, { ModalBody } from "./Style";
import BoxNftBlueImg from "@img/box-nft-blue-img.png";
import BoxNftGreenImg from "@img/box-nft-green-img.png";
import useApi from "@utils/useApi";
import { useTranslation } from "react-i18next";
import Input from "@com/Input";
import PInput from "@img/page-input-bg.png";

export default function Box() {
  const [opening, { setFalse: setIngFalse, setTrue: setIngTrue }] =
    useBoolean(false);
  const [opened, { setFalse: setEdFalse, setTrue: setEdTrue }] =
    useBoolean(false);
  const { active, account } = useWeb3React();
  const web3Object = useWeb3Object();
  const [boxNum, setBoxNum] = useState(0); //盲盒数量
  const vedioRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const [toStore, setToStore] = useState(false); //提示盲盒不足，跳转store
  const [openBoxFlag, setopenBoxFlag] = useState(false);
  const [selectopenNum, setselectopenNum] = useState(1);
  const navigate = useNavigate();
  const RootDom = useRef<HTMLElement | null>(null);
  const { getMyNftList, getOpenEventList, getCardById } = useApi();
  const [quality, setQuality] = useState("0"); //开启的nft的品质
  const { t } = useTranslation();

  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);

  useEffect(() => {
    if (RootDom.current) {
      RootDom.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (!vedioRef.current) {
      return;
    }
    vedioRef.current.play();
  }, [vedioRef]);

  /**查询自身盲盒数量 */
  const queryBoxNum = useMemoizedFn(() => {
    if (!active || !web3Object || !account) {
      return;
    }
    dispatch(addSpining());
    web3Object.ContractProps.methods
      .balanceOf(account, config.BOXTokenId)
      .call()
      .then((num: number) => {
        setBoxNum(num);
        console.log(num)
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });

  useEffect(() => {
    queryBoxNum();
  }, [active, web3Object, account, dispatch, queryBoxNum]);

  /**开盲盒 */
  async function openBox() {
    //判断是否登录
    if (!active || !web3Object || !account) {
      dispatch(setLoginVisible(true));
      return;
    }
    //判断盒子数量是否足够
    if (boxNum <= 0) {
      setToStore(true);
      return;
    }
    if(selectopenNum >boxNum || selectopenNum < 1 ){
      message.error('amount error');
      return;
    }


    //访问合约
    dispatch(addSpining());
    //检查已开启盲盒数量是否超过设定
    const currentTotalNftNumber = await web3Object.ContractCards.methods
      .totalSupply()
      .call();
    if (Number(currentTotalNftNumber) >= config.maxNftNumber) {
      //当前已存在的nft数量超过设定
      message.error(t("box.tu"));
      dispatch(delSpining());
      return;
    }
    //检查是否授权
    const isApprove = await web3Object.ContractProps.methods
      .isApprovedForAll(account, config.BoxAddress)
      .call();
    if (!isApprove) {
      //如果没授权，则授权
      await web3Object.ContractProps.methods
        .setApprovalForAll(config.BoxAddress, true)
        .send({
          from: account,
        })
        .on("transactionHash", function (hash: any) {

        })
        .on("receipt", async (receipt: any) => {

        })
        .on("error", function (error: any) {
          dispatch(delSpining());
          message.error(error.message);
        });
    }
    //开盲盒
    await web3Object.ContractBox.methods
      .open(selectopenNum)
      .send({
        from: account,
      })
      .on("transactionHash", function (hash: any) {

      })
      .on("receipt", async (receipt: any) => {

        getOpenEventList()
          .then((openList) => {
            const myOpenList = openList.filter(
              (item: { account: string; nftId: string }) =>
                item.account.toLocaleLowerCase() === account.toLocaleLowerCase()
            );
            if (myOpenList.length === 0) {
              return null;
            } else {
              return myOpenList[myOpenList.length - 1];
            }
          })
          .then((openData) => {
            if (openData.nftId) {
              return getCardById(openData.nftId);
            } else {
              return Promise.reject();
            }
          })
          .then((data) => {
            closeBoxNum()
            //设置获取的nft品质
            setQuality(data.quality);
            //播放动画
            if (!vedioRef.current) {
              return;
            }
            setIngTrue();
            vedioRef.current.src = require("../../assets/box-2.mp4");
            vedioRef.current.play();
            vedioRef.current.loop = false;
            vedioRef.current.onended = () => {
              setIngFalse();
              setEdTrue();
              navigate("/personal");
            };

            if (account && web3Object) {
              getMyNftList(account,true);
            }
          });
      })
      .on("error", function (error: any) {
        closeBoxNum()
        message.error(error.message);
        dispatch(delSpining());
      })
      .finally(() => {
        dispatch(delSpining());
        closeBoxNum()
      });
  }
function reduceNum(){
  setselectopenNum(1)
}
function addNum(){
  setselectopenNum(boxNum)
}
function changePageIndex(e:any){
  console.log(e)
  if(e > boxNum){
    setselectopenNum(boxNum)
  }else{
     setselectopenNum(1)
  }
}
function closeBoxNum (){
  setopenBoxFlag(false)
}
  /**获取nft */
  function getNft() {
    if (!account) {
      return;
    }
    dispatch(addSpining());
    getMyNftList(account, true).finally(() => {
      dispatch(delSpining());
      if (!vedioRef.current) {
        return;
      }
      setEdFalse();
      vedioRef.current.src = require("../../assets/box-1.mp4");
      vedioRef.current.play();
      vedioRef.current.loop = true;
      queryBoxNum();
    });
  }
function openBoxWindow(){
  setopenBoxFlag(true)
}
  return (
    <Style>
      <div className="back">
        <video
          ref={vedioRef}
          src={require("../../assets/box-1.mp4")}
          autoPlay
          loop
          preload="auto"
          controls={false}
          muted
        />
      </div>
      {!opening && !opened && (
        <>
          <div className="tips">
            <div className="label">{t("box.tip")}</div>
            <div className="value">{boxNum}</div>
          </div>
          <div className="button">
            <Button onClick={openBoxWindow} type="buy">{t("open")}</Button>
          </div>
        </>
      )}
      <img
        style={{
          opacity: opened && quality === "0" ? 1 : 0,
        }}
        src={BoxNftGreenImg}
        alt=""
      />
      <img
        style={{
          opacity: opened && quality === "1" ? 1 : 0,
        }}
        src={BoxNftBlueImg}
        alt=""
      />
      {opened && (
        <>
          <div className="tips">
            <div className="label">{t("box.con")}</div>
          </div>
          <div className="button">
            <Button onClick={getNft}>{t("box.gn")}</Button>
          </div>
        </>
      )}

      <Modal width={"31.25rem"} open={openBoxFlag} onCancel={closeBoxNum}>
        <ModalBody>
            <div className="selectOpenAmount-title">SELECT OPEN AMOUNT</div>
          <div className="selectOpenAmount">
               <div className="pagination-button"  onClick={reduceNum}>Min</div>
               <Input
                 type="number"
                 backImg={PInput}
                 InputNumberProps={{
                   value:selectopenNum,
                   onChange: changePageIndex
                 }}
               />
               <div className="pagination-button" onClick={addNum}>Max</div>

          </div>
          <div className="buyButton">
            <Button
              size="small"
              type="buy"
              onClick={openBox}
            >
              OPEN
            </Button>
          </div>


        </ModalBody>
      </Modal>
      <Modal
        open={toStore}
        width={window.isPhone ? "90%" : "26.25rem"}
        onCancel={() => {
          setToStore(false);
        }}
      >
        <ModalBody>
          <div className="tip">{t("box.tn")}</div>
          <div className="button">
            <Button
              size="small"
              onClick={() => {
                navigate("/store");
              }}
            >
              {t("ok")}
            </Button>
            <Button
              size="small"
              onClick={() => {
                setToStore(false);
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Style>
  );
}
