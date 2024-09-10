import express, {Request, Response} from "express";
import cors from "cors"
import pool from "../index"
import session from "express-session";
const app = express();
const PORT = 3001;

app.use(
    session({
        secret: 'create-test',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
        
    })
);

app.get("/", (req: Request, res: Response)=>{
    res.send("server test");
});

app.listen(PORT, () =>{
    console.log(`server on PORT:${PORT}`)

})

app.use(cors());
app.use(express.json());

pool.connect((err) =>{
    if(err) {
        console.error("연결실패", err);
    }else {
        console.log("연결성공");
    }
});

app.post('/api/user', async(req:Request, res:Response)=>{
    // const {username} = req.body;
    // if(!username){
    //     return res.status(400).json({error: '이름을 입력해주세요'});
    // }
    // try{
    //     const query = 'INSERT INTO make_test_user (username) VALUES ($1) RETURNING *';
    //     const result = await pool.query(query, [username]);
    //     res.status(200).json({ success: true, user: result.rows[0]});
    // }catch(error){
    //     console.error('데이터베이스 오류', error);
    //     res.status(500).json({error: '서버 오류'});
    // }
    const {username} = req.body;
    if(!username){
        return res.status(400).json({error:'이름을 입력해주세요'});
    }
    try{
        req.session.username = username;
        res.status(200).json({ success: true, message: '이름이 세션에 저장되었습니다'})
        console.log(req.session);
    }catch(error){
        console.error(error);
        res.send("에러");
    }
    
});



