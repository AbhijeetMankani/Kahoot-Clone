CREATE DATABASE Shilp24;

-- Install Extension
-- CREATE EXTENSION if not exists "uuid-ossp";
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    pass_hash CHAR(60) NOT NULL
);

CREATE TABLE quizzes (
    quiz_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    host_id uuid NOT NULL,
    quiz_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES users(user_id)
)

CREATE TABLE questions(
    question_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    question text NOT NULL,
    opt text[] NOT NULL,
    correct_opt_index integer NOT NULL,
    PRIMARY KEY(question_id),
    CONSTRAINT questions_user_id_fkey FOREIGN key(user_id) REFERENCES users(user_id)
);