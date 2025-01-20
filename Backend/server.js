import express from "express";
import cors from "cors";

import auth from "./routes/auth/jwtAuth.js";
import userData from "./routes/auth/userData.js";
import newQuiz from "./routes/quiz/newQuiz.js";
import addQuestion from "./routes/quiz/addQuestion.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

app.use("/auth", auth);

app.use("/userData", userData);

app.use("/quiz/newQuiz", newQuiz);
app.use("/quiz/addQuestion", addQuestion);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
