import { useState } from "react";
import { Users, Lock, Mail, ArrowRight } from "lucide-react";

interface LoginSectionProps {
  onLogin: () => void;
}

const LoginSection = ({ onLogin }: LoginSectionProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-4 shadow-button">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Grofast <span className="gradient-text">Digital</span>
          </h1>
          <p className="text-muted-foreground">Team Management Platform</p>
        </div>

        {/* Login Card */}
        <div className="card-elevated p-8 animate-slide-up">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-styled pl-12"
                  placeholder="you@grofast.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-styled pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 btn-primary rounded-lg font-medium flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Demo mode - Click Sign In to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
