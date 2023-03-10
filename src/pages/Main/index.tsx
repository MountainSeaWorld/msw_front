import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Style from "./Style";


export default function Main() {
  return (
    <Style>
      <Layout.Header className="head">
        <Header />
      </Layout.Header>
      <Outlet />
      <Layout.Footer className="footer">
        <Footer />
      </Layout.Footer>
    </Style>
  );
}
