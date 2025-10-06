import { useState } from "react";
import { BookOpen, FolderPlus, Brain, Plus, Edit2, Check, X, Trash2, LayoutDashboard, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ViewType } from "./Dashboard";
import { PricingModal } from "./PricingModal";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

export const Sidebar = ({ currentView, setCurrentView, selectedFolder, setSelectedFolder }: SidebarProps) => {
  const [folders, setFolders] = useState([
    { id: "general", name: "General", noteCount: 3 },
    { id: "math", name: "Mathematics", noteCount: 7 },
    { id: "science", name: "Science", noteCount: 5 },
    { id: "history", name: "History", noteCount: 2 },
  ]);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [pricingOpen, setPricingOpen] = useState(false);
  const { isPremium } = useSubscription();

  const handleAddFolder = () => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: "New Subject",
      noteCount: 0,
    };
    setFolders([...folders, newFolder]);
    setEditingFolder(newFolder.id);
    setEditValue("New Subject");
  };

  const handleEditFolder = (folderId: string, currentName: string) => {
    setEditingFolder(folderId);
    setEditValue(currentName);
  };

  const handleSaveEdit = () => {
    if (editingFolder && editValue.trim()) {
      setFolders(folders.map(folder => 
        folder.id === editingFolder 
          ? { ...folder, name: editValue.trim() }
          : folder
      ));
    }
    setEditingFolder(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingFolder(null);
    setEditValue("");
  };

  const handleDeleteFolder = (folderId: string) => {
    if (folders.length > 1) { // Prevent deleting the last folder
      setFolders(folders.filter(folder => folder.id !== folderId));
      if (selectedFolder === folderId) {
        setSelectedFolder(folders.find(f => f.id !== folderId)?.id || "general");
      }
    }
  };

  const viewButtons = [
    { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
    { id: "notes" as ViewType, label: "Notes", icon: BookOpen },
    { id: "flashcards" as ViewType, label: "Flashcards", icon: FolderPlus },
    { id: "study" as ViewType, label: "Study", icon: Brain },
  ];

  return (
    <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-academic-primary">
            Study<span className="text-academic-accent">notes</span>
          </h1>
          {isPremium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 border-0">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">
        {viewButtons.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            onClick={() => setCurrentView(id)}
            variant={currentView === id ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Premium CTA */}
      {!isPremium && (
        <div className="px-4 pb-4">
          <Button
            onClick={() => setPricingOpen(true)}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0"
          >
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </Button>
        </div>
      )}

      {/* Folders */}
      <div className="flex-1 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">SUBJECTS</h3>
          <Button
            onClick={handleAddFolder}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-1">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
                  selectedFolder === folder.id
                    ? "bg-academic-primary text-white"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                {editingFolder === folder.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-6 text-xs"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit();
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <Button
                      onClick={handleSaveEdit}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="font-medium">{folder.name}</div>
                      <div className="text-xs opacity-70">{folder.noteCount} notes</div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditFolder(folder.id, folder.name);
                      }}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 mr-1"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    {folders.length > 1 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
    </div>
  );
};