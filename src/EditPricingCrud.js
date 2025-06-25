import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const procedureOptions = [
  "Fluoroscopic Angiogram",
  "X-Ray",
  "CT Scan",
  "Ultrasound",
];

const taxOptions = [0, 5, 12, 18, 28];

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

  useEffect(() => {
    axios
      .get(
        `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${id}`
      )
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, [id]);

  useEffect(() => {
    const price = parseFloat(form.price) || 0;
    const tax = parseFloat(form.tax) || 0;
    const total = price + (price * tax) / 100;
    setTotalAmount(total.toFixed(2));
  }, [form.price, form.tax]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    <Box
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: "90vw",
          width: "1100px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            py: 1,
            px: 3,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <Typography variant="h6">Edit Procedure</Typography>
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              position: "absolute",
              top: 10,
              right: 16,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

       <FormControl fullWidth>
  <InputLabel>Procedure Name</InputLabel>
  <Select
    name="procedure"
    value={form.procedure}
    onChange={handleChange}
    required
    label="Procedure Name"
    MenuProps={{
      PaperProps: {
        sx: {
        maxHeight: 250,         
         overflowY: 'auto',
        },
      },
    }}
  >
    {procedureOptions.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tax*</InputLabel>
                <Select
                  name="tax"
                  value={form.tax}
                  onChange={handleChange}
                  required
                  label="Tax*"
                >
                  {taxOptions.map((tax) => (
                    <MenuItem key={tax} value={tax}>
                      {tax}%
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                label="Total amount (INR)"
                value={totalAmount}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                label="Notes"
                name="note"
                value={form.note}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/")}
              sx={{
                borderRadius: "20px",
                px: 4,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                borderRadius: "20px",
                px: 4,
                "&:hover": {
                  backgroundColor: "#125aa0",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditPricingCrud;
