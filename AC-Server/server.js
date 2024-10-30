const express = require('express');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const port = 3001;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../AC-Front/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../AC-Front/dist/index.html'));
})

// 모든 IP에서 접근 가능하도록 구성
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
})

// SQLite 데이터 베이스 설정
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        db.run(`PRAGMA busy_timeout = 60000`); // 60초 대기
        db.run(`CREATE TABLE IF NOT EXISTS posters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            startDate TEXT,
            endDate TEXT,
            title TEXT,
            poster TEXT,
            password TEXT,
            uploadDate TEXT
        )`);
    }
});

// 파일 업로드 및 데이터 저장 엔드포인트

app.post('/upload', upload.single('poster'), (req, res) => {
    const file = req.file;

    if(!file){
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const filePath = path.join(__dirname, 'uploads', file.filename);

    // 로컬 디렉토리에 저장
    fs.rename(file.path, filePath, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Failed to upload file.' });
        }

        // SQLite 에 메타데이터 저장
        const uploadDate = new Date().toISOString();
        const { name, phone, startDate, endDate, title, password } = req.body;
        db.run(`INSERT INTO posters (name, phone, startDate, endDate, title, poster, password, uploadDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, phone, startDate, endDate, title, filePath, password, uploadDate], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Failed to save metadata.' });
            }
            return res.status(200).json({ message: 'File uploaded and metadata saved.' });
        });
    });
});
