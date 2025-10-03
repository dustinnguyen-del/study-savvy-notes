import { useState } from "react";
import { Plus, Search, FileText, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import notesHero from "@/assets/notes-hero.jpg";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteEditorProps {
  selectedFolder: string;
  onStatsUpdate?: (stats: { noteCount: number }) => void;
}

export const NoteEditor = ({ selectedFolder, onStatsUpdate }: NoteEditorProps) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Introduction to Calculus",
      content: "Calculus is the mathematical study of continuous change. It has two main branches: differential calculus and integral calculus.",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    },
    {
      id: "2", 
      title: "Newton's Laws of Motion",
      content: "First Law: An object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force.",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-16"
    }
  ]);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setSelectedNote(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    onStatsUpdate?.({ noteCount: updatedNotes.length });
  };

  const handleSaveNote = () => {
    if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { 
              ...note, 
              title: editTitle || "Untitled Note",
              content: editContent,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : note
      ));
      
      setSelectedNote({
        ...selectedNote,
        title: editTitle || "Untitled Note",
        content: editContent,
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setEditTitle("");
      setEditContent("");
    }
    onStatsUpdate?.({ noteCount: updatedNotes.length });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={notesHero} 
          alt="Note-taking workspace with notebook and laptop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-academic-primary/80 to-academic-accent/60 flex items-center">
          <div className="px-6 space-y-1">
            <h2 className="text-3xl font-bold text-white">
              My Notes
            </h2>
            <p className="text-white/90">Organize your thoughts and learning materials</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Notes List */}
        <div className="w-80 border-r border-border bg-background">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <Button onClick={handleCreateNote} size="sm" className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-2">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className={`mb-2 cursor-pointer transition-colors group ${
                  selectedNote?.id === note.id
                    ? "border-academic-primary bg-academic-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  setSelectedNote(note);
                  setEditTitle(note.title);
                  setEditContent(note.content);
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm truncate flex-1">{note.title}</CardTitle>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {note.updatedAt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {note.content || "No content"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-6 border-b border-border">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleSaveNote}
                className="text-2xl font-bold border-none px-0 bg-transparent focus-visible:ring-0"
                placeholder="Note title..."
              />
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Created: {selectedNote.createdAt}</span>
                <span>Updated: {selectedNote.updatedAt}</span>
              </div>
            </div>
            
            <div className="flex-1 p-6">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleSaveNote}
                placeholder="Start writing your notes..."
                className="h-full min-h-[500px] border-none bg-transparent resize-none focus-visible:ring-0 text-base leading-relaxed"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No note selected</h3>
              <p>Select a note from the sidebar or create a new one to get started</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};