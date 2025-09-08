import { useState } from "react";
import { BookOpen, FolderPlus, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-academic-primary via-academic-secondary to-academic-accent py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Smart Study Companion</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              Study<span className="text-academic-accent">notes</span>
            </h1>
            
            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              Organize your learning with intelligent note-taking, flashcards, and AI-powered study questions
            </p>
            
            <Button
              onClick={() => setShowDashboard(true)}
              size="lg"
              className="bg-white text-academic-primary hover:bg-white/90 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Studying
            </Button>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-white/10 bg-[length:60px_60px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_2px,transparent_2px)]"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-academic-dark md:text-4xl">
              Everything you need to excel
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed to enhance your learning experience
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 bg-gradient-to-br from-white to-academic-muted shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-academic-primary text-white">
                  <BookOpen className="h-8 w-8" />
                </div>
                <CardTitle className="text-academic-dark">Smart Notes</CardTitle>
                <CardDescription>
                  Organize your notes by subject and topic with our intuitive folder system
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 bg-gradient-to-br from-white to-academic-muted shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-academic-accent text-white">
                  <FolderPlus className="h-8 w-8" />
                </div>
                <CardTitle className="text-academic-dark">Flashcards</CardTitle>
                <CardDescription>
                  Create interactive flashcards from your notes for effective memorization
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 bg-gradient-to-br from-white to-academic-muted shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-academic-secondary text-academic-dark">
                  <Brain className="h-8 w-8" />
                </div>
                <CardTitle className="text-academic-dark">Study Questions</CardTitle>
                <CardDescription>
                  AI-generated questions help you test your knowledge and identify gaps
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;