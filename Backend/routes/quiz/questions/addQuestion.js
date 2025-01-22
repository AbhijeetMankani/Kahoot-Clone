import { Router as expressRouter } from "express";
const router = expressRouter();

import authorization from "../../../middleware/authorization.js";
import pool from "../../../db.js";
router.post("/", authorization, async (req, res) => {
	try {
		const { quizId, question, options, correctOptionIndex } = req.body;
		const userId = req.userId;

		const newQuestion = await pool.query(
			"INSERT INTO questions (user_id, question, opt, correct_opt_index) VALUES ($1, $2, $3, $4) RETURNING *",
			[userId, question, options, correctOptionIndex]
		);

		const questionId = newQuestion.rows[0]["question_id"];

		const quiz = await pool.query(
			"UPDATE quizzes SET question_ids = array_append(question_ids, $1) WHERE quiz_id = $2 RETURNING *",
			[questionId, quizId]
		);

		res.json(quiz.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

export default router;
