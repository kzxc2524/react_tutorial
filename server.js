const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'});


app.get('/api/customers', (req, res)=>{
    connection.query(
        "SELECT * FROM CUSTOMER",(err, rows, fields) => {
        res.send(rows);
    });
});


//upload라는 실제 폴더를 image로 보이게함
app.use('/image', express.static('./upload'));

//서버로 데이터 보내기
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)'; //id 값은 중복되지 않게 자동생성 중이기 때문에 null처리
    let image = '/image/' + req.file.filename;
    let name  = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job]; //id 외의 나머지 5개 값의 순서와 변수명
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
    });
});

//*디버깅 메세지는 node 서버 창에서 확인 할 수 있음

app.listen(port, () => console.log(`Listening on port ${port}`));