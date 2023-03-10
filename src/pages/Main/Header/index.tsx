import Style from "./Style";
import Menu, { PhoneMenu } from "./Menu";
import { useLocation, useNavigate } from "react-router-dom";
import Account from "./Account";
import { useAppSelector } from "@ar/hooks";



export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const headerVisible = useAppSelector((state) => state.state.headerVisible);

 
  function goPage(path: string) {
    if (pathname === path) {
      
      return;
    }
    navigate(path);
  }

  if (headerVisible) {
    return (
      <Style>
        <div className="navbg">

          <div className="middle">
            {window.isPhone ? (
              <PhoneMenu goPage={goPage} />
            ) : (
              <Menu goPage={goPage} />
            )}
          </div>
          <div className="right">
            <Account goPage={goPage} />
          </div>
        </div>

      </Style>
    );
  } else {
    return null;
  }
}
