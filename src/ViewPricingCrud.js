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
  Drawer,
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
  const [openHelp, setOpenHelp] = useState(false);

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

  const handleAdd = () => {
    setEditMode(false);
    setSelectedData(null);
    setOpenModal(true);
  };

  const handleEdit = (data) => {
    setEditMode(true);
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(
          `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${id}`
        );
        setRows((prev) => prev.filter((row) => row.id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editMode && selectedData?.id) {
        await axios.put(
          `https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures/${selectedData.id}`,
          formData
        );
      } else {
        const dataToAdd = Array.isArray(formData) ? formData : [formData];
        await Promise.all(
          dataToAdd.map((item) =>
            axios.post(
              "https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures",
              item
            )
          )
        );
      }
      fetchProcedures();
      setOpenModal(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", width: "100vw" }}>
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
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
            Add Procedure
          </Button>
          <Tooltip title="Help">
            <IconButton
              onClick={() => setOpenHelp(true)}
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
          sx={{ borderRadius: 2, boxShadow: 3 }}
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
                          sx={{ border: "1px solid #1976d2", color: "#1976d2" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(row.id)}
                          sx={{ border: "1px solid #d32f2f", color: "#d32f2f" }}
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

      {/* Modal */}
      <ProcedureFormDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleModalSubmit}
        editMode={editMode}
        selectedData={selectedData}
      />

      {/* Help Drawer with icons/buttons */}
      <Drawer
        anchor="right"
        open={openHelp}
        onClose={() => setOpenHelp(false)}
        sx={{ "& .MuiDrawer-paper": { width: 350, p: 2 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="body2">
            To use Pricing Feature, Click “Pricing” from settings Menu.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            • View, add, edit and delete procedure pricing details.
          </Typography>

          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            1. Add Procedure details
          </Typography>
          <Typography variant="body2">
            • Click{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Add Procedure
            </Box>
            .
          </Typography>
          <Button
            startIcon={<span>➕</span>}
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
            Add procedure
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            • Enter procedure name, cost, tax, total amount, notes. Add more
            using Add Procedure.
          </Typography>

          <Typography sx={{ mt: 3, fontWeight: "bold" }}>
            2. View Procedure
          </Typography>
          <Typography variant="body2">
            • Click{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              View Icon
            </Box>
            .
          </Typography>
          <Button
            sx={{
              mt: 1,
              borderRadius: "50%",
              minWidth: "unset",
              width: 40,
              height: 40,
              fontSize: 18,
            }}
          >
            👁️
          </Button>

          <Typography sx={{ mt: 3, fontWeight: "bold" }}>
            3. Edit Procedure
          </Typography>
          <Typography variant="body2">
            • Click{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Edit Icon
            </Box>{" "}
            to edit.
          </Typography>
          <Button
            sx={{
              mt: 1,
              borderRadius: "50%",
              minWidth: "unset",
              width: 40,
              height: 40,
              fontSize: 18,
            }}
          >
            ✏️
          </Button>
          <Typography variant="body2" sx={{ mt: 1 }}>
            • Enter new details, then click Save.
          </Typography>
          <Button variant="contained" sx={{ mt: 1, borderRadius: 4, px: 4 }}>
            Save
          </Button>

          <Typography sx={{ mt: 3, fontWeight: "bold" }}>
            4. Delete Procedure
          </Typography>
          <Typography variant="body2">
            • Click{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Delete Icon
            </Box>
            .
          </Typography>
          <Button
            sx={{
              mt: 1,
              border: "1px solid #d32f2f",
              color: "#d32f2f",
              borderRadius: "50%",
              minWidth: "unset",
              width: 40,
              height: 40,
              fontSize: 18,
            }}
          >
            🗑️
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            • Click Yes to delete.
          </Typography>
          <Button variant="contained" sx={{ mt: 1, borderRadius: 4, px: 4 }}>
            Yes
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            • Click No to cancel delete.
          </Typography>
          <Button variant="outlined" sx={{ mt: 1, borderRadius: 4, px: 4 }}>
            No
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ViewPricingCrud;
