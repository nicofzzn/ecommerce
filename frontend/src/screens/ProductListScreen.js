import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector(state => state.productList)
  const { userInfo } = useSelector(state => state.userLogin)
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = useSelector(state => state.productDelete)
  const {
    success: successCreate,
    error: errorCreate,
    loading: loadingCreate,
    product: createdProduct,
  } = useSelector(state => state.productCreate)

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    history,
    successCreate,
    createdProduct,
  ])

  const deleteHandler = id => {
    dispatch(deleteProduct(id))
  }
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fa fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {errorDelete && <Loader variant='danger'>{errorDelete}</Loader>}
      {errorCreate && <Loader variant='danger'>{errorCreate}</Loader>}
      {loading || loadingDelete || loadingCreate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>BRAND</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
