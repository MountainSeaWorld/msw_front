import { formatAddress } from "@utils/commonFunction";
import Style, { ModalBody } from "./Style";
import Modal from "@com/Modal";
import MetaMask from "@img/connect-MetaMask.png";
import BinanceWallet from "@img/connect-BinanceWallet.png";
import WalletConnect from "@img/connect-WalletConnect.png";
import useConnect from "@utils/web3/useConnect";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useAppDispatch, useAppSelector } from "@ar/hooks";
import {
  setMarketServiceCharge,
  setMetaDataBaseURL,
  setMyNftList,
  setTokenInfo,
} from "@ar/web3Info";
import { ConnectorNames} from "@utils/web3/functions";
import { setLoginVisible } from "@ar/state";
import Decimal from "decimal.js";
import { Dropdown } from "antd";
import { MenuBody } from "../Style";
import { useUpdateEffect } from "ahooks";
import { useTranslation } from "react-i18next";


export default function Account({
  goPage,
}: {
  goPage: (path: string) => void;
}) {
  let { account, active, chainId } = useWeb3React();
  const web3Object = useWeb3Object();
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.state.loginVisible);
  const { connectMetaMask, connectWallet, connectBinance, deConnect } =
    useConnect();
  const [imgSrc, setImgSrc] = useState("");
  const { t } = useTranslation();


  // open connect wallet
  function connect() {
    dispatch(setLoginVisible(true));
  }
  /**close connect wallet */
  function closeConnect() {
    dispatch(setLoginVisible(false));
  }

  /**logout account */
  // function disConnect() {
  //   setAccount("");
  // }
  //enter personal
  function goPersonal() {
    goPage("/personal");
  }
  function logout() {
    deConnect();
  }
  useUpdateEffect(() => {
    //back to home , clear storage
    if (!account) {
      goPage("/");
      dispatch(setMyNftList({ list: [], account: "" }));
    }
  }, [account]);

  //connect metamask
  function conMetamask() {
    connectMetaMask().then(() => {
      closeConnect();
      setImgSrc(MetaMask);
    });
  }
  //connect binance
  function conBinance() {
    connectBinance().then(() => {
      closeConnect();
      setImgSrc(BinanceWallet);
    });
  }
  //connect wallet
  function conWallet() {
    connectWallet().then(() => {
      closeConnect();
      setImgSrc(WalletConnect);
    }).catch((res)=>{
      console.log(res)
    });
  }


  useEffect(() => {
  
    const connectorName = window.sessionStorage.getItem("connectorName");
    if (connectorName === ConnectorNames.Injected) {
      setImgSrc(MetaMask);
    } else if (connectorName === ConnectorNames.WalletConnect) {
      setImgSrc(WalletConnect);
    } else if (connectorName === ConnectorNames.Bsc) {
      setImgSrc(BinanceWallet);
    }
  }, []);

  //storage
  useEffect(() => {
    if (!active || !web3Object) {
      return;
    }
    Promise.all([
      web3Object.ContractToken.methods.symbol().call(),
      web3Object.ContractToken.methods.decimals().call(),
      web3Object.ContractMarket.methods.fee().call(),
      web3Object.ContractCards.methods.baseURI().call(),
    ]).then(([unit, decimals, charge, metaDataBaseURL]) => {
      dispatch(
        setTokenInfo({
          tokenName: unit,
          tokenDecimals: decimals,
        })
      );
      dispatch(setMarketServiceCharge(Decimal.div(charge, 100).toNumber()));
      dispatch(setMetaDataBaseURL(metaDataBaseURL));
    });
  }, [active, chainId, web3Object, dispatch]);

  return (
    <Style>
      {!account ? (
        <div className="login animation-button" onClick={connect}>
          <span className="menu-txt link-menu">
            {window.isPhone ? t("header.plink") : t("header.link")}
          </span>
        </div>
      ) : window.isPhone ? (
        <Dropdown
          trigger={["click"]}
          overlay={
            <MenuBody
              items={[
                {
                  key: "1",
                  label: "personal",
                  onClick: goPersonal,
                },
                {
                  key: "2",
                  label: "logout",
                  onClick: logout,
                },
              ]}
            />
          }
          placement="bottomRight"
        >
          <div className="account">
            <span className="link-succes">
              <div className="txt-img">
                <img src={imgSrc} alt="" />
                <span>{formatAddress(account.substring(2), 2, 4)}</span>
              </div>
            </span>
          </div>
        </Dropdown>
      ) : (
        <div className="account">
          <div className="link-success">
            <div className="txt-img">
              <img src={imgSrc} alt="" />
              <div className="address-text">{formatAddress(account.substring(0), 2, 4)}</div>
            </div>
          </div>
          <div className="txt-extra">
            <div className="menu-txt-label" onClick={goPersonal}>
              <div className="menu-txt">{t("header.personal")}</div>
            </div>
            <div className="line"></div>
            <div className="menu-txt-label" onClick={logout}>
              <div className="menu-txt">{t("header.logout")}</div>
            </div>
          </div>
        </div>
      )}
      <Modal width={"31.25rem"} open={open} onCancel={closeConnect}>
        <ModalBody>
          <div className="title">{t("header.cw")}</div>
          <div className="content">
            <div className="connect" onClick={conMetamask}>
              <div className="connect-icon">
                <img src={MetaMask} alt="" />
              </div>
              <div className="connect-title">{t("header.mm")}</div>
            </div>
            <div className="connect" onClick={conBinance}>
              <div className="connect-icon">
                <img src={BinanceWallet} alt="" />
              </div>
              <div className="connect-title">{t("header.bw")}</div>
            </div>
            <div className="connect" onClick={conWallet}>
              <div className="connect-icon">
                <img src={WalletConnect} alt="" />
              </div>
              <div className="connect-title">{t("header.wc")}</div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Style>
  );
}
