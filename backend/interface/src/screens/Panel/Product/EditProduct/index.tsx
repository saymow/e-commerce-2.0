import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Button, Image } from 'react-bootstrap';
import { Formik } from 'formik';

import { Container, FormContainer } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editProduct, showProduct } from '../../../../actions/productActions';
import { ReduxState } from '../../../../store';
import { Product, ProductsShowState } from '../../../../@types/redux/product';
import Loader from '../../../../components/Loader';
import Message from '../../../../components/Message';
import { DefaultState } from '../../../../@types/redux';

const EditProduct: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, product } = useSelector<typeof ReduxState>(
    state => state.productShow
  ) as ProductsShowState;

  const {
    loading: editLoading,
    error: editError,
    success: editSuccess,
    reset: editReset,
  } = useSelector<typeof ReduxState>(
    state => state.productEdit
  ) as DefaultState<{}>;

  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>();

  useEffect(() => {
    if (editSuccess && editReset) {
      dispatch(editReset());
      history.goBack();
    }
  }, [editSuccess, history, dispatch, editReset]);

  useEffect(() => {
    if (!product) return;
    setPreviewImageUrl(product.image);
  }, [product]);

  useEffect(() => {
    dispatch(showProduct(id));
  }, [dispatch, id]);

  function handleGoBack() {
    history.goBack();
  }

  return (
    <Container>
      <Button variant="light" size="lg" onClick={handleGoBack}>
        Go back
      </Button>
      <FormContainer>
        {loading || editLoading ? (
          <Loader />
        ) : error || editError ? (
          <Message>{error?.message || editError?.message}</Message>
        ) : (
          <>
            <Image
              src={previewImageUrl}
              fluid
              thumbnail
              className="w-75 h-75 mx-auto mb-5 d-block"
            />
            <Formik
              initialValues={
                {
                  name: product?.name,
                  description: product?.description,
                  brand: product?.brand,
                  category: product?.category,
                  price: product?.price,
                  count_in_stock: product?.count_in_stock,
                } as Product
              }
              validationSchema={Yup.object().shape({
                name: Yup.string().required().min(3).max(64),
                description: Yup.string().required().min(12).max(320),
                brand: Yup.string().required().max(36),
                category: Yup.string().required().oneOf(['Electronics']),
                price: Yup.number().required().min(1),
                count_in_stock: Yup.number().required().min(0),
              })}
              onSubmit={(data, helpers) => {
                // if (!previewImageUrl)
                //   return helpers.setFieldError('image', 'Image is required.');
                // const form = new FormData();

                // for (let fieldName in data) {
                //   form.append(fieldName, (data as any)[fieldName]);
                // }

                dispatch(editProduct(data, id));
              }}
            >
              {formik => (
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="Product's name"
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      placeholder="Product's brand"
                      {...formik.getFieldProps('brand')}
                    />
                    {formik.touched.brand && formik.errors.brand && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {formik.errors.brand}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      placeholder="Product's category"
                      {...formik.getFieldProps('category')}
                    />
                    {formik.touched.category && formik.errors.category && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {formik.errors.category}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Product's description"
                      {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {formik.errors.description}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.File
                    placeholder="Product's image"
                    feedback={formik.values.image}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.files) return;

                      const file = e.target.files[0];

                      formik.setFieldValue('image', file);
                      setPreviewImageUrl(URL.createObjectURL(file));
                    }}
                  ></Form.File>
                  {previewImageUrl && (
                    <Image
                      src={previewImageUrl}
                      thumbnail
                      alt="Product's image"
                      className="w-50 h-50 m-3"
                    />
                  )}
                  {formik.touched.image && formik.errors.image && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {formik.errors.image}
                    </Form.Control.Feedback>
                  )}
                </Form.Group> */}

                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product's price"
                      {...formik.getFieldProps('price')}
                    />
                    {formik.touched.price && formik.errors.price && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {formik.errors.price}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId="count_in_stock">
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product's count_in_stock"
                      {...formik.getFieldProps('count_in_stock')}
                    />
                    {formik.touched.count_in_stock &&
                      formik.errors.count_in_stock && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {formik.errors.count_in_stock}
                        </Form.Control.Feedback>
                      )}
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default EditProduct;
