import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const port = 4000;
const db = mysql.createConnection({
  host: "localhost",
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: "storagesystem",
});

app.get("/employees", (req, res) => {
  const q = "SELECT * FROM employee";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/customers", (req, res) => {
  const q = "SELECT * FROM customer";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/employees/create/:email/:firstName/:lastName/:password",
  (req, res) => {
    const Email = req.params.email;
    const FirstName = req.params.firstName;
    const LastName = req.params.lastName;
    const PasswordE = req.params.password;

    db.query(
      "SELECT * FROM employee WHERE Email = ?",
      [Email],
      (error, results, fields) => {
        if (error) {
          res.status(500).send(error);
        } else if (results.length > 0) {
          res.status(409).send("Email already exists");
        } else {
          db.query(
            "INSERT INTO employee (Email, FirstName, LastName, PasswordE) VALUES (?, ?, ?, ?)",
            [Email, FirstName, LastName, PasswordE],
            (error, results, fields) => {
              if (error) {
                res.status(500).send(error);
              } else {
                res.status(201).send("Employee created successfully");
              }
            }
          );
        }
      }
    );
  }
);

app.post("/customers/create/:email/:firstName/:lastName/:password",
  (req, res) => {
    // const { Email, FirstName, LastName, PasswordE } = req.body;
    const Email = req.params.email;
    const FirstName = req.params.firstName;
    const LastName = req.params.lastName;
    const PasswordC = req.params.password;
    db.query(
      "INSERT INTO customer (ClientEmail, FirstName, LastName, ClientPassword) VALUES (?, ?, ?, ?)",
      [Email, FirstName, LastName, PasswordC],
      (error, results, fields) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(201).send("Customer created successfully");
        }
      }
    );
  }
);

app.post("/customers/create/cart/:client_email", (req, res) => {
  const ClientEmail = req.params.client_email;
  const now = new Date();
  const currentDate = now.toISOString().slice(0, 10);
  const currentTime = now.toTimeString().slice(0, 8);
  db.query("SELECT MAX(CartID) AS max_id FROM cart", (err, data) => {
    if (err) return res.json(err);
    const newId = data[0].max_id + 1;
    const newRecord = {
      CartId: newId,
      ClientEmail: ClientEmail,
      DateSold: currentDate,
      TimeSold: currentTime,
    };

    db.query("INSERT INTO cart SET ?", newRecord, (err1, res2) => {
      if (err1) {
        res.status(500).send(err);
      } else {
        // res1.status(201).send('Customer created successfully');
        res.status(201).json([{ entry_id: newId }]);
      }
    });
    console.log(`New record inserted with CartId ${newId}`);
  });
});

app.post("/itemslist/add/:cart_id/:item_id/:quantity_sold", (req, res) => {
  const cartID = parseInt(req.params.cart_id);
  const itemID = parseInt(req.params.item_id);
  const quantitySold = parseInt(req.params.quantity_sold);
  const newRecord = {
    CartID: cartID,
    ItemID: itemID,
    QuantitySold: quantitySold,
  };
  db.query("INSERT INTO itemslist SET ?", newRecord, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Entry added to itemslist successfully");
    }
  });
});

app.put("/storage/update/:cart_id", (req, res) => {
  const cartId = parseInt(req.params.cart_id);
  //get where cart id = cartID and then group by item id, then loop through and decrement storage.
  const q = `UPDATE mainstorage s
    JOIN (
      SELECT ItemID, SUM(Quantitysold) AS total_sold
      FROM itemslist
      WHERE cartID = ?
      GROUP BY ItemID
    ) i ON s.ItemID = i.ItemID 
    SET s.AmountStored = s.AmountStored - i.total_sold;`;

  db.query(q, [cartId], (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Storage updated successfully");
    }
  });
});

app.post('/report/create/:cart_id', (req, res) => {
    const cart_id = req.params.cart_id;
    db.query('SELECT MAX(ReportID) as max_rep FROM report', (err, data) => {
        if (err) return res.json(err)
        const report_id = (data[0].max_rep) + 1
        const q = `
        INSERT INTO report (ReportID, QuantitySold, CartID)
        SELECT ?, i.total_sold, i.CartID
        FROM (
            SELECT CartID, SUM(Quantitysold) AS total_sold
            FROM itemslist
            where CartID = ?
            group by CartID
        )i;`
        db.query(q, [report_id, cart_id], (err1, data2) => {
            if (err1) {
                res.status(500).send(err);
              } else {
                res.status(201).send('New Report successfully created');
              }
        })
    })
})

app.put('/storage/purchase/:item_id/:amount_purchased', (req, res) => {
    const item_id = req.params.item_id;
    const amount_purchased = req.params.amount_purchased;
    const q = `
    UPDATE mainstorage
    SET AmountStored = AmountStored + ?
    WHERE ItemID = ?;`;
    db.query(q, [amount_purchased, item_id], (err, data) => {
        if (err) return res.status(500).send(err)
        res.status(201).send('Storage successfully updated')
    })
})


app.get("/storage", (req, res) => {
  const q = `
    SELECT DISTINCT mainstorage.*, item.*, COALESCE(edible.expiry, 'N/A') as expiry 
    FROM mainstorage 
    JOIN Item ON mainstorage.ItemID = Item.ItemID 
    LEFT JOIN edible ON mainstorage.ItemID = edible.ItemID`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/orders", (req, res) => {
  const { email, start_date, end_date, start_time, end_time } = req.query;
  let q;

  if (email) {
    q = `
      SELECT cart.*, revenue.TotalRevenue 
      FROM cart JOIN customer ON cart.ClientEmail = customer.ClientEmail 
      JOIN (SELECT CartID, SUM(QuantitySold * Price) AS TotalRevenue 
      FROM itemslist JOIN item ON itemslist.ItemID = item.ItemID GROUP BY CartID) revenue ON cart.CartID = revenue.CartID 
      WHERE cart.ClientEmail = ?`;
  } else {
    q = `
      SELECT cart.*, customer.* 
      FROM cart JOIN customer ON cart.ClientEmail = customer.ClientEmail`;
  }

  const queryParams = [];

  if (email) {
    queryParams.push(email);
  }

  if (start_date && end_date) {
    q += " AND cart.DateSold BETWEEN ? AND ?";
    queryParams.push(start_date, end_date);
  } else if (start_date) {
    q += " AND cart.DateSold >= ?";
    queryParams.push(start_date);
  } else if (end_date) {
    q += " AND cart.DateSold <= ?";
    queryParams.push(end_date);
  }

  if (start_time && end_time) {
    q += " AND TIME(cart.TimeSold) BETWEEN ? AND ?";
    queryParams.push(start_time, end_time);
  } else if (start_time) {
    q += " AND TIME(cart.TimeSold) >= ?";
    queryParams.push(start_time);
  } else if (end_time) {
    q += " AND TIME(cart.TimeSold) <= ?";
    queryParams.push(end_time);
  }

  q += " ORDER BY cart.DateSold DESC";

  db.query(q, queryParams, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/reports", (req, res) => {
  const q = `
    SELECT report.*, cart.ClientEmail, SUM(item.Price * itemslist.QuantitySold) AS TotalRevenue
    FROM report
    INNER JOIN cart ON report.CartID = cart.CartID
    INNER JOIN itemslist ON cart.CartID = itemslist.CartID
    INNER JOIN item ON itemslist.ItemID = item.ItemID
    GROUP BY report.ReportID`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/suppliers", (req, res) => {
  const q = `
    SELECT DISTINCT supplier.*, item.* 
    FROM supplier INNER JOIN supplieritems ON supplier.SupplierID = supplieritems.SupplierID 
    INNER JOIN item ON supplieritems.ItemID = item.ItemID`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/items", (req, res) => {
  const q = `
    SELECT DISTINCT mainstorage.*, item.ItemName, item.Price, item.Category 
    FROM mainstorage 
    LEFT JOIN Item ON mainstorage.ItemID = Item.ItemID`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/todo", (req, res) => {
  const query = `
    SELECT DISTINCT mainstorage.*, item.ItemName, item.Price, item.Category 
    FROM mainstorage 
    LEFT JOIN Item ON mainstorage.ItemID = Item.ItemID
    WHERE mainstorage.AmountStored <= ?`;

  db.query(query, [15], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log("backend listening on port", port);
});
