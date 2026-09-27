import { useEffect, useState } from "react";

import api from "../config/api";
import ClientForm from "../components/ClientForm";

import "./style/Clients.css";

/* REVIEW: This page owns fetching, mutations, form visibility, notifications,
 * and list reconciliation in one component. Consider extracting a resource
 * hook/service and shared CRUD state pattern, then add tests for loading,
 * empty, failed, create, update, delete, and unmount-during-request states. */
const Clients = () => {
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // ==========================================
  // GET - Fetch all clients
  // ==========================================
  const fetchClients = async () => {
    try {
      // REVIEW: Add request cancellation or an active-request guard so a late
      // response cannot update state after navigation/unmount.
      setLoading(true);
      setError("");

      // The Axios interceptor automatically adds the JWT token.
      const response = await api.get("/clients");

      setClients(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load clients."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load clients when the page opens.
  useEffect(() => {
    fetchClients();
  }, []);

  // ==========================================
  // POST - Create client
  // ==========================================
  const handleCreateClient = async (formData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      const response = await api.post("/clients", formData);

      setClients((previousClients) => [
        response.data.data,
        ...previousClients,
      ]);

      setSuccess("Client created successfully.");
      setShowForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create client."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // ==========================================
  // PUT - Update client
  // ==========================================
  const handleUpdateClient = async (formData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/clients/${editingClient.id}`,
        formData
      );

      setClients((previousClients) =>
        previousClients.map((client) =>
          client.id === editingClient.id
            ? response.data.data
            : client
        )
      );

      setSuccess("Client updated successfully.");

      setEditingClient(null);
      setShowForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update client."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // ==========================================
  // DELETE - Delete client
  // ==========================================
  const handleDelete = async (clientId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/clients/${clientId}`);

      setClients((previousClients) =>
        previousClients.filter(
          (client) => client.id !== clientId
        )
      );

      setSuccess("Client deleted successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete client."
      );
    }
  };

  // ==========================================
  // Open create form
  // ==========================================
  const openCreateForm = () => {
    setEditingClient(null);
    setShowForm(true);

    setError("");
    setSuccess("");
  };

  // ==========================================
  // Open edit form
  // ==========================================
  const openEditForm = (client) => {
    setEditingClient(client);
    setShowForm(true);

    setError("");
    setSuccess("");
  };

  // ==========================================
  // Close form
  // ==========================================
  const closeForm = () => {
    setEditingClient(null);
    setShowForm(false);
  };

  // ==========================================
  // Loading state
  // ==========================================
  if (loading) {
    return (
      <main className="clients-page">
        <div className="clients-loading">
          <span className="clients-spinner"></span>
          <p>Loading clients...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="clients-page">

      {/* Page Header */}
      <section className="clients-header">
        <div>
          <span className="clients-eyebrow">
            Management
          </span>

          <h1>Clients</h1>

          <p>
            Manage your clients and keep their information
            organized.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="clients-add-button"
            onClick={openCreateForm}
          >
            <span>+</span>
            Add Client
          </button>
        )}
      </section>

      {/* Success Message */}
      {success && (
        <div className="clients-message clients-message-success">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="clients-message clients-message-error">
          {error}
        </div>
      )}

      {/* Create / Edit Form */}
      {showForm && (
        <section className="clients-form-section">
          <div className="clients-form-header">
            <div>
              <span className="clients-form-eyebrow">
                {editingClient ? "Update" : "New Client"}
              </span>

              <h2>
                {editingClient
                  ? "Edit Client"
                  : "Create Client"}
              </h2>
            </div>

            <button
              type="button"
              className="clients-close-button"
              onClick={closeForm}
              disabled={formLoading}
              aria-label="Close client form"
            >
              ×
            </button>
          </div>

          <ClientForm
            client={editingClient}
            onSubmit={
              editingClient
                ? handleUpdateClient
                : handleCreateClient
            }
            onCancel={closeForm}
            loading={formLoading}
          />
        </section>
      )}

      {/* Clients List */}
      <section className="clients-section">

        <div className="clients-section-header">
          <div>
            <h2>Client List</h2>

            <p>
              {clients.length}{" "}
              {clients.length === 1
                ? "client"
                : "clients"}{" "}
              in your workspace
            </p>
          </div>
        </div>

        {clients.length === 0 ? (
          <div className="clients-empty">
            <div className="clients-empty-icon">
              C
            </div>

            <h3>No clients yet</h3>

            <p>
              Start by adding your first client to your
              workspace.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
            >
              + Add Your First Client
            </button>
          </div>
        ) : (
          <div className="clients-grid">
            {clients.map((client) => (
              <article
                className="client-card"
                key={client.id}
              >
                {/* Client Header */}
                <div className="client-card-header">
                  <div className="client-avatar">
                    {client.name
                      ?.charAt(0)
                      .toUpperCase() || "C"}
                  </div>

                  <div className="client-card-title">
                    <h3>{client.name}</h3>

                    {client.company && (
                      <span>{client.company}</span>
                    )}
                  </div>
                </div>

                {/* Client Information */}
                <div className="client-card-info">
                  <p>
                    <strong>Email</strong>
                    <span>{client.email}</span>
                  </p>

                  {client.phone && (
                    <p>
                      <strong>Phone</strong>
                      <span>{client.phone}</span>
                    </p>
                  )}

                  {client.address && (
                    <p>
                      <strong>Address</strong>
                      <span>{client.address}</span>
                    </p>
                  )}

                  {client.notes && (
                    <p>
                      <strong>Notes</strong>
                      <span>{client.notes}</span>
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="client-card-actions">
                  <button
                    type="button"
                    className="client-edit-button"
                    onClick={() =>
                      openEditForm(client)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="client-delete-button"
                    onClick={() =>
                      handleDelete(client.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Clients;