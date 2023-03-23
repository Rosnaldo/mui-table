import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type IProduct = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

export default function App() {
  const [rows, setRows] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/product')
      .then(response => setRows(response.data));
  }, []);

  const handlePopulate = () => {
    axios.post('http://localhost:3000/product/populate');
  }

  const handleUpdateBatch = () => {
    axios.put('http://localhost:3000/product/batch');
  }

  const handleUpdateBatchQueue = () => {
    axios.put('http://localhost:3000/product/batch-queue');
  }

  return (
    <Box>
      <Button onClick={handlePopulate}>populate</Button>
      <Button onClick={handleUpdateBatch}>update batch (protein 100)</Button>
      <Button onClick={handleUpdateBatchQueue}>update batch queue (protein 100)</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}