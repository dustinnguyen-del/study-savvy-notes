import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { NoteEditor } from "./NoteEditor";
import { FlashcardView } from "./FlashcardView";
import { StudyQuestions } from "./StudyQuestions";

export type ViewType = "notes" | "flashcards" | "study";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>("notes");
  const [selectedFolder, setSelectedFolder] = useState<string>("general");

  console.log('Dashboard rendering with currentView:', currentView);

  const renderContent = () => {
    switch (currentView) {
      case "notes":
        return <NoteEditor selectedFolder={selectedFolder} />;
      case "flashcards":
        return <FlashcardView selectedFolder={selectedFolder} />;
      case "study":
        return <StudyQuestions selectedFolder={selectedFolder} />;
      default:
        return <NoteEditor selectedFolder={selectedFolder} />;
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