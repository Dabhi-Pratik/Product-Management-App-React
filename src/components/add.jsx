import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

import {
  addProduct,
  updateProduct,
  clearEditValue,
} from "../features/ProductSlice";

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editValue } = useSelector((state) => state.product);

  const [input, setInput] = useState({
    name: "",
    qty: "",
    price: "",
    category: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fill the form when editing a product
  useEffect(() => {
    if (editValue) {
      setInput({
        name: editValue.name ?? "",
        qty: String(editValue.qty ?? ""),
        price: String(editValue.price ?? ""),
        category: editValue.category ?? "",
        image: editValue.image ?? "",
      });
    } else {
      setInput({
        name: "",
        qty: "",
        price: "",
        category: "",
        image: "",
      });
    }
  }, [editValue]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = input.name.trim();
    const category = input.category.trim();
    const image = input.image.trim();

    if (!name || !category || !image) {
      setError("Please fill in all fields.");
      return;
    }

    if (input.qty.trim() === "" || input.price.trim() === "") {
      setError("Quantity and price are required.");
      return;
    }

    const qty = Number(input.qty);
    const price = Number(input.price);

    if (!Number.isInteger(qty) || qty < 0) {
      setError("Quantity must be a non-negative whole number.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("Price must be a valid non-negative number.");
      return;
    }

    // Validate image URL
    try {
      const imageUrl = new URL(image);

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        setError("Please enter a valid HTTP or HTTPS image URL.");
        return;
      }
    } catch {
      setError("Please enter a valid image URL.");
      return;
    }

    const product = {
      name,
      qty,
      price,
      category,
      image,
    };

    setLoading(true);

    try {
      if (editValue) {
        await dispatch(
          updateProduct({
            ...product,
            id: editValue.id,
          }),
        ).unwrap();

        dispatch(clearEditValue());
      } else {
        await dispatch(addProduct(product)).unwrap();
      }

      setInput({
        name: "",
        qty: "",
        price: "",
        category: "",
        image: "",
      });

      navigate("/products");
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Unable to save product. Check JSON Server.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel and return to products
  const handleCancel = () => {
    dispatch(clearEditValue());

    setInput({
      name: "",
      qty: "",
      price: "",
      category: "",
      image: "",
    });

    setError("");
    navigate("/products");
  };

  return (
    <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: "750px" }}>
      <Card.Body className="p-4">
        <h2 className="mb-2">{editValue ? "Update Product" : "Add Product"}</h2>

        <p className="text-muted mb-4">
          {editValue
            ? "Update the selected product details."
            : "Enter the details of your new product."}
        </p>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Product Name */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>

                <Form.Control
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </Form.Group>
            </Col>

            {/* Quantity */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>

                <Form.Control
                  type="number"
                  name="qty"
                  value={input.qty}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  min="0"
                  step="1"
                  required
                />
              </Form.Group>
            </Col>

            {/* Price */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>

                <Form.Control
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>

            {/* Category */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>

                <Form.Control
                  type="text"
                  name="category"
                  value={input.category}
                  onChange={handleChange}
                  placeholder="Electronics, Clothing..."
                  required
                />
              </Form.Group>
            </Col>

            {/* Image URL */}
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>Image URL</Form.Label>

                <Form.Control
                  type="url"
                  name="image"
                  value={input.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Image Preview */}
          {input.image.trim() && (
            <div className="mb-4">
              <Form.Label>Image Preview</Form.Label>

              <div>
                <img
                  src={input.image}
                  alt="Product preview"
                  style={{
                    width: "150px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #dee2e6",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex gap-2 flex-wrap">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : editValue ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Add;
