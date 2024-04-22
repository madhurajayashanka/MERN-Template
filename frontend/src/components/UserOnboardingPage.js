import React, { useState } from 'react';
import { Button, Col, Form, Row, Toast } from 'react-bootstrap';
import Axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

const UserOnboardingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
  });
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      mobileNumber: '',
    });
    setValidated(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        if (formData.mobileNumber.length !== 10) {
          alert('Phone number should have exactly 10 digits.');
          return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(formData.dateOfBirth);
        if (selectedDate > currentDate) {
          alert('Date of birth cannot be after the current date.');
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
          alert('Token not found. Please login.');
          return;
        }

        const response = await Axios.post(`${API_URL}/users/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Save data:', response.data);
        setShowToast(true);
        handleClear(); 
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setValidated(true);
  };

  return (
    <div>
      <h2>User Onboarding</h2>
      <Form noValidate validated={validated} onSubmit={handleSave}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid date of birth.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">Please select a gender.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
            />
            <Form.Control.Feedback type="invalid">Please provide a valid mobile number.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>{' '}
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Toast.Body>Your data has been saved.</Toast.Body>
      </Toast>
    </div>
  );
};

export default UserOnboardingForm;
