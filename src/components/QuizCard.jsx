"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import QuizOption from "./QuizOption";
import Image from "next/image";

function QuizCard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Cargar preguntas desde el archivo JSON
    fetch("/preguntas.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error al cargar preguntas:", error));
  }, []);

  const handleOptionChange = (optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(optionId)) {
        return prevSelectedOptions.filter((id) => id !== optionId);
      } else {
        return [...prevSelectedOptions, optionId];
      }
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptions([]);
    }
  };

  if (questions.length === 0) return <div>Cargando preguntas...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  const getBackgroundColor = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      return currentQuestion.correctAnswer.includes(optionId)
        ? "bg-green-200" // Correcto
        : "bg-red-200"; // Incorrecto
    }
    return "";
  };

  return (
    <Card className="w-[1200px]">
      <CardHeader>
        <CardTitle>{currentQuestion.title}</CardTitle>
      </CardHeader>
      <CardContent className="m-2 flex items-center">
        {currentQuestion.image && (
          <Image
            height={300}
            width={500}
            src={currentQuestion.image}
            alt="Pregunta"
            className="w-[300px] h-auto mr-8"
          />
        )}
        <ul>
          {currentQuestion.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
              getBackgroundColor={getBackgroundColor}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuizCard;
