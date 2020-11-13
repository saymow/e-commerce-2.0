import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ProductsDefaultInteractionState,
  ProductsListState,
} from '../../../@types/redux/product';
import { deleteProduct, listProducts } from '../../../actions/productActions';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { ReduxState } from '../../../store';
import { Container, DeleteIcon, Options } from './styles';

const Products: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector<typeof ReduxState>(
    state => state.productList
  ) as ProductsListState;

  const {
    error: deleteError,
    success: deleteSuccess,
    reset: deleteReset,
    identifier: deleteIdentifier,
  } = useSelector<typeof ReduxState>(
    state => state.productDelete
  ) as ProductsDefaultInteractionState;

  useEffect(() => {
    if (deleteSuccess && deleteReset) {
      toast.success(`Product ${deleteIdentifier} as deleted successfully.`);
      dispatch(deleteReset());
      dispatch(listProducts());
    }
  }, [dispatch, deleteSuccess, deleteReset, deleteIdentifier]);

  useEffect(() => {
    if (deleteError && deleteReset) {
      toast.error(`Error on deleting ${deleteIdentifier}.`);
      dispatch(deleteReset());
    }
  }, [dispatch, deleteReset, deleteIdentifier, deleteError]);

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
      dispatch(deleteProduct(id, name));
  }

  return (
    <Container>
      <Options>
        <h1>Products</h1>
        <Button variant="dark" size="lg" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </Options>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Qty in stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
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
