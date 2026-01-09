import { useState } from "react";
import { Users, Shield, LogOut, Bell, Settings, Circle } from "lucide-react";
import StatusSelector from "./StatusSelector";
import ReportTabs from "./ReportTabs";
import WorkUpdateForm from "./WorkUpdateForm";
import LearningUpdateForm from "./LearningUpdateForm";
import ChatPanel from "./ChatPanel";
import MeetingButton from "./MeetingButton";
import CalendarView from "./CalendarView";

type PanelType = "employee" | "admin";
type Status = "active" | "away" | "busy";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activePanel, setActivePanel] = useState<PanelType>("employee");
  const [status, setStatus] = useState<Status>("active");

  const statusColors = {
    active: "bg-success",
    away: "bg-warning",
    busy: "bg-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-soft">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Grofast <span className="gradient-text">Digital</span>
                </h1>
                <p className="text-xs text-muted-foreground">Team Management</p>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-4">
              {/* Status Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                <Circle className={`w-2 h-2 ${statusColors[status]} rounded-full`} />
                <span className="text-sm font-medium text-foreground capitalize">{status}</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>

              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  JD
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Developer</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Panel Toggle & Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Panel Toggle */}
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActivePanel("employee")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-all duration-200 ${
                activePanel === "employee"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              Employee
            </button>
            <button
              onClick={() => setActivePanel("admin")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-all duration-200 ${
                activePanel === "admin"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>

          {/* Status Selector */}
          <StatusSelector currentStatus={status} onStatusChange={setStatus} />
        </div>

        {/* Employee Panel */}
        {activePanel === "employee" && (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WorkUpdateForm />
              <LearningUpdateForm />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChatPanel />
              <div className="space-y-8">
                <MeetingButton />
                <CalendarView />
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {activePanel === "admin" && (
          <div className="animate-fade-in space-y-8">
            <ReportTabs />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatPanel />
              </div>
              <div className="space-y-8">
                <MeetingButton />
                <CalendarView />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
