import { useEffect, useState } from "react";

import "./style/ClientForm.css";

/* REVIEW: This form owns field state but delegates all validation to HTML/API.
 * Add explicit length/type feedback and a stable field namespace if multiple
 * forms can coexist, then test edit-to-create reset behavior. */
const ClientForm = ({
  client = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    notes: "",
  });

  // Populate the form when editing an existing client.
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        company: client.company || "",
        address: client.address || "",
        notes: client.notes || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        notes: "",
      });
    }
  }, [client]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(formData);
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <div className="client-form-grid">
        {/* Client name */}
        <div className="client-form-field">
          <label htmlFor="name">
            Name <span>*</span>
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter client name"
            autoComplete="name"
            disabled={loading}
            required
          />
        </div>

        {/* Client email */}
        <div className="client-form-field">
          <label htmlFor="email">
            Email <span>*</span>
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="client@example.com"
            autoComplete="email"
            disabled={loading}
            required
          />
        </div>

        {/* Phone number */}
        <div className="client-form-field">
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            autoComplete="tel"
            disabled={loading}
          />
        </div>

        {/* Company */}
        <div className="client-form-field">
          <label htmlFor="company">Company</label>

          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            autoComplete="organization"
            disabled={loading}
          />
        </div>

        {/* Address */}
        <div className="client-form-field client-form-field-full">
          <label htmlFor="address">Address</label>

          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter client address"
            autoComplete="street-address"
            disabled={loading}
          />
        </div>

        {/* Additional notes */}
        <div className="client-form-field client-form-field-full">
          <label htmlFor="notes">Notes</label>

          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional information about this client..."
            rows="4"
            disabled={loading}
          />
        </div>
      </div>

      <div className="client-form-footer">
        <p className="client-form-required">
          <span>*</span> Required fields
        </p>

        <div className="client-form-actions">
          {client && (
            <button
              type="button"
              className="client-form-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="client-form-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="client-form-spinner"></span>
                Saving...
              </>
            ) : client ? (
              "Update Client"
            ) : (
              "Create Client"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;