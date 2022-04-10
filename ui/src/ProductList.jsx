/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-globals */

/* eslint linebreak-style: ["error", "windows"] */


import React from 'react';
import ProductView from './ProductView.jsx';
import ProductAdd from './ProductAdd.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList{
        id name price category image
      }
    }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(newProduct) {
    const query = `mutation addProduct($newProduct: ProductInputs!) {
        addProduct(product: $newProduct) {
          id
        }
      }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { newProduct } }),
    });
    if (response) { this.loadData(); }
  }

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { id } = products[index];
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
    });
    // const result = await response.json();
    if (response && response.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        // eslint-disable-next-line no-undef
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products' });
        }
        newList.splice(index, 1);
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }


  render() {
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <h2> Showing all the available products </h2>
        <hr />
        <ProductView products={this.state.products} deleteProduct={this.deleteProduct} />

        <h2>Add a new product to inventory</h2>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}
