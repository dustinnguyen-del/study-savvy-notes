import { useState } from "react";
import { Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuestionCreatorProps {
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export const QuestionCreator = ({ onSave, onCancel }: QuestionCreatorProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (question.trim() && options.every(opt => opt.trim()) && explanation.trim()) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: question.trim(),
        options: options.map(opt => opt.trim()),
        correctAnswer,
        explanation: explanation.trim(),
        difficulty
      };
      onSave(newQuestion);
    }
  };

  const canSave = question.trim() && options.every(opt => opt.trim()) && explanation.trim();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-academic-primary">Create New Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Question</label>
          <Textarea
            placeholder="Enter your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Answer Options</label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                  correctAnswer === index ? 'bg-academic-accent text-white border-academic-accent' : 'border-border'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <Input
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <Button
                  size="sm"
                  variant={correctAnswer === index ? "default" : "outline"}
                  onClick={() => setCorrectAnswer(index)}
                  className="px-2"
                >
                  {correctAnswer === index ? "Correct" : "Set"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Difficulty</label>
          <Select value={difficulty} onValueChange={(value: "easy" | "medium" | "hard") => setDifficulty(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Explanation</label>
          <Textarea
            placeholder="Explain why this is the correct answer..."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="min-h-[60px]"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} disabled={!canSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Question
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};