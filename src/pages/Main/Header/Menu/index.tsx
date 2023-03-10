import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MenuBody } from "../Style";
import Style from "./Style";
import Icon from "@img/home/title-icon.png";
import navLine from "@img/nav-line.png";
import navDrop from "@img/nav-drop.png";


export default function Menu({ goPage }: { goPage: (path: string) => void }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Style>
      <div
        className={
          "menu-item" + (pathname === "/" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/");
        }}
      >
        <span className="menu-txt">{t("header.home")}</span>
      </div>
      <img className="menu-line" src={navLine} />
      <div
        className={
          "menu-item" + (pathname === "/store" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/store");
        }}
      >
        <span className="menu-txt">{t("header.store")}</span>
      </div>
      <img className="menu-line" src={navLine} />
      <div
        className={
          "menu-item" + (pathname === "/box" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/box");
        }}
      >
        <span className="menu-txt">{t("header.box")}</span>
      </div>
      <div className="menu-item">
        <div className="icon">
          <img src={Icon} />
        </div>
      </div>
      <div
        className={
          "menu-item" + (pathname === "/stake" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/stake");
        }}
      >
        <span className="menu-txt">{t("header.stake")}</span>
      </div>

      <img className="menu-line" src={navLine} />
      <div
        className={
          "menu-item" + (pathname === "/market" ? " on" : " animation-button")
        }
        onClick={() => {
          goPage("/market");
        }}
      >
        <span className="menu-txt">{t("header.market")}</span>
      </div>

      <img className="menu-line" src={navLine} />
    </Style>
  );
}

export function PhoneMenu({ goPage }: { goPage: (path: string) => void }) {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState(t("header.home") || "");

  useEffect(() => {
    switch (pathname) {
      case "/store":
        setMenu(t("header.store") || "");
        break;
      case "/box":
        setMenu(t("header.box1") || "");
        break;
      case "/market":
        setMenu(t("header.market1") || "");
        break;
      case "/stake":
        setMenu(t("header.stake") || "");
        break;
      case "/personal":
        setMenu(t("header.personal") || "");
        break;
      default:
        setMenu(t("header.home") || "");
        break;
    }
  }, [pathname, i18n.language, t]);

  return (
    <>

      <Dropdown
        trigger={["click"]}
        overlay={
          <MenuBody
            items={[
              {
                key: "home",
                label:(<span className="drop-menu-label">{t("header.home")}</span>),
                onClick: () => goPage("/"),
              },
              {
                key: "store",
                label: (<span className="drop-menu-label">{t("header.store")}</span>),
                onClick: () => goPage("/store"),
              },
              {
                key: "box",
                label: (<span className="drop-menu-label">{t("header.box1")}</span>),
                onClick: () => goPage("/box"),
              },{
                key: "stake",
                label: (<span className="drop-menu-label">{t("header.stake")}</span>),
                onClick: () => goPage("/stake"),
              },
              {
                key: "market",
                label: t("header.market1"),
                onClick: () => goPage("/market"),
              },
            ]}
          />
        }
        placement="bottom"
      >
        <div className="menu menu-txt">
          {menu}
          <img  className="icon" src={navDrop} />

        </div>
      </Dropdown>
      <img className="menu-line" src={navLine} />
      <img  className="icon-phone" src={Icon} />

      <img className="menu-line" src={navLine} />
    </>
  );
}
