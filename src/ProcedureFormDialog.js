import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const ProcedureFormDialog = ({
  open,
  onClose,
  onSubmit,
  editMode,
  selectedData,
}) => {
  const [procedures, setProcedures] = useState([
    { procedure: "", price: "", tax: "", totalAmount: "", note: "" },
  ]);

  useEffect(() => {
    if (editMode && selectedData) {
      setProcedures([
        {
          procedure: selectedData.procedure ?? "",
          price: selectedData.price ?? "",
          tax: selectedData.tax ?? "",
          totalAmount: selectedData.totalAmount ?? "",
          note: selectedData.note ?? "",
        },
      ]);
    } else {
      setProcedures([
        { procedure: "", price: "", tax: "", totalAmount: "", note: "" },
      ]);
    }
  }, [editMode, selectedData]);

  const calculateTotalAmount = (priceStr, taxStr) => {
    const price = parseFloat(priceStr) || 0;
    const tax = parseFloat(taxStr) || 0;
    return (price + price * (tax / 100)).toFixed(2); // returns string
  };

  const handleChange = (index, field, value) => {
    const updated = [...procedures];
    updated[index][field] = value;

    if (field === "price" || field === "tax") {
      updated[index].totalAmount = calculateTotalAmount(
        updated[index].price,
        updated[index].tax
      );
    }
    setProcedures(updated);
  };

  const handleAddRow = () => {
    setProcedures((prev) => [
      ...prev,
      { procedure: "", price: "", tax: "", totalAmount: "", note: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setProcedures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (editMode) {
      onSubmit(procedures[0]);
    } else {
      onSubmit(procedures);
    }
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: 1000,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 5,
        p: 0,
        zIndex: 1300,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          px: 2,
          py: 1.5,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>{editMode ? "Edit Procedure" : "Add Procedure"}</strong>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 3 }}>
        {procedures.map((item, index) => (
          <Grid container spacing={2} alignItems="center" mb={1} key={index}>
            <Grid item xs={12} sm={2}>
              <TextField
                placeholder="Procedure Name"
                value={item.procedure}
                onChange={(e) =>
                  handleChange(index, "procedure", e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                placeholder="Tax (%)"
                value={item.tax}
                onChange={(e) => handleChange(index, "tax", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                placeholder="Total amount(INR)"
                value={item.totalAmount}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                placeholder="Notes"
                value={item.note}
                onChange={(e) => handleChange(index, "note", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              {!editMode && index > 0 && (
                <IconButton
                  onClick={() => handleRemoveRow(index)}
                  sx={{ color: "red" }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        {!editMode && (
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddRow}
            sx={{
              mt: 1,
              backgroundColor: "#e5f6ff",
              color: "#1976d2",
              fontWeight: "bold",
              textTransform: "none",
              px: 2,
              borderRadius: 4,
              "&:hover": { backgroundColor: "#cceeff" },
            }}
          >
            Add Procedure
          </Button>
        )}

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcedureFormDialog;
