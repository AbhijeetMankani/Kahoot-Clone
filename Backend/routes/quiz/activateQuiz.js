import { Router as expressRouter } from "express";
const router = expressRouter();

import authorization from "../../../middleware/authorization.js";
import pool from "../../../db.js";
router.post("/activateQuiz", authorization, async (req, res) => {
	try {
		const { quizId } = req.body;
		const userId = req.userId;

		const quiz = await pool.query(
			"SELECT * FROM quizzes WHERE quiz_id = $1",
			(quizId, userId)
		);

		if (quiz.rows.length == 0) {
			res.status(404).send("Quiz not found");
		} else if (quiz.rows[0]["user_id"] != userId) {
			res.status(401).send("Unauthorized User");
		} else {
			const activeQuiz = await pool.query(
				"INSERT INTO active_quiz ( host_id, quiz_id ) VALUES ($1, $2) RETURNING *",
				(userId, quizId)
			);
			res.json(activeQuiz.rows[0]);
		}

		// const quiz = await pool.query(
		// 	"UPDATE quizzes SET question_ids = array_append(question_ids, $1) WHERE quiz_id = $2 RETURNING *",
		// 	[questionId, quizId]
		// );
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

export default router;
