// src/components/QuestionItem.js
import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDelete(id); // Update state in parent (App.js)
        } else {
          throw new Error("Failed to delete question.");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  }

  function handleCorrectAnswerChange(e) {
   // const updatedIndex = parseInt(e.target.value);
   const newCorrectIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdate(updatedQuestion);
      })
      .catch((err) => console.error("Update error:", err));
  }

  return (
    <li>
      <h4>Question: {prompt}</h4>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
