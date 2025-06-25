import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import ProcedureFormDialog from "./ProcedureFormDialog";

const ViewPricingCrud = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const fetchProcedures = async () => {
    try {
      const res = await axios.get(
        "https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures"
      );
      setRows(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, []);

  const handleEdit = (data) => {
    console.log("data", data);
    setEditMode(true);
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        await axios.delete(
          `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${id}`
        );
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedData(null);
    setOpenModal(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editMode && selectedData?.id) {
        await axios.put(
          `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${selectedData.id}`,
          formData
        );
      } else {
        await axios.post(
          "https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures",
          formData
        );
      }
      fetchProcedures();
      setOpenModal(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          bgcolor: "#1976d2",
          color: "#fff",
          borderBottom: "2px solid #1565c0",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HomeIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold">
            Pricing
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              borderRadius: 8,
              backgroundColor: "#ffffff",
              color: "#1976d2",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            Add Procedure
          </Button>
          <Tooltip title="Help">
            <IconButton
              sx={{
                backgroundColor: "#ffffff",
                color: "#1976d2",
                borderRadius: "50%",
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflowX: "auto",
            maxWidth: "100%",
            mx: "auto",
            boxShadow: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b3e5fc" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Procedure</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Note</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Price incl taxes(INR)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
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
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEdit(row)}
                          sx={{
                            border: "1px solid #1976d2",
                            color: "#1976d2",
                            borderRadius: "50%",
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(row.id)}
                          sx={{
                            border: "1px solid #d32f2f",
                            color: "#d32f2f",
                            borderRadius: "50%",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No procedures found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for Create/Edit */}
      <ProcedureFormDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleModalSubmit}
        editMode={editMode}
        selectedData={selectedData}
      />
    </Box>
  );
};

export default ViewPricingCrud;
