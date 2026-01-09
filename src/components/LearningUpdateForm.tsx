import { useState } from "react";
import { BookOpen, Plus, Clock, Sparkles } from "lucide-react";

interface LearningUpdate {
  id: number;
  topic: string;
  notes: string;
  timestamp: string;
}

const LearningUpdateForm = () => {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [updates, setUpdates] = useState<LearningUpdate[]>([
    {
      id: 1,
      topic: "React Server Components",
      notes: "Learned about streaming and suspense boundaries",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      topic: "TypeScript Generics",
      notes: "Deep dive into conditional types and utility types",
      timestamp: "11:00 AM",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newUpdate: LearningUpdate = {
      id: Date.now(),
      topic,
      notes,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setUpdates([newUpdate, ...updates]);
    setTopic("");
    setNotes("");
  };

  return (
    <div className="section-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary-foreground" />
        </div>
        <h3 className="panel-header mb-0">Learning Updates</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-styled"
            placeholder="What did you learn today?"
          />
        </div>
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-styled resize-none"
            rows={3}
            placeholder="Key takeaways (optional)"
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-6 py-2.5 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Learning
        </button>
      </form>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-accent/50 rounded-lg p-4 animate-slide-up border-l-4 border-primary"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h4 className="font-medium text-foreground">{update.topic}</h4>
                </div>
                {update.notes && (
                  <p className="text-sm text-muted-foreground ml-6">{update.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {update.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningUpdateForm;
