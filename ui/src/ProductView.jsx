
/* eslint linebreak-style: ["error", "windows"] */


import { Link, withRouter } from 'react-router-dom';
import React from 'react';


export default function ProductView({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));

  return (
    <table className="bordered-table">
      <thead>

        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}


const ProductRow = withRouter(({
  product, index, deleteProduct,
}) => (
  <tr>

    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>{product.price}</td>
    <td><a href={`/viewimage/${product.id}`} target="blank"> View</a></td>
    <td>
      <Link to={`/edit/${product.id}`}>Edit</Link>
      {' | '}
      <button type="button" onClick={() => { deleteProduct(index); }}>
        Delete
      </button>
    </td>
  </tr>
));
