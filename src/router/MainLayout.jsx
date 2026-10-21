import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
