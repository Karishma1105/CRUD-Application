import React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const PricingCrud = () => {
  const rows = [
    {
      procedure: "Software testing Book",
      note: "Book",
      price: "₹ 240.00",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1976d2",
          color: "white",
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HomeIcon />
          <Typography variant="h6" fontWeight="bold">
            Pricing
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              color: "#1976d2",
              fontWeight: 600,
            }}
          ></Button>
          <IconButton sx={{ color: "white" }}>
            <HelpOutlineIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ m: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#b3e5fc" }}>
            <TableRow>
              <TableCell>
                <strong>Procedure</strong>
              </TableCell>
              <TableCell>
                <strong>Note</strong>
              </TableCell>
              <TableCell>
                <strong>Price incl taxes (INR)</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell
                  sx={{
                    maxWidth: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.procedure}
                </TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      color="primary"
                      sx={{ border: "1px solid #1976d2" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{ border: "1px solid #d32f2f" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PricingCrud;
