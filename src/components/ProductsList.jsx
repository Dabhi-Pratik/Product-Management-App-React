import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import {
  fetchProducts,
  setEditValue,
  deleteProduct,
} from "../features/ProductSlice";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("nameAsc");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const visibleProducts = useMemo(() => {
    const result = products.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = !category || p.category === category;

      return matchesName && matchesCategory;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return Number(a.price) - Number(b.price);
        case "priceDesc":
          return Number(b.price) - Number(a.price);
        case "qtyAsc":
          return Number(a.qty) - Number(b.qty);
        case "qtyDesc":
          return Number(b.qty) - Number(a.qty);
        case "nameAsc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [products, search, category, sort]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
      } catch {
        alert("Unable to delete product. Check JSON Server.");
      }
    }
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="mb-1">Product Management</h2>
          <p className="text-muted mb-0">
            Manage your inventory and product details.
          </p>
        </div>

        <Button onClick={() => navigate("/add-product")}>+ Add Product</Button>
      </div>

      <Row className="g-3 mb-4">
        <Col sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-1">Total Products</p>
              <h3>{products.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-1">Inventory Value</p>
              <h3>
                ₹
                {products
                  .reduce(
                    (total, p) => total + Number(p.price) * Number(p.qty),
                    0,
                  )
                  .toLocaleString("en-IN")}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-1">Low Stock (10 or fewer)</p>
              <h3>{products.filter((p) => Number(p.qty) <= 10).length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Form.Control
                placeholder="Search product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="nameAsc">Name A–Z</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="qtyAsc">Quantity: Low to High</option>
                <option value="qtyDesc">Quantity: High to Low</option>
              </Form.Select>
            </Col>
          </Row>

          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}. Make sure JSON Server is running on port 3000.
            </div>
          )}

          {!loading && !error && (
            <Table responsive hover bordered className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={p.image}
                        alt={p.name}
                        width="65"
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.qty}</td>
                    <td>₹{Number(p.price).toLocaleString("en-IN")}</td>
                    <td>{p.category}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => {
                            dispatch(setEditValue(p.id));
                            navigate("/add-product");
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductsList;
