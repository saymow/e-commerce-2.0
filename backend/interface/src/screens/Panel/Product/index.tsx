import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Table as BsTable } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Product,
  ProductsDefaultInteractionState,
  ProductsListState,
} from '../../../@types/redux/product';
import { deleteProduct, listProducts } from '../../../actions/productActions';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { ReduxState } from '../../../store';
import { Container, DeleteIcon, Options } from './styles';
import { priceFormatter } from '../../../utils';
import Table, { Row } from '../../../components/Table';

const COLUMNS = {
  count: '#',
  name: 'Name',
  brand: 'Brand',
  category: 'Category',
  rating: 'Rating',
  price: 'Price',
  qty: 'Qty in stock',
  edit: 'Edit',
  delete: 'Delete',
};

const makeRows = (
  products: Product[],
  handleDeleteProduct: (id: string, name: string) => void,
  handleEditProduct: (id: string) => void
): Array<Row<typeof COLUMNS>> => {
  return products.map((product, index) => ({
    count: index + 1,
    name: product.name,
    brand: product.brand,
    category: product.category,
    rating: product.rating ? product.rating : 'NRY',
    price: priceFormatter(product.price),
    qty: product.count_in_stock,
    edit: (
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleEditProduct(product.id)}
      >
        Edit
      </Button>
    ),
    delete: (
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleDeleteProduct(product.id, product.name)}
      >
        <DeleteIcon />
      </Button>
    ),
  }));
};

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

  const handleEditProduct = useCallback(
    (id: string) => {
      history.push(`/panel/products/${id}/edit`);
    },
    [history]
  );

  const handleDeleteProduct = useCallback(
    (id: string, name: string) => {
      if (window.confirm(`Do you really wanna delete ${name} ?`))
        dispatch(deleteProduct(id, name));
    },
    [dispatch]
  );

  const rows = useMemo(
    () => makeRows(products ?? [], handleDeleteProduct, handleEditProduct),
    [handleDeleteProduct, handleEditProduct, products]
  );

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
        <Table columns={COLUMNS} idColumn="name" rows={rows} />
      )}
    </Container>
  );
};

export default Products;
