import { useState } from "react";
import { Brain, RefreshCw, CheckCircle, XCircle, Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { QuestionCreator } from "./QuestionCreator";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface StudyQuestionsProps {
  selectedFolder: string;
}

export const StudyQuestions = ({ selectedFolder }: StudyQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "What is the limit of (sin x)/x as x approaches 0?",
      options: ["0", "1", "∞", "Does not exist"],
      correctAnswer: 1,
      explanation: "This is a fundamental limit in calculus. As x approaches 0, (sin x)/x approaches 1.",
      difficulty: "medium"
    },
    {
      id: "2", 
      question: "Which of Newton's laws describes the relationship between force, mass, and acceleration?",
      options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
      correctAnswer: 1,
      explanation: "Newton's Second Law states that F = ma, describing the relationship between force, mass, and acceleration.",
      difficulty: "easy"
    },
    {
      id: "3",
      question: "What is the derivative of e^x?",
      options: ["e^x", "x·e^(x-1)", "ln(x)", "1/x"],
      correctAnswer: 0,
      explanation: "The derivative of e^x is e^x itself, which is one of the unique properties of the exponential function.",
      difficulty: "easy"
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showCreator, setShowCreator] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const answerIndex = parseInt(selectedAnswer);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect && !answeredQuestions.has(currentQuestionIndex)) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions(new Set(answeredQuestions).add(currentQuestionIndex));
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowResult(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer("");
      setShowResult(false);
    }
  };

  const handleGenerateQuestions = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "Sample question generated from your notes",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      explanation: "This is a sample explanation for the generated question.",
      difficulty: "medium"
    };
    
    setQuestions([...questions, newQuestion]);
  };

  const handleCreateQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setShowCreator(false);
  };

  if (showCreator) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-academic-primary/5 to-academic-accent/5 p-6">
        <QuestionCreator
          onSave={handleCreateQuestion}
          onCancel={() => setShowCreator(false)}
        />
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const difficultyColor = {
    easy: "text-academic-accent",
    medium: "text-academic-primary", 
    hard: "text-destructive"
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-academic-primary/5 to-academic-accent/5">
      {/* Header */}
      <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-academic-primary">Study Questions</h2>
            <p className="text-muted-foreground">Test your knowledge and identify areas for improvement</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowCreator(true)} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Question
            </Button>
            <Button onClick={handleGenerateQuestions} variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              Generate from Notes
            </Button>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress: {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Score: {score}/{questions.length}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
                <span className={`text-sm font-medium capitalize ${difficultyColor[currentQuestion.difficulty]}`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              <CardDescription className="text-base text-foreground">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <RadioGroup 
                value={selectedAnswer} 
                onValueChange={setSelectedAnswer}
                disabled={showResult}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      className={showResult ? (
                        index === currentQuestion.correctAnswer 
                          ? "border-success text-success" 
                          : index === parseInt(selectedAnswer) 
                            ? "border-destructive text-destructive" 
                            : ""
                      ) : ""}
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className={`flex-1 cursor-pointer p-2 rounded ${
                        showResult ? (
                          index === currentQuestion.correctAnswer 
                            ? "bg-success/10 text-success border border-success/20" 
                            : index === parseInt(selectedAnswer) 
                              ? "bg-destructive/10 text-destructive border border-destructive/20" 
                              : ""
                        ) : "hover:bg-muted"
                      }`}
                    >
                      {option}
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="inline ml-2 h-4 w-4 text-success" />
                      )}
                      {showResult && index === parseInt(selectedAnswer) && index !== currentQuestion.correctAnswer && (
                        <XCircle className="inline ml-2 h-4 w-4 text-destructive" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResult && (
                <div className="mt-6 p-4 bg-academic-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-academic-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-academic-dark mb-1">Explanation</h4>
                      <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              onClick={handlePrevQuestion} 
              variant="outline"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};