import { useState } from "react";
import { Briefcase, Plus, Clock, CheckCircle } from "lucide-react";

interface WorkUpdate {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

const WorkUpdateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updates, setUpdates] = useState<WorkUpdate[]>([
    {
      id: 1,
      title: "Completed dashboard redesign",
      description: "Finished the new dashboard layout with improved UX",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      title: "API integration",
      description: "Connected payment gateway successfully",
      timestamp: "9:15 AM",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newUpdate: WorkUpdate = {
      id: Date.now(),
      title,
      description,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setUpdates([newUpdate, ...updates]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="section-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary-foreground" />
        </div>
        <h3 className="panel-header mb-0">Work Updates</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-styled"
            placeholder="What did you work on?"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-styled resize-none"
            rows={3}
            placeholder="Add details (optional)"
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-6 py-2.5 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Update
        </button>
      </form>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-muted/50 rounded-lg p-4 animate-slide-up border-l-4 border-primary"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <h4 className="font-medium text-foreground">{update.title}</h4>
                </div>
                {update.description && (
                  <p className="text-sm text-muted-foreground ml-6">{update.description}</p>
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

export default WorkUpdateForm;
