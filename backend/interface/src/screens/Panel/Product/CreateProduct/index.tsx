import React, { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { Form, Button, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { Container, FormContainer } from './styles';
import { createProduct } from '../../../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import { DefaultState } from '../../../../@types/redux';
import Loader from '../../../../components/Loader';
import Message from '../../../../components/Message';
import { useEffect } from 'react';

const CreateProduct: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const { error, loading, success, reset } = useSelector<typeof ReduxState>(
    state => state.productCreate
  ) as DefaultState<{}>;

  console.log(error);

  useEffect(() => {
    if (success && reset) {
      history.goBack();
      dispatch(reset());
    }
  }, [dispatch, history, success, reset]);

  function handleGoBack() {
    history.goBack();
  }

  return (
    <Container>
      <Button variant="light" size="lg" onClick={handleGoBack}>
        Go back
      </Button>
      <FormContainer>
        {error && <Message variant="danger">{error.message}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{
              name: '',
              brand: '',
              category: '',
              description: '',
              image: undefined,
              price: 0,
              count_in_stock: 0,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required().min(3).max(64),
              description: Yup.string().required().min(12).max(320),
              brand: Yup.string().required().max(36),
              category: Yup.string().required().oneOf(['Electronics']),
              price: Yup.number().required().min(1),
              count_in_stock: Yup.number().required().min(0),
            })}
            onSubmit={(data, helpers) => {
              console.log(data);
              if (!data.image)
                return helpers.setFieldError('image', 'Image is required.');
              const form = new FormData();

              for (let fieldName in data) {
                form.append(fieldName, (data as any)[fieldName]);
              }

              dispatch(createProduct(form));
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

                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.File
                    placeholder="Product's image"
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
                </Form.Group>

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
                      <Form.Control.Feedback type="invalid" className="d-block">
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
        )}
      </FormContainer>
    </Container>
  );
};

export default CreateProduct;
