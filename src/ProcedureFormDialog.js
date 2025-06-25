import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProcedureFormDialog = ({
  open,
  onClose,
  onSubmit,
  selectedData,
  editMode,
}) => {
  const [formData, setFormData] = useState({
    procedure: "",
    price: "",
    tax: "",
    totalAmount: "",
    note: "",
  });

  useEffect(() => {
    if (editMode && selectedData) {
      setFormData(selectedData);
    } else {
      setFormData({
        procedure: "",
        price: "",
        tax: "",
        totalAmount: "",
        note: "",
      });
    }
  }, [editMode, selectedData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const price = parseFloat(name === "price" ? value : formData.price) || 0;
    const tax = parseFloat(name === "tax" ? value : formData.tax) || 0;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      totalAmount: (price + (price * tax) / 100).toFixed(2),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: "#1976d2",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          {editMode ? "Edit Procedure" : "Add Procedure"}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            flexWrap: "wrap",
            paddingTop: "20px",
          }}
        >
          <TextField
            label="Procedure Name"
            name="procedure"
            value={formData.procedure}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ minWidth: 180 }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Tax (%)"
            name="tax"
            type="number"
            value={formData.tax}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Total Amount (INR)"
            name="totalAmount"
            type="number"
            value={formData.totalAmount}
            InputProps={{ readOnly: true }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 160 }}
          />
          <TextField
            label="Notes"
            name="note"
            value={formData.note}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#1976d2" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProcedureFormDialog;
