/* eslint-disable max-len */

/* eslint linebreak-style: ["error", "windows"] */


import React from 'react';
import NumInput from './NumberInput.jsx';
import TextInput from './TextInput.jsx';


export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      Editproducts: {},
      invalidFields: {},
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      Editproducts: { ...prevState.Editproducts, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { Editproducts, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;
    // console.log(Editproducts); // eslint-disable-line no-console

    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id category name price image
      }
    }`;
    const { id, ...changes } = Editproducts;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id, changes } }),
    });
    const result = await response.json();
    if (result) {
      window.console.log(result.data);
      this.setState({ Editproducts: result.data.productUpdate });
      alert('Updated Product successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query Product($id: Int!) {
        Product(id: $id) {
          id category name price image
        }
      }`;
    const { match: { params: { id } } } = this.props;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
    });

    const result = await response.json();
    this.setState({ Editproducts: result.data.Product });

    this.setState({ Editproducts: result.data.Product ? result.data.Product : {}, invalidFields: {} });
  }

  render() {
    const { Editproducts: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) 
      {
        return <h3>{`products with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const
    {
      Editproducts: {
        name, category, price, image,
      },
    } = this.state;


    return (
      <form onSubmit={this.handleSubmit}>
        <div className="gridview">
        <h2>{`Edit Product attributes:${id}`}</h2>
        <br />
        <table>
          <tbody>
            <tr>
              <td>Product Name</td>
              <td>
                <TextInput
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>
                <select name="category" value={category} onChange={this.onChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <NumInput
                  name="price"
                  value={price}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                <TextInput
                  name="image"
                  value={image}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>

            <tr>
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
        </div>
      </form>
    );
  }
}
