import { Router as expressRouter } from "express";
const router = expressRouter();

import pool from "../db.js";

router.post("/", authorization, async (req, res) => {
	try {
		const user = await pool.query(
			"SELECT user_id, username, email FROM users WHERE user_id = $1",
			[req.user]
		);
		res.json(user.rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).json("Server Error");
	}
});

export default router;
