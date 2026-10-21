import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar as BsNavbar, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/products">
          Product Manager
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="product-navbar" />

        <BsNavbar.Collapse id="product-navbar">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/add-product">
                  Add Product
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-lg-center gap-2">
            {user ? (
              <>
                <NavbarEmail email={user.email} />
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

const NavbarEmail = ({ email }) => (
  <span className="text-light small">{email}</span>
);

export default NavBar;
