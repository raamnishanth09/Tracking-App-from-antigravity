import { useState } from "react";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

type TabType = "today" | "7days" | "monthly";

const ReportTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("today");

  const tabs: { value: TabType; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "7days", label: "7 Days" },
    { value: "monthly", label: "Monthly" },
  ];

  const reportData = {
    today: [
      { name: "John Smith", tasks: 8, completed: 6, hours: "6.5h" },
      { name: "Sarah Johnson", tasks: 5, completed: 5, hours: "7h" },
      { name: "Mike Chen", tasks: 10, completed: 7, hours: "8h" },
    ],
    "7days": [
      { name: "John Smith", tasks: 42, completed: 38, hours: "45h" },
      { name: "Sarah Johnson", tasks: 35, completed: 33, hours: "40h" },
      { name: "Mike Chen", tasks: 55, completed: 48, hours: "52h" },
    ],
    monthly: [
      { name: "John Smith", tasks: 168, completed: 152, hours: "180h" },
      { name: "Sarah Johnson", tasks: 145, completed: 140, hours: "165h" },
      { name: "Mike Chen", tasks: 210, completed: 195, hours: "200h" },
    ],
  };

  const stats = {
    today: { tasks: 23, completed: 18, avgHours: "7.2h" },
    "7days": { tasks: 132, completed: 119, avgHours: "45.7h" },
    monthly: { tasks: 523, completed: 487, avgHours: "181.7h" },
  };

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="panel-header mb-0">Performance Reports</h3>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.value
                  ? "tab-active shadow-soft"
                  : "tab-inactive"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Total Tasks</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats[activeTab].tasks}</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Completed</span>
          </div>
          <p className="text-2xl font-bold text-success">{stats[activeTab].completed}</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Avg Hours</span>
          </div>
          <p className="text-2xl font-bold text-primary">{stats[activeTab].avgHours}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto animate-fade-in">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Employee</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tasks</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Completed</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Hours</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progress</th>
            </tr>
          </thead>
          <tbody>
            {reportData[activeTab].map((row, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {row.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="font-medium text-foreground">{row.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground">{row.tasks}</td>
                <td className="py-3 px-4 text-success font-medium">{row.completed}</td>
                <td className="py-3 px-4 text-foreground">{row.hours}</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="gradient-bg h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(row.completed / row.tasks) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTabs;
