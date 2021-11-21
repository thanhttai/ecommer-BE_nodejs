import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import userActions from "../../redux/actions/user.action";
import "./CartPage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
    const history = useHistory();
    const handleClickProduct = (productId) => {
        history.push(`/product/${productId}`);
    }
    const [productId, setProductId] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loading);
    const products = useSelector(state => state.users.cartProduct?.products);
    const cartId = useSelector(state => state.users.cartProducts?._id); //SAFE
 
    const handleOrder = () => {
        dispatch(userActions.postOrder());
        dispatch(userActions.getCurrentUser());
    }

    const removeProduct = (id) => {
      console.log(id?.productId?._id, "huhu");
      if(id?.productId?._id && cartId){
        const productId = id?.productId?._id;
        console.log(productId, "new");
        setProductId(productId);
      }
    };

    useEffect(() =>{
      dispatch(userActions.deleteCart({cartId}));
    },[productId]);

    useEffect(() => {
        dispatch(userActions.getCartProduct());
    }, []);
    return (
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <h1 className="text-center cart-title" style={{marginTop:"2rem", marginBottom: "3rem", color:"gray"}}>Your Cart</h1>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <div className="text-center">
                  <ClipLoader color="#f86c6b" size={150} loading={true} />
                </div>
              ) : (
                <ul className="list-unstyled d-flex flex-wrap justify-content-between" style={{display:"flex", flexDirection:"column", justifyContent:"center" }}>
                  {products && products.map((product) => (
                    <li key={product._id}>
                      <Card
                        className="cartContainer"
                        style={{
                          borderRadius: "20px",
                          padding: "1rem",
                          marginBottom: "2rem",
                          position: "relative",
                          display: "flex",
                          flexDirection:"row",
                          alignContent: "space-around",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={product.productId.photo}
                          onClick={() => handleClickProduct(product.productId._id)}
                          style={{maxWidth:"200px"}}
                        />
                        <Card.Body style={{marginLeft:"100px"}}>
                          <Card.Title>Product: {product.productId.name}</Card.Title>
                          <Card.Text style={{color:"gray"}}>By: {product.productId.description}</Card.Text>
                          <Card.Text>Quantity: {product.qty}</Card.Text>
                          <Button
                            className="position-absolute btn-light"
                            style={{ top: "10px", right: "10px"}}
                            size="sm"
                            onClick={() => removeProduct(product)}
                          >
                            &times;
                          </Button>
                        </Card.Body>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
              <div style={{textAlign:"right", width:"60vw"}}>
                  Total Order Quantity: {products && products.length}
              </div>
              <div style={{textAlign:"right", width:"60vw", marginTop:"2rem"}}>
              <Button
                onClick={handleOrder} style={{backgroundColor:"lightsteelblue", border:"none", color:"white", marginBottom:'2rem'}}>Checkout</Button>
              <ToastContainer autoClose={2000} />
              </div>
            </Col>
          </Row>
        </Container>
      );
    };

export default CartPage;
