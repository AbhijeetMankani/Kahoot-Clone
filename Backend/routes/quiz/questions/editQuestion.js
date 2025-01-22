import { Router as expressRouter } from "express";
const router = expressRouter();

import authorization from "../../../middleware/authorization.js";
import pool from "../../../db.js";

// TODO: Add seperate endpoint functions for each edit, like only editing question, or only changing given parameters

router.post("/", authorization, async (req, res) => {
	try {
		const { questionId, question, options, correctOptionIndex } = req.body;
		const userId = req.userId;

		const updatedQuestion = await pool.query(
			"UPDATE questions SET question = $1, opt = $2, correct_opt_index = $3 WHERE question_id = $4 and user_id = $5  RETURNING *",
			[question, options, correctOptionIndex, questionId, userId]
		);

		res.json(updatedQuestion.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

export default router;
