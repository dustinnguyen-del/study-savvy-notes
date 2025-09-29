import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { NoteEditor } from "./NoteEditor";
import { FlashcardView } from "./FlashcardView";
import { StudyQuestions } from "./StudyQuestions";
import { StatsDashboard } from "./StatsDashboard";

export type ViewType = "dashboard" | "notes" | "flashcards" | "study";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedFolder, setSelectedFolder] = useState<string>("general");
  const [stats, setStats] = useState({
    noteCount: 2,
    flashcardCount: 2,
    questionsAnswered: 0,
    correctAnswers: 0,
    studyStreak: 3,
  });

  const updateStats = (updates: Partial<typeof stats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <StatsDashboard {...stats} />;
      case "notes":
        return <NoteEditor selectedFolder={selectedFolder} onStatsUpdate={updateStats} />;
      case "flashcards":
        return <FlashcardView selectedFolder={selectedFolder} onStatsUpdate={updateStats} />;
      case "study":
        return <StudyQuestions selectedFolder={selectedFolder} onStatsUpdate={updateStats} />;
      default:
        return <StatsDashboard {...stats} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;