import { BookOpen, Brain, CheckCircle, TrendingUp, Target, Calendar } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsDashboardProps {
  noteCount: number;
  flashcardCount: number;
  questionsAnswered: number;
  correctAnswers: number;
  studyStreak: number;
}

export const StatsDashboard = ({
  noteCount,
  flashcardCount,
  questionsAnswered,
  correctAnswers,
  studyStreak,
}: StatsDashboardProps) => {
  const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;
  
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-academic-primary to-academic-accent bg-clip-text text-transparent">
          Study Overview
        </h2>
        <p className="text-muted-foreground">Track your learning progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Notes"
          value={noteCount}
          icon={BookOpen}
          description="Notes created"
          trend={12}
        />
        <StatsCard
          title="Flashcards"
          value={flashcardCount}
          icon={Brain}
          description="Cards to study"
          trend={8}
        />
        <StatsCard
          title="Study Streak"
          value={`${studyStreak} days`}
          icon={Calendar}
          description="Keep it going!"
        />
        <StatsCard
          title="Questions Answered"
          value={questionsAnswered}
          icon={CheckCircle}
          description="Total attempts"
        />
        <StatsCard
          title="Accuracy"
          value={`${accuracy}%`}
          icon={Target}
          description="Correct answers"
          trend={accuracy >= 70 ? 5 : -3}
        />
        <StatsCard
          title="Weekly Progress"
          value={`${Math.round((questionsAnswered / 50) * 100)}%`}
          icon={TrendingUp}
          description="Goal: 50 questions"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Notes Created</span>
              <span className="font-medium">{Math.min(noteCount, 10)}/10</span>
            </div>
            <Progress value={(Math.min(noteCount, 10) / 10) * 100} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Flashcards Reviewed</span>
              <span className="font-medium">{Math.min(flashcardCount, 20)}/20</span>
            </div>
            <Progress value={(Math.min(flashcardCount, 20) / 20) * 100} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Questions Answered</span>
              <span className="font-medium">{Math.min(questionsAnswered, 50)}/50</span>
            </div>
            <Progress value={(Math.min(questionsAnswered, 50) / 50) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
