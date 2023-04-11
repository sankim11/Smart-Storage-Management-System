import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useState, useEffect } from "react";
import { TableFooter } from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";

export default function TodoList() {
  const [todo, setTodo] = useState([]);

  // Fetch the to-do items from the backend using
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/todo");
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Determine the priority of the to-do item based on the amount stored
  const getPriority = (amountStored) => {
    if (amountStored >= 1 && amountStored <= 5) {
      return "high";
    } else if (amountStored >= 6 && amountStored <= 10) {
      return "medium";
    } else if (amountStored >= 11 && amountStored <= 15) {
      return "low";
    }
  };

  // Determine the color of the priority label based on the priority level
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "gold";
      case "high":
        return "red";
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      <Title>To do List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Task</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todo.map((task, index) => {
            const priority = getPriority(task.AmountStored);
            return (
              <TableRow key={`${task.ItemID}-${index}`}>
                <TableCell>
                  {task.ItemName}
                </TableCell>
                <TableCell align="right" style={{ color: getPriorityColor(priority) }}>
                  {priority}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableCell>
            <Link
              href="/suppliers"
              variant="body2"
              style={{ color: "black", fontStyle: "italic" }}
              sx={{ fontSize: "0.75rem" }}
            >
              Go to Suppliers Items
            </Link>
          </TableCell>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}