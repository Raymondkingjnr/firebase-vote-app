import React from "react";
import { Form } from "react-bootstrap";

export const PaymentForm = ({ formData, handleChange }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of votes</Form.Label>
          <Form.Control
            type="number"
            name="No_votes"
            value={formData.No_votes}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};
