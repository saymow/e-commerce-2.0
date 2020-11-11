import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsListState } from '../../../@types/redux/product';

import { deleteProduct, listProducts } from '../../../actions/productActions';
import { ReduxState } from '../../../store';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';

import { Table, Button } from 'react-bootstrap';
import { Container, DeleteIcon, Options } from './styles';
import { useHistory } from 'react-router-dom';
import { DefaultState } from '../../../@types/redux';

const Products: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector<typeof ReduxState>(
    state => state.productList
  ) as ProductsListState;

  const { success: successDelete, reset: resetDelete } = useSelector<
    typeof ReduxState
  >(state => state.productDelete) as DefaultState<{}>;

  console.log(successDelete, resetDelete);

  useEffect(() => {
    if (successDelete && resetDelete) {
      dispatch(resetDelete());
      dispatch(listProducts());
    }
  }, [dispatch, successDelete, resetDelete]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  function handleCreateProduct() {
    history.push('/panel/products/create');
  }

  function handleEditProduct(id: string) {
    history.push(`/panel/products/${id}/edit`);
  }

  function handleDeleteProduct(id: string, name: string) {
    if (window.confirm(`Do you really wanna delete ${name} ?`))
      dispatch(deleteProduct(id));
  }

  return (
    <Container>
      <Options>
        <h1>Products</h1>
        <Button variant="dark" size="lg" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </Options>
      {error && <Message>error.message</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Count in stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product.id}>
                <td>{i + 1}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.rating ? product.rating : 'NRY'}</td>
                <td>{product.price}</td>
                <td>{product.count_in_stock}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleDeleteProduct(product.id, product.name)
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Products;
