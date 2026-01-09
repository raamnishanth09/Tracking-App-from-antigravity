import { useState } from "react";
import { Video, Copy, Check, ExternalLink } from "lucide-react";

const MeetingButton = () => {
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateMeetingLink = () => {
    const randomId = Math.random().toString(36).substring(2, 12);
    const link = `https://meet.google.com/${randomId.substring(0, 3)}-${randomId.substring(3, 7)}-${randomId.substring(7)}`;
    setMeetingLink(link);
    setCopied(false);
  };

  const copyLink = async () => {
    if (meetingLink) {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="section-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
          <Video className="w-5 h-5 text-primary-foreground" />
        </div>
        <h3 className="panel-header mb-0">Quick Meeting</h3>
      </div>

      <button
        onClick={generateMeetingLink}
        className="w-full btn-primary py-3 rounded-lg font-medium flex items-center justify-center gap-2 mb-4"
      >
        <Video className="w-5 h-5" />
        Create Meeting
      </button>

      {meetingLink && (
        <div className="bg-accent/50 rounded-lg p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-2">Meeting Link Generated:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-card rounded-lg px-4 py-2.5 border border-border">
              <p className="text-sm text-primary font-medium truncate">{meetingLink}</p>
            </div>
            <button
              onClick={copyLink}
              className="p-2.5 rounded-lg bg-muted hover:bg-secondary transition-colors"
              title="Copy link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-success" />
              ) : (
                <Copy className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
              title="Open meeting"
            >
              <ExternalLink className="w-5 h-5 text-primary-foreground" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingButton;
