import { Circle } from "lucide-react";

type Status = "active" | "away" | "busy";

interface StatusSelectorProps {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}

const StatusSelector = ({ currentStatus, onStatusChange }: StatusSelectorProps) => {
  const statuses: { value: Status; label: string; color: string }[] = [
    { value: "active", label: "Active", color: "bg-success" },
    { value: "away", label: "Away", color: "bg-warning" },
    { value: "busy", label: "Busy", color: "bg-destructive" },
  ];

  return (
    <div className="flex items-center gap-2">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentStatus === status.value
              ? `${status.color} text-primary-foreground shadow-soft`
              : "bg-muted text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Circle
            className={`w-2 h-2 ${
              currentStatus === status.value ? "fill-current" : ""
            }`}
          />
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default StatusSelector;
