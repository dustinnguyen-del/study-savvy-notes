import { BookOpen, Brain, CheckCircle, TrendingUp, Target, Calendar } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import studyHero from "@/assets/study-hero.jpg";
import achievementIllustration from "@/assets/achievement-illustration.jpg";

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
    <div className="space-y-6">
      <div className="relative h-64 overflow-hidden rounded-b-2xl">
        <img 
          src={studyHero} 
          alt="Study workspace with books and digital devices" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-academic-primary/80 to-academic-accent/60 flex items-center">
          <div className="px-6 space-y-2">
            <h2 className="text-4xl font-bold text-white">
              Study Overview
            </h2>
            <p className="text-white/90 text-lg">Track your learning progress and achievements</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">

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

      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6">
            <img 
              src={achievementIllustration} 
              alt="Academic achievement illustration with books and graduation cap" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          <CardContent className="md:w-2/3 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">Keep Up The Great Work!</h3>
            <p className="text-muted-foreground mb-4">
              You're making excellent progress on your learning journey. Stay consistent and watch your knowledge grow.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>{studyStreak} day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-academic-primary"></div>
                <span>{accuracy}% accuracy</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      </div>
    </div>
  );
};
