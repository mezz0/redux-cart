import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Wrapper = styled.div`
  background-color: #eac612;
  padding: 10px 20px;
  margin-bottom: 40px;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: black;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;

  h1 {
    font-size: 30px;
    margin: 0 20px;
    padding: 0;
    font-weight: 800;
    color: black;
    letter-spacing: -3px;
  }
`;

const Nav = (props: any) => {
  const { cartUpdated, cart } = props;

  cartUpdated();
  let total = 0;
  cart.map((item: any) => (total += item.product.price * item.quantity));

  return (
    <Wrapper>
      <InnerWrapper>
        <NavLink className="navbar-brand" to="/">
          <h1>Vitl</h1>
        </NavLink>
        <NavLink to={`/cart`}>
          {cart.length > 0 ? (
            <span className="label label-info">
              {`${cart.length} items: (£${total.toFixed(2)})`}
            </span>
          ) : null}
          <IconButton aria-label="delete" color="secondary">
            <ShoppingBasketIcon />
          </IconButton>
        </NavLink>
      </InnerWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart.cart,
    cartUpdated: () => {
      return true;
    },
  };
};

export default connect(mapStateToProps)(Nav);
