import { Router as expressRouter } from "express";
const router = expressRouter();

import authorization from "../../middleware/authorization.js";
import pool from "../../db.js";
router.post("/", authorization, async (req, res) => {
	try {
		const { quizName } = req.body;
		const userId = req.userId;

		const newQuiz = await pool.query(
			"INSERT INTO quizzes (host_id, quiz_name) VALUES ($1, $2) RETURNING *",
			[userId, quizName]
		);

		res.json(newQuiz.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

export default router;
