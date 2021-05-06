import React from "react";
import Product from "../components/Product";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductList: React.FC<WithProps> = (props) => {
  const { products, cart } = props;
  const { addToCart, removeFromCart } = props; // functions

  if (products === undefined) return <p>Loading...</p>;

  const addItem = (product: any) => {
    addToCart(product);
  };
  const removeItem = (item: any) => {
    removeFromCart(item.name);
  };

  return (
    <Container>
      <Helmet>
        <title>Home: Products</title>
      </Helmet>
      <Row>
        {products.map((product: any) => {
          return (
            <Product
              product={product}
              addToCart={addItem}
              removeFromCart={removeItem}
              inCart={
                cart.length > 0 &&
                cart.filter((e: any) => e.product.name === product.name)
                  .length > 0
              }
              key={product.name}
            />
          );
        })}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    products: state.product.products,
    config: state.product.config,
    cart: state.cart.cart,
    nutrientsInCart: state.cart.nutrients,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCart: (product: any) => {
      dispatch(addToCart(product));
    },
    removeFromCart: (productId: any) => dispatch(removeFromCart(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

interface WithProps {
  props: any;
  products: any;
  cart: any;
  addToCart: (val: any) => void;
  removeFromCart: (val: any) => void;
}
