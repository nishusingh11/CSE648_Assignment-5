
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query Product($id: Int!) {
      Product(id: $id) {
        id category name price image
      }
    }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
    });

    const result = await response.json();
    this.setState({ products: result.data.Product });
  }

  render() {
    const { products: { image, name } } = this.state;
    return (
      <div>
        <h2>Image of the Product</h2>
        <h1>{name}</h1>
        <img src={image} alt={name} style={{ width: 400, height: 400 }} />
      </div>
    );
  }
}
