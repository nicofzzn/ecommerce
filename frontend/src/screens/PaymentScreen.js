import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart)
  if (!shippingAddress) {
    history.push('/shipping')
  }

  const { userInfo } = useSelector(state => state.userLogin)
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const onSubmitHandler = e => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as='legend'> Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
