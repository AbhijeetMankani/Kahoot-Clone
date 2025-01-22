import express from "express";
import cors from "cors";

import auth from "./routes/auth/jwtAuth.js";
import userData from "./routes/auth/userData.js";
import newQuiz from "./routes/quiz/newQuiz.js";
import activateQuiz from "./routes/quiz/activateQuiz.js";
import addQuestion from "./routes/quiz/questions/addQuestion.js";
import editQuestion from "./routes/quiz/questions/editQuestion.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

app.use("/auth", auth);

app.use("/userData", userData);

app.use("/quiz/newQuiz", newQuiz);
app.use("/quiz/activateQuiz", activateQuiz);
app.use("/quiz/question/addQuestion", addQuestion);
app.use("/quiz/question/editQuestion", editQuestion);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
