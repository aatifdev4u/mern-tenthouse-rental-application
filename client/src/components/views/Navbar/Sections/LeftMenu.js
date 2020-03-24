import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="book">
      <a href="/book">Book Order</a>
    </Menu.Item>
    <Menu.Item key="retun">
      <a href="/return">Return</a>
    </Menu.Item>
    <Menu.Item key="product">
      <a href="/addproduct">Add Product</a>
    </Menu.Item>
    <Menu.Item key="customer">
      <a href="/addcustomer">Add Customer</a>
    </Menu.Item>
    <Menu.Item key="transaction">
      <a href="/transaction">Transaction</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu