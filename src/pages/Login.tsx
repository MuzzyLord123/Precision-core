import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CustomCursor from "@/components/CustomCursor";

const customEase = [0.22, 1, 0.36, 1] as const;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/dashboard");
  };

  const handleForgotPassword = async () => {
    setResetMessage("");
    if (!email) {
      setResetMessage("Please enter your email above first.");
      return;
    }
    setResetLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
    setResetLoading(false);
    if (resetError) {
      setResetMessage(resetError.message);
      return;
    }
    setResetMessage("If an account exists for that email, a reset link has been sent.");
  };

  const inputClass =
    "w-full rounded-xl px-4 py-4 font-body text-[14px] transition-all outline-none border focus:border-signal-red focus:ring-2 focus:ring-signal-red/10 bg-graphite-control border-steel/[0.06] text-steel placeholder:text-steel/20";

  return (
    <>
      <CustomCursor />
      <main
        className="min-h-screen flex items-center justify-center grain circuit-bg relative overflow-hidden"
        style={{ backgroundColor: "#080809" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(204,41,54,0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-0 right-0 h-[1px]"
          style={{ backgroundColor: "#CC2936" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: customEase }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: customEase }}
          className="w-full max-w-md mx-6 relative z-10"
        >
          <div
            className="rounded-[24px] p-10 md:p-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(15,15,18,0.98) 0%, rgba(15,15,18,0.95) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(204,41,54,0.08) 0%, transparent 70%)" }}
            />

            <div className="flex items-center justify-center mb-10">
              <span className="font-display text-[28px] font-light text-steel">MOBI</span>
              <span className="font-display text-[28px] font-light text-signal-red">MEDIC</span>
            </div>

            <h1 className="font-display font-light text-[28px] text-steel text-center mb-2">Owner Portal</h1>
            <p className="font-body text-[13px] font-light text-steel/35 text-center mb-10">
              Sign in to manage your repairs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                minLength={4}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-body text-[12px] text-signal-red/80 leading-relaxed"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group w-full relative overflow-hidden font-body font-semibold text-[14px] rounded-xl h-[52px] text-steel transition-all disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #CC2936 0%, #a82230 100%)" }}
                data-cursor="cta"
              >
                <span className="relative z-10">{loading ? "Signing in..." : "Sign In"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </button>
            </form>

            <div className="text-center mt-8">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="font-body text-[12px] text-steel/15 hover:text-steel/40 transition-colors disabled:opacity-50"
              >
                {resetLoading ? "Sending reset link..." : "Forgot password?"}
              </button>
              {resetMessage && (
                <p className="font-body text-[12px] text-steel/35 mt-2 leading-relaxed">{resetMessage}</p>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/" className="font-body text-[12px] text-steel/20 hover:text-steel/40 transition-colors">
              ← Back to website
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default Login;
