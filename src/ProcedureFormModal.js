// ProcedureFormModal.js
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProcedureFormModal = ({ open, onClose, onSubmit, mode, initialData }) => {
  const [form, setForm] = useState({
    procedure: "",
    note: "",
    price: "",
    tax: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (initialData) {
      setForm({
        procedure: initialData.procedure || "",
        note: initialData.note || "",
        price: initialData.price || "",
        tax: initialData.tax || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    const price = parseFloat(form.price) || 0;
    const tax = parseFloat(form.tax) || 0;
    setTotalAmount((price + (price * tax) / 100).toFixed(2));
  }, [form.price, form.tax]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...form, totalAmount };
    onSubmit(finalData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "edit" ? "Edit Procedure" : "Add Procedure"}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            name="procedure"
            label="Procedure"
            value={form.procedure}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="note"
            label="Note"
            value={form.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="price"
            label="Price (₹)"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="tax"
            label="Tax (%)"
            type="number"
            value={form.tax}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Total Amount (₹)"
            value={totalAmount}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {mode === "edit" ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProcedureFormModal;
