import { useState } from "react";
import { Plus, RotateCcw, Check, X, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface FlashcardViewProps {
  selectedFolder: string;
}

export const FlashcardView = ({ selectedFolder }: FlashcardViewProps) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: "1",
      question: "What is the derivative of x²?",
      answer: "The derivative of x² is 2x",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      question: "State Newton's First Law of Motion",
      answer: "An object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force.",
      createdAt: "2024-01-14"
    }
  ]);

  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleCreateFlashcard = () => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question: "",
      answer: "",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setFlashcards([newCard, ...flashcards]);
    setEditingCard(newCard.id);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleSaveCard = (cardId: string) => {
    setFlashcards(flashcards.map(card => 
      card.id === cardId 
        ? { ...card, question: newQuestion, answer: newAnswer }
        : card
    ));
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId: string) => {
    setFlashcards(flashcards.filter(card => card.id !== cardId));
    if (editingCard === cardId) {
      setEditingCard(null);
    }
  };

  const handleStartStudy = () => {
    if (flashcards.length > 0) {
      setStudyMode(true);
      setCurrentCardIndex(0);
      setShowAnswer(false);
    }
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (studyMode && flashcards.length > 0) {
    const currentCard = flashcards[currentCardIndex];
    
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-academic-primary/5 to-academic-accent/5">
        <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-academic-primary">Study Mode</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {currentCardIndex + 1} of {flashcards.length}
              </span>
              <Button onClick={() => setStudyMode(false)} variant="outline">
                Exit Study Mode
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-2xl h-80 cursor-pointer transition-all duration-300 hover:shadow-lg">
            <CardContent className="h-full flex items-center justify-center p-8">
              <div className="text-center w-full">
                {!showAnswer ? (
                  <div onClick={() => setShowAnswer(true)}>
                    <h3 className="text-lg font-medium text-muted-foreground mb-4">Question</h3>
                    <p className="text-xl leading-relaxed">{currentCard.question}</p>
                    <p className="text-sm text-muted-foreground mt-8">Click to reveal answer</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-academic-primary mb-4">Answer</h3>
                    <p className="text-xl leading-relaxed text-academic-dark">{currentCard.answer}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="flex justify-center gap-4">
            <Button onClick={handlePrevCard} variant="outline">
              Previous
            </Button>
            <Button
              onClick={() => setShowAnswer(!showAnswer)}
              variant={showAnswer ? "default" : "secondary"}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {showAnswer ? "Show Question" : "Show Answer"}
            </Button>
            <Button onClick={handleNextCard} variant="outline">
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Flashcard List */}
      <div className="w-80 border-r border-border bg-background">
        <div className="p-4 border-b border-border">
          <div className="flex gap-2 mb-4">
            <Button onClick={handleCreateFlashcard} size="sm" className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              New Card
            </Button>
            <Button 
              onClick={handleStartStudy} 
              size="sm" 
              variant="secondary"
              disabled={flashcards.length === 0}
            >
              Study
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-2">
            {flashcards.map((card) => (
              <Card key={card.id} className="mb-2 hover:bg-muted/50 transition-colors group">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm line-clamp-2 flex-1">{card.question || "New Flashcard"}</CardTitle>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                      <Button
                        onClick={() => {
                          setEditingCard(card.id);
                          setNewQuestion(card.question);
                          setNewAnswer(card.answer);
                        }}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCard(card.id)}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {card.answer || "No answer"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{card.createdAt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Flashcard Editor */}
      <div className="flex-1 p-6">
        {editingCard ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-academic-primary">Edit Flashcard</h2>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveCard(editingCard)} variant="default">
                  <Check className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button onClick={() => setEditingCard(null)} variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Question</label>
                <Textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter your question..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Answer</label>
                <Textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter the answer..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-academic-primary/10 flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-academic-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Create Your First Flashcard</h3>
              <p>Add flashcards to study and memorize key concepts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};