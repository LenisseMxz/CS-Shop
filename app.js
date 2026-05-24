const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const auth = require('./routes/auth.js');
const client = require('./routes/client.js');
const admin = require('./routes/admin.js');

//Se le asigan una rurta base
app.use('/api/auth', auth);
app.use('/api/client', client);
app.use('/api/admin', admin);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
