// src/components/ContactForm.js
import React, { useState } from "react";

const API_URL = "https://www.greatfrontend.com/api/questions/contact-form";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  message: "",
};

// Status values used to drive the feedback banner under the form.
const STATUS = {
  IDLE: "idle",
  SUCCESS: "success",
  ERROR: "error",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [statusMessage, setStatusMessage] = useState("");

  // Single change handler for all fields, keyed by the input's "name" attribute.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default page refresh

    setIsSubmitting(true);
    setStatus(STATUS.IDLE);
    setStatusMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Success: reset form and show confirmation.
      setFormData(INITIAL_FORM_STATE);
      setStatus(STATUS.SUCCESS);
      setStatusMessage("Message sent successfully!");
    } catch (error) {
      // Covers both non-OK responses and network failures (fetch rejects on network errors).
      setStatus(STATUS.ERROR);
      setStatusMessage(
        "Something went wrong while sending your message. Please try again."
      );
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-card">
      <h1 className="contact-form-title">Contact Us</h1>
      <p className="contact-form-subtitle">
        We'd love to hear from you. Send us a message below.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows={5}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {status === STATUS.SUCCESS && (
          <p className="status-message status-success">{statusMessage}</p>
        )}

        {status === STATUS.ERROR && (
          <p className="status-message status-error">{statusMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
