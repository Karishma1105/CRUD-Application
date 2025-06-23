import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const EditPricingCrud = () => {
  const [form, setForm] = useState({
    procedure: "",
    note: "",
    price: "",
    tax: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch procedure by ID
  useEffect(() => {
    axios
      .get(
        `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${id}`
      )
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Fetch Error:", err));
  }, [id]);

  // Recalculate total whenever price or tax changes
  useEffect(() => {
    const price = parseFloat(form.price) || 0;
    const tax = parseFloat(form.tax) || 0;
    const total = price + (price * tax) / 100;
    setTotalAmount(total.toFixed(2));
  }, [form.price, form.tax]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { ...form, totalAmount };
    try {
      await axios.put(
        `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${id}`,
        updatedData
      );
      navigate("/");
    } catch (err) {
      console.error("Update Error:", err);
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
          Edit Procedure
        </Typography>

        <form onSubmit={handleUpdate}>
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
            Update
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditPricingCrud;
