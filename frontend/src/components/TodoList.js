import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState, useEffect } from 'react';

// Generate Orders Data
function createData(id, task, priority) {
  return { id, task, priority };
}

const rows = [
  createData(
    0,
    'Order shirts',
    'low',
  ),
  createData(
    1,
    'Order shoes',
    'high',
    866.99,
  ),
];

export default function TodoList() {
  const [post, setPost] = useState([]);

  useEffect(() =>  {
    fetch('http://localhost:4000/employee', { mode: 'no-cors' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>To do List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Task</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.task} {post.map((book => (
                <div className='book'>
                  {book.email}
                </div>
              )
              ))}</TableCell>
              <TableCell align="right">{row.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}