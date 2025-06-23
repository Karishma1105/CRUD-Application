import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { addProcedure } from "./api";

const CreatePricingCrud = () => {
  const [form, setForm] = useState({
    procedure: "",
    note: "",
    price: "",
    tax: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // Update total amount when price or tax changes
  useEffect(() => {
    const price = parseFloat(form.price) || 0;
    const tax = parseFloat(form.tax) || 0;
    const total = price + (price * tax) / 100;
    setTotalAmount(total.toFixed(2));
  }, [form.price, form.tax]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProcedure = { ...form, totalAmount };
      await addProcedure(newProcedure);
      navigate("/");
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper
        elevation={4}
        sx={{ padding: 4, maxWidth: 500, margin: "auto", position: "relative" }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" gutterBottom>
          Add New Procedure
        </Typography>

        <form onSubmit={handleSubmit}>
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

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#6acfc7",
              boxShadow: "0 0 10px #6acfc7",
              "&:hover": {
                backgroundColor: "#00d1b2",
                boxShadow: "0 0 20px #00d1b2",
              },
            }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreatePricingCrud;
