import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Generate Storage Data
function createData(id, itemId, name, price, expiryDate) {
  return { id, itemId, name, price, expiryDate };
}

const rows = [
  createData(
    0,
    '10',
    'Shoes',
    13.99,
    'March 22, 2023',
  ),
  createData(
    1,
    '1',
    'Chain',
    99.99,
    'March 22, 2023',
  ),
  createData(
    2,
    '2',
    'Ring',
    101.25,
    'March 22, 2023'
  ),
  createData(
    3,
    '3',
    'Jersey',
    85.99,
    'March 22, 2023',
  ),
  createData(
    4,
    '4',
    'Bottle',
    23.70,
    'March 22, 2023',
  ),
];

export default function MyCart() {
  /*const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch list of items from MySQL database
    axios.get('/api/items').then(response => {
      setItems(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const addItemToCart = (item) => {
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If item already exists, increase quantity by 1
      const updatedCart = cart.map(cartItem => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add to cart with quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (item) => {
    // Filter out the item from the cart
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const updateCartItemQuantity = (item, quantity) => {
    // Update the quantity of the specified item in the cart
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity };
      } else {
        return cartItem;
      }
    });
    setCart(updatedCart);
  };*/

  return (
    <React.Fragment>
      <Title>My Cart</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold", width: '20%' }}>Name</TableCell>
            <TableCell style={{fontWeight:"bold", width: '20%' }}>Price</TableCell>
            <TableCell style={{fontWeight:"bold", width: '30%' }}>Category</TableCell>
            <TableCell style={{fontWeight:"bold", width: '10%' }}>Quantity</TableCell>
            <TableCell style={{fontWeight:"bold", width: '20%' }} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.expiryDate}</TableCell>
              <TableCell>
                <Button style={{ color: '#D6A556' }}><AddIcon></AddIcon></Button>
              </TableCell>
              <TableCell align="right">
                <Button style={{ color: '#D6A556' }}><DeleteIcon></DeleteIcon></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}