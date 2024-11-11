import express, { Request, Response } from "express"
import cors from "cors"
import pool from "../index"
import session from "express-session"

const app = express()
const PORT = 3001

// Middleware 설정
app.use(cors())
app.use(express.json())
app.use(
  session({
    secret: "create-test",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

// DB 연결 확인
pool.connect((err) => {
  if (err) {
    console.error("연결 실패", err)
  } else {
    console.log("연결 성공")
  }
})

// 기본 경로 확인용
app.get("/", (req: Request, res: Response) => {
  res.send("server test")
})

// 사용자 저장 및 세션 설정
app.post("/api/user", async (req: Request, res: Response) => {
  const { username } = req.body
  if (!username) {
    return res.status(400).json({ error: "이름을 입력해주세요" })
  }

  try {
    const query =
      "INSERT INTO make_test_user (username) VALUES ($1) RETURNING *"
    const result = await pool.query(query, [username])

    req.session.username = username // 세션에 username 저장
    res.status(200).json({ success: true, user: result.rows[0] })
    console.log("세션:", req.session)
  } catch (error) {
    console.error("데이터베이스 오류", error)
    res.status(500).json({ error: "서버 오류" })
  }
})

// 세션에서 username 받아오기
app.get("/api/get-username", (req: Request, res: Response) => {
  const username = req.session.username

  if (!username) {
    return res.status(400).json({ error: "세션에 저장된 이름이 없습니다" })
  }
  res.status(200).json({ username: username })
})

// 서버 시작
app.listen(PORT, () => {
  console.log(`server on PORT: ${PORT}`)
})
