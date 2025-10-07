import { useState, useEffect } from "react";
import { Brain, RefreshCw, CheckCircle, XCircle, Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { QuestionCreator } from "./QuestionCreator";
import studyQuestionsHero from "@/assets/study-questions-hero.jpg";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  folder: string;
}

interface StudyQuestionsProps {
  selectedFolder: string;
  onStatsUpdate?: (stats: { questionsAnswered: number; correctAnswers: number }) => void;
}

export const StudyQuestions = ({ selectedFolder, onStatsUpdate }: StudyQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "What is the limit of (sin x)/x as x approaches 0?",
      options: ["0", "1", "∞", "Does not exist"],
      correctAnswer: 1,
      explanation: "This is a fundamental limit in calculus. As x approaches 0, (sin x)/x approaches 1.",
      difficulty: "medium",
      folder: "math"
    },
    {
      id: "2", 
      question: "Which of Newton's laws describes the relationship between force, mass, and acceleration?",
      options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
      correctAnswer: 1,
      explanation: "Newton's Second Law states that F = ma, describing the relationship between force, mass, and acceleration.",
      difficulty: "easy",
      folder: "science"
    },
    {
      id: "3",
      question: "What is the derivative of e^x?",
      options: ["e^x", "x·e^(x-1)", "ln(x)", "1/x"],
      correctAnswer: 0,
      explanation: "The derivative of e^x is e^x itself, which is one of the unique properties of the exponential function.",
      difficulty: "easy",
      folder: "math"
    },
    {
      id: "4",
      question: "In what year did World War II begin?",
      options: ["1937", "1939", "1941", "1942"],
      correctAnswer: 1,
      explanation: "World War II officially began on September 1, 1939, when Germany invaded Poland.",
      difficulty: "easy",
      folder: "history"
    },
    {
      id: "5",
      question: "What is the Pomodoro Technique?",
      options: ["A pasta recipe", "A time management method", "A study location", "A note-taking system"],
      correctAnswer: 1,
      explanation: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length.",
      difficulty: "easy",
      folder: "general"
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Map<string, number>>(new Map());
  const [showCreator, setShowCreator] = useState(false);

  const folderQuestions = questions.filter(q => q.folder === selectedFolder);
  const currentQuestion = folderQuestions[currentQuestionIndex];
  
  // Reset to first question when folder changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
  }, [selectedFolder]);
  
  // Check if current question was already answered and restore its state
  useEffect(() => {
    if (currentQuestion && answeredQuestions.has(currentQuestion.id)) {
      const previousAnswer = answeredQuestions.get(currentQuestion.id);
      setSelectedAnswer(previousAnswer?.toString() || "");
      setShowResult(true);
    } else {
      setSelectedAnswer("");
      setShowResult(false);
    }
  }, [currentQuestionIndex, currentQuestion?.id, answeredQuestions]);
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer || answeredQuestions.has(currentQuestion.id)) return;
    
    const answerIndex = parseInt(selectedAnswer);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }
    
    const newAnswered = new Map(answeredQuestions).set(currentQuestion.id, answerIndex);
    setAnsweredQuestions(newAnswered);
    setShowResult(true);
    
    onStatsUpdate?.({ 
      questionsAnswered: newAnswered.size, 
      correctAnswers: newScore 
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < folderQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      const nextQuestion = folderQuestions[nextIndex];
      if (nextQuestion && answeredQuestions.has(nextQuestion.id)) {
        setSelectedAnswer(answeredQuestions.get(nextQuestion.id)?.toString() || "");
        setShowResult(true);
      } else {
        setSelectedAnswer("");
        setShowResult(false);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      const prevQuestion = folderQuestions[prevIndex];
      if (prevQuestion && answeredQuestions.has(prevQuestion.id)) {
        setSelectedAnswer(answeredQuestions.get(prevQuestion.id)?.toString() || "");
        setShowResult(true);
      } else {
        setSelectedAnswer("");
        setShowResult(false);
      }
    }
  };

  const handleGenerateQuestions = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "Sample question generated from your notes",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      explanation: "This is a sample explanation for the generated question.",
      difficulty: "medium",
      folder: selectedFolder
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

  const progressPercentage = folderQuestions.length > 0 ? ((currentQuestionIndex + 1) / folderQuestions.length) * 100 : 0;
  const difficultyColor = {
    easy: "text-academic-accent",
    medium: "text-academic-primary", 
    hard: "text-destructive"
  };

  // Early return if no current question to prevent undefined errors
  if (!currentQuestion && folderQuestions.length > 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={studyQuestionsHero} 
          alt="Quiz paper with multiple choice questions" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-academic-primary/80 to-academic-accent/60 flex items-center">
          <div className="px-6 space-y-1">
            <h2 className="text-3xl font-bold text-white">
              {selectedFolder.charAt(0).toUpperCase() + selectedFolder.slice(1)} Study Questions
            </h2>
            <p className="text-white/90">{folderQuestions.length} questions in this subject</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
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
            <span>Progress: {currentQuestionIndex + 1} of {folderQuestions.length}</span>
            <span>Score: {score}/{folderQuestions.length}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {folderQuestions.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No questions available</h3>
              <p>Create or generate questions for this subject to get started</p>
            </div>
          ) : (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
                    {currentQuestion && (
                      <span className={`text-sm font-medium capitalize ${difficultyColor[currentQuestion.difficulty]}`}>
                        {currentQuestion.difficulty}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-base text-foreground">
                    {currentQuestion?.question}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <RadioGroup 
                    value={selectedAnswer} 
                    onValueChange={setSelectedAnswer}
                    disabled={showResult}
                    className="space-y-3"
                  >
                    {currentQuestion?.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`option-${index}`}
                          className={showResult && currentQuestion ? (
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
                            showResult && currentQuestion ? (
                              index === currentQuestion.correctAnswer 
                                ? "bg-success/10 text-success border border-success/20" 
                                : index === parseInt(selectedAnswer) 
                                  ? "bg-destructive/10 text-destructive border border-destructive/20" 
                                  : ""
                            ) : "hover:bg-muted"
                          }`}
                        >
                          {option}
                          {showResult && currentQuestion && index === currentQuestion.correctAnswer && (
                            <CheckCircle className="inline ml-2 h-4 w-4 text-success" />
                          )}
                          {showResult && currentQuestion && index === parseInt(selectedAnswer) && index !== currentQuestion.correctAnswer && (
                            <XCircle className="inline ml-2 h-4 w-4 text-destructive" />
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {showResult && currentQuestion && (
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
                      {currentQuestionIndex === folderQuestions.length - 1 ? "Finish" : "Next Question"}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};