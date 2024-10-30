const db = require('../models/posterModel');

exports.getPosters = (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const sql = `SELECT startDate, endDate, title, poster FROM posters WHERE startDate <= ? AND endDate >= ?`;

    db.all(sql, [currentDate, currentDate], (err, rows) => {
        if (err) {
            console.error('데이터베이스 에러:', err);
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};

exports.updatePoster = (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const sql = `SELECT password FROM posters WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Database error.' });
        }

        if (!row) {
            return res.status(404).json({ message: 'Poster not found.' });
        }

        if (row.password !== password) {
            return res.status(403).json({ message: 'Incorrect password.' });
        }

        const filePath = `uploads/${file.filename}`;
        const updateSql = `UPDATE posters SET poster = ? WHERE id = ?`;
        db.run(updateSql, [filePath, id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Failed to update metadata.' });
            }
            return res.status(200).json({ message: 'File updated and metadata saved.' });
        });
    });
};

exports.searchPoster = (req, res) => {
    const {query} = req.query;
    const sql = `SELECT title, poster FROM posters WHERE title LIKE ?`;
    db.all(sql, [`%${query}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);
    });
};