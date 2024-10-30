const express = require('express');
const path = require('path');
const posterRoutes = require('./routes/posterRoutes');

const app = express();
const port = 3001;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../AC-Front/dist')));
app.use(posterRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../AC-Front/dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});