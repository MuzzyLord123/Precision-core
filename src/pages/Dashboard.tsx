import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  LayoutDashboard, Inbox, Wrench, CheckCircle2, Users, DollarSign, Settings, LogOut, ChevronRight, ArrowUpRight, ArrowDownRight, Clock, Smartphone, Monitor, Tablet, Watch, Headphones, Gamepad2, Search, Eye, Trash2, X, Plus
} from "lucide-react";

const customEase = [0.22, 1, 0.36, 1] as const;

type Tab = "overview" | "enquiries" | "active" | "completed" | "customers" | "revenue" | "settings";

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  new: { bg: "rgba(204,41,54,0.12)", text: "#CC2936", dot: "#CC2936" },
  confirmed: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B", dot: "#F59E0B" },
  in_progress: { bg: "rgba(59,130,246,0.12)", text: "#3B82F6", dot: "#3B82F6" },
  ready_for_collection: { bg: "rgba(48,200,94,0.12)", text: "#30C85E", dot: "#30C85E" },
  completed: { bg: "rgba(148,163,184,0.12)", text: "#94A3B8", dot: "#94A3B8" },
  cancelled: { bg: "rgba(100,100,120,0.12)", text: "#64748B", dot: "#64748B" },
};

const statusLabels: Record<string, string> = {
  new: "NEW",
  confirmed: "CONFIRMED",
  in_progress: "IN PROGRESS",
  ready_for_collection: "READY",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
};

const Dashboard = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shopInfo, setShopInfo] = useState({ shop_name: "MobiMedic", address: "Guilden Sutton, Chester", phone: "+44 1234 567890", email: "hello@mobimedic.co.uk" });
  const [savingSettings, setSavingSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUser(session.user);

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      setProfile(profileData);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/login");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: enq } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
      setEnquiries(enq || []);
      const { data: cust } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
      setCustomers(cust || []);
    };
    if (user) fetchData();

    // Realtime subscription
    const channel = supabase.channel("enquiries-realtime").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "enquiries" },
      () => { fetchData(); }
    ).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase.from("business_settings").select("shop_name, address, phone, email").eq("id", 1).single();
      if (data) {
        setShopInfo(prev => ({
          shop_name: data.shop_name ?? prev.shop_name,
          address: data.address ?? prev.address,
          phone: data.phone ?? prev.phone,
          email: data.email ?? prev.email,
        }));
      }
    };
    loadSettings();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const todayStr = new Date().toDateString();
  const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
  const newToday = enquiries.filter(e => new Date(e.created_at).toDateString() === todayStr).length;
  const completedToday = enquiries.filter(e => e.status === "completed" && e.completed_at && new Date(e.completed_at).toDateString() === todayStr).length;
  const completedYesterday = enquiries.filter(e => e.status === "completed" && e.completed_at && new Date(e.completed_at).toDateString() === yesterdayStr).length;

  const kpis: { label: string; value: number; icon: any; trend?: string; up?: boolean }[] = [
    { label: "New Enquiries", value: enquiries.filter(e => e.status === "new").length, icon: Inbox, trend: `+${newToday} today`, up: newToday > 0 },
    { label: "Active Repairs", value: enquiries.filter(e => e.status === "in_progress").length, icon: Wrench },
    { label: "Completed Today", value: completedToday, icon: CheckCircle2, trend: `vs ${completedYesterday} yesterday`, up: completedToday >= completedYesterday },
    { label: "Awaiting Collection", value: enquiries.filter(e => e.status === "ready_for_collection").length, icon: Clock, trend: "devices ready", up: true },
  ];

  const navItems: { icon: any; label: string; tab: Tab; count?: number }[] = [
    { icon: LayoutDashboard, label: "Overview", tab: "overview" },
    { icon: Inbox, label: "Enquiries", tab: "enquiries", count: enquiries.filter(e => e.status === "new").length },
    { icon: Wrench, label: "Active Repairs", tab: "active" },
    { icon: CheckCircle2, label: "Completed", tab: "completed" },
    { icon: Users, label: "Customers", tab: "customers" },
    { icon: DollarSign, label: "Revenue", tab: "revenue" },
    { icon: Settings, label: "Settings", tab: "settings" },
  ];

  const updateStatus = async (id: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === "in_progress") updates.started_at = new Date().toISOString();
    if (newStatus === "completed") updates.completed_at = new Date().toISOString();
    if (newStatus === "ready_for_collection") updates.collected_at = null;

    const { error } = await supabase.from("enquiries").update(updates).eq("id", id);
    if (error) {
      toast.error(`Failed to update status: ${error.message}`);
      return;
    }
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    if (selectedEnquiry?.id === id) setSelectedEnquiry((prev: any) => ({ ...prev, ...updates }));
  };

  const saveShopInfo = async () => {
    setSavingSettings(true);
    const { error } = await supabase.from("business_settings").update({
      shop_name: shopInfo.shop_name,
      address: shopInfo.address,
      phone: shopInfo.phone,
      email: shopInfo.email,
    }).eq("id", 1);
    setSavingSettings(false);
    if (error) toast.error(`Failed to save shop information: ${error.message}`);
    else toast.success("Shop information saved.");
  };

  const formatPrice = (pence: number | null) => pence ? `£${(pence / 100).toFixed(0)}` : "TBC";

  const filteredEnquiries = enquiries.filter(e => {
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [e.guest_name, e.ref, e.device_model, e.guest_email].some(v => (v || "").toLowerCase().includes(q));
  });

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#080809" }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: customEase }}
        className="h-full flex flex-col border-r border-white/[0.04] relative z-20 flex-shrink-0"
        style={{ backgroundColor: "#080809" }}
      >
        <div className="p-4 flex items-center gap-3 border-b border-white/[0.04] h-16">
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
              <span className="font-display text-[18px] font-light text-steel">MOBI</span>
              <span className="font-display text-[18px] font-light text-signal-red">MEDIC</span>
            </motion.div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} className="ml-auto text-steel/20 hover:text-steel/40 transition-colors">
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="px-4 py-2">
            <span className="font-mono text-[8px] text-steel/15 tracking-[0.2em] uppercase">Technician Portal</span>
          </div>
        )}

        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all text-left group relative ${
                tab === item.tab
                  ? "text-steel"
                  : "text-steel/25 hover:text-steel/50 hover:bg-white/[0.02]"
              }`}
              style={tab === item.tab ? { backgroundColor: "rgba(204,41,54,0.08)" } : {}}
            >
              {tab === item.tab && (
                <motion.div layoutId="sidebar-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-signal-red" />
              )}
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="font-body text-[13px]">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-auto font-mono text-[10px] bg-signal-red/20 text-signal-red px-1.5 py-0.5 rounded-full min-w-[20px] text-center">{item.count}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.04]">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-8 h-8 rounded-full bg-signal-red/20 flex items-center justify-center">
                <span className="font-mono text-[11px] text-signal-red font-semibold">
                  {profile?.full_name?.[0] || "O"}
                </span>
              </div>
              <div>
                <p className="font-body text-[12px] text-steel">{profile?.full_name || "Owner"}</p>
                <p className="font-mono text-[9px] text-signal-red">Owner</p>
              </div>
            </div>
          )}
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-steel/20 hover:text-signal-red hover:bg-signal-red/[0.05] transition-all">
            <LogOut className="w-[16px] h-[16px]" />
            {!sidebarCollapsed && <span className="font-body text-[12px]">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/[0.04] flex-shrink-0" style={{ backgroundColor: "#080809" }}>
          <h2 className="font-display text-[20px] font-light text-steel">{navItems.find(n => n.tab === tab)?.label}</h2>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-steel/25">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}</span>
            <div className="w-8 h-8 rounded-full bg-signal-red flex items-center justify-center">
              <span className="font-mono text-[11px] text-white font-semibold">{profile?.full_name?.[0] || "O"}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: "#0a0a0c" }}>
          <AnimatePresence mode="wait">
            {tab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                <div className="mb-8">
                  <h1 className="font-display text-[32px] font-light text-steel">{getGreeting()}, {profile?.full_name || "Owner"}.</h1>
                  <p className="font-mono text-[12px] text-steel/25 mt-1">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {kpis.map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: customEase }}
                      className="rounded-2xl p-6 relative overflow-hidden"
                      style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(204,41,54,0.08)" }}>
                          <kpi.icon className="w-5 h-5 text-signal-red" />
                        </div>
                        {kpi.trend && (
                          <div className={`flex items-center gap-1 font-mono text-[11px] ${kpi.up ? "text-green-400" : "text-steel/25"}`}>
                            {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {kpi.trend}
                          </div>
                        )}
                      </div>
                      <p className="font-mono text-[36px] text-steel font-light">{kpi.value}</p>
                      <p className="font-body text-[12px] text-steel/30 mt-1">{kpi.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent enquiries */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
                    <h3 className="font-body text-[15px] text-steel font-medium">Recent Enquiries</h3>
                    <button onClick={() => setTab("enquiries")} className="font-mono text-[11px] text-signal-red hover:text-signal-red/70 transition-colors">View All →</button>
                  </div>
                  {enquiries.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="font-display text-[22px] text-steel/15 italic">No enquiries yet.</p>
                      <p className="font-body text-[13px] text-steel/15 mt-2">Enquiries from your website will appear here.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/[0.03]">
                      {enquiries.slice(0, 5).map(enq => (
                        <div key={enq.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => { setSelectedEnquiry(enq); setTab("enquiries"); }}>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[enq.status]?.dot || "#64748B" }} />
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: statusColors[enq.status]?.bg, color: statusColors[enq.status]?.text }}>{statusLabels[enq.status]}</span>
                          </div>
                          <span className="font-mono text-[11px] text-signal-red">{enq.ref}</span>
                          <span className="font-body text-[13px] text-steel">{enq.guest_name || "Guest"}</span>
                          <span className="font-body text-[12px] text-steel/30">{enq.device_type} {enq.device_model}</span>
                          <span className="ml-auto font-mono text-[10px] text-steel/20">{new Date(enq.created_at).toLocaleDateString("en-GB")}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {tab === "enquiries" && (
              <motion.div key="enquiries" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                {/* Filter bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel/20" />
                    <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl font-body text-[13px] text-steel placeholder:text-steel/20 outline-none" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }} placeholder="Search name, device, ref..." />
                  </div>
                  <button
                    onClick={async () => {
                      const { data, error } = await supabase.from("enquiries").insert({
                        guest_name: "Demo Customer",
                        guest_email: "demo@example.com",
                        guest_phone: "+44 7700 900000",
                        device_type: "iPhone",
                        device_model: "iPhone 15 Pro Max",
                        repairs_requested: ["Screen Replacement"],
                        source: "manual",
                        status: "new",
                        estimated_price_pence: 22900,
                      }).select().single();
                      if (error) toast.error(`Failed to add enquiry: ${error.message}`);
                      else if (data) setEnquiries(prev => [data, ...prev]);
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl font-body text-[12px] text-white bg-signal-red hover:bg-signal-red/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Demo Enquiry
                  </button>
                </div>

                {/* Status tabs */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                  {["all", "new", "confirmed", "in_progress", "ready_for_collection", "completed", "cancelled"].map(s => {
                    const count = s === "all" ? enquiries.length : enquiries.filter(e => e.status === s).length;
                    return (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap ${count === 0 && s !== "all" && statusFilter !== s ? "opacity-30" : ""}`}
                        style={statusFilter === s ? { backgroundColor: "rgba(204,41,54,0.12)", color: "#CC2936" } : { backgroundColor: "rgba(255,255,255,0.03)", color: "#94A3B8" }}
                      >
                        {s === "all" ? "All" : statusLabels[s]} <span className="ml-1 opacity-50">{count}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Table */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                  {enquiries.length === 0 ? (
                    <div className="p-16 text-center">
                      <p className="font-display text-[26px] text-steel/15 italic mb-2">No enquiries yet.</p>
                      <p className="font-body text-[13px] text-steel/15">Click "Add Demo Enquiry" to create sample data.</p>
                    </div>
                  ) : filteredEnquiries.length === 0 ? (
                    <div className="p-16 text-center">
                      <p className="font-display text-[26px] text-steel/15 italic mb-2">No matching enquiries.</p>
                      <p className="font-body text-[13px] text-steel/15">Try a different search or status filter.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.04]">
                          {["Status", "Ref", "Customer", "Device", "Repair(s)", "Date", "Price", "Actions"].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-mono text-[9px] text-steel/20 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {filteredEnquiries.map(enq => (
                          <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1.5" style={{ backgroundColor: statusColors[enq.status]?.bg, color: statusColors[enq.status]?.text }}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColors[enq.status]?.dot }} />
                                {statusLabels[enq.status]}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-signal-red">{enq.ref}</td>
                            <td className="px-4 py-3">
                              <p className="font-body text-[13px] text-steel">{enq.guest_name || "—"}</p>
                              <p className="font-body text-[11px] text-steel/20">{enq.guest_email}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-steel/50">{enq.device_type}</span>
                              <span className="font-body text-[12px] text-steel/40 ml-2">{enq.device_model}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {(enq.repairs_requested || []).map((r: string) => (
                                  <span key={r} className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-steel/40">{r}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-steel/30">
                              {enq.booked_date ? new Date(enq.booked_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : new Date(enq.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </td>
                            <td className="px-4 py-3 font-mono text-[13px] text-signal-red">{formatPrice(enq.estimated_price_pence)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button onClick={() => setSelectedEnquiry(enq)} aria-label="View enquiry" className="p-1.5 rounded-lg hover:bg-white/[0.04] text-steel/20 hover:text-steel/50 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {tab === "active" && (
              <motion.div key="active" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["confirmed", "in_progress", "ready_for_collection"].map(status => (
                    <div key={status} className="rounded-2xl p-4" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-2 mb-4 px-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[status]?.dot }} />
                        <h3 className="font-mono text-[11px] text-steel/40 uppercase tracking-wider">{statusLabels[status]}</h3>
                        <span className="ml-auto font-mono text-[10px] text-steel/20">{enquiries.filter(e => e.status === status).length}</span>
                      </div>
                      <div className="space-y-3">
                        {enquiries.filter(e => e.status === status).map(enq => (
                          <div key={enq.id} className="rounded-xl p-4 cursor-pointer hover:border-signal-red/20 transition-all" style={{ backgroundColor: "#111115", borderLeft: "2px solid #CC2936", border: "1px solid rgba(255,255,255,0.04)" }} onClick={() => setSelectedEnquiry(enq)}>
                            <p className="font-body text-[13px] text-steel font-medium">{enq.guest_name || "Guest"}</p>
                            <p className="font-mono text-[11px] text-steel/30 mt-1">{enq.device_type} {enq.device_model}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(enq.repairs_requested || []).map((r: string) => (
                                <span key={r} className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-steel/40">{r}</span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-mono text-[11px] text-signal-red">{enq.ref}</span>
                              <span className="font-mono text-[11px] text-steel/20">{formatPrice(enq.estimated_price_pence)}</span>
                            </div>
                          </div>
                        ))}
                        {enquiries.filter(e => e.status === status).length === 0 && (
                          <p className="text-center font-body text-[12px] text-steel/15 py-8 italic">None</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === "completed" && (
              <motion.div key="completed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="divide-y divide-white/[0.03]">
                    {enquiries.filter(e => e.status === "completed").length === 0 ? (
                      <div className="p-16 text-center">
                        <p className="font-display text-[22px] text-steel/15 italic">No completed repairs yet.</p>
                      </div>
                    ) : enquiries.filter(e => e.status === "completed").map(enq => (
                      <div key={enq.id} className="px-6 py-4 flex items-center gap-4">
                        <span className="font-mono text-[11px] text-signal-red">{enq.ref}</span>
                        <span className="font-body text-[13px] text-steel">{enq.guest_name}</span>
                        <span className="font-body text-[12px] text-steel/30">{enq.device_type} {enq.device_model}</span>
                        <span className="ml-auto font-mono text-[11px] text-steel/20">{enq.completed_at ? new Date(enq.completed_at).toLocaleDateString("en-GB") : "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {tab === "customers" && (
              <motion.div key="customers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                  {customers.length === 0 ? (
                    <div className="p-16 text-center">
                      <p className="font-display text-[22px] text-steel/15 italic">No customers yet.</p>
                      <p className="font-body text-[13px] text-steel/15 mt-2">Customers are created from enquiries.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead><tr className="border-b border-white/[0.04]">
                        {["Name", "Email", "Phone", "Created"].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-mono text-[9px] text-steel/20 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {customers.map(c => (
                          <tr key={c.id} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3 font-body text-[13px] text-steel">{c.full_name}</td>
                            <td className="px-4 py-3 font-body text-[12px] text-steel/30">{c.email}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-steel/30">{c.phone}</td>
                            <td className="px-4 py-3 font-mono text-[11px] text-steel/20">{new Date(c.created_at).toLocaleDateString("en-GB")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {tab === "revenue" && (
              <motion.div key="revenue" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "This Month", value: formatPrice(enquiries.filter(e => e.status === "completed" && e.completed_at && new Date(e.completed_at).getMonth() === new Date().getMonth() && new Date(e.completed_at).getFullYear() === new Date().getFullYear()).reduce((sum, e) => sum + (e.confirmed_price_pence || e.estimated_price_pence || 0), 0)) },
                    { label: "Total Revenue", value: formatPrice(enquiries.filter(e => e.status === "completed").reduce((sum, e) => sum + (e.confirmed_price_pence || e.estimated_price_pence || 0), 0)) },
                    { label: "Avg Repair Value", value: enquiries.filter(e => e.status === "completed").length > 0 ? formatPrice(Math.round(enquiries.filter(e => e.status === "completed").reduce((sum, e) => sum + (e.confirmed_price_pence || e.estimated_price_pence || 0), 0) / enquiries.filter(e => e.status === "completed").length)) : "£0" },
                    { label: "Completed Repairs", value: enquiries.filter(e => e.status === "completed").length.toString() },
                  ].map((stat, i) => (
                    <div key={stat.label} className="rounded-2xl p-6" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <p className="font-body text-[12px] text-steel/30">{stat.label}</p>
                      <p className="font-mono text-[28px] text-steel mt-2">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: customEase }}>
                <div className="max-w-2xl space-y-6">
                  <div className="rounded-2xl p-6" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h3 className="font-body text-[15px] text-steel font-medium mb-4">Shop Information</h3>
                    <div className="space-y-4">
                      {([{ label: "Shop Name", key: "shop_name" }, { label: "Address", key: "address" }, { label: "Phone", key: "phone" }, { label: "Email", key: "email" }] as const).map(field => (
                        <div key={field.key}>
                          <label className="font-mono text-[9px] text-steel/20 uppercase tracking-wider block mb-1.5">{field.label}</label>
                          <input value={shopInfo[field.key]} onChange={e => setShopInfo(prev => ({ ...prev, [field.key]: e.target.value }))} className="w-full px-4 py-3 rounded-xl font-body text-[13px] text-steel placeholder:text-steel/20 outline-none border border-white/[0.05] focus:border-signal-red/30 transition-colors" style={{ backgroundColor: "#1D1D21" }} />
                        </div>
                      ))}
                      <button
                        onClick={saveShopInfo}
                        disabled={savingSettings}
                        className="px-5 py-3 rounded-xl font-body text-[13px] font-semibold text-white bg-signal-red hover:bg-signal-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {savingSettings ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: "#0F0F12", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h3 className="font-body text-[15px] text-steel font-medium mb-4">Account</h3>
                    <p className="font-body text-[13px] text-steel/30">Logged in as: <span className="text-steel">{user?.email}</span></p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enquiry detail panel */}
      <AnimatePresence>
        {selectedEnquiry && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-30" onClick={() => setSelectedEnquiry(null)} />
            <motion.div
              initial={{ x: 480 }}
              animate={{ x: 0 }}
              exit={{ x: 480 }}
              transition={{ duration: 0.4, ease: customEase }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] z-40 overflow-y-auto"
              style={{ backgroundColor: "#0F0F12", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display text-[24px] font-light text-steel">{selectedEnquiry.guest_name || "Guest"}</h2>
                    <span className="font-mono text-[11px] text-signal-red">{selectedEnquiry.ref}</span>
                  </div>
                  <button onClick={() => setSelectedEnquiry(null)} aria-label="Close panel" className="p-2 rounded-lg hover:bg-white/[0.04] text-steel/30"><X className="w-5 h-5" /></button>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: statusColors[selectedEnquiry.status]?.bg }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[selectedEnquiry.status]?.dot }} />
                  <span className="font-mono text-[11px]" style={{ color: statusColors[selectedEnquiry.status]?.text }}>{statusLabels[selectedEnquiry.status]}</span>
                </div>

                {/* Customer Info */}
                <div className="mb-6">
                  <h4 className="font-mono text-[9px] text-steel/20 uppercase tracking-[0.2em] mb-3">Customer Details</h4>
                  <div className="space-y-2">
                    {[
                      { l: "Email", v: selectedEnquiry.guest_email },
                      { l: "Phone", v: selectedEnquiry.guest_phone },
                      { l: "Source", v: selectedEnquiry.source },
                    ].map(f => f.v && (
                      <div key={f.l} className="flex justify-between">
                        <span className="font-mono text-[10px] text-steel/20">{f.l}</span>
                        <span className="font-body text-[13px] text-steel">{f.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device & Repair */}
                <div className="mb-6">
                  <h4 className="font-mono text-[9px] text-steel/20 uppercase tracking-[0.2em] mb-3">Device & Repair</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-mono text-[10px] text-steel/20">Device</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-steel/50">{selectedEnquiry.device_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-[10px] text-steel/20">Model</span>
                      <span className="font-body text-[13px] text-steel">{selectedEnquiry.device_model}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-steel/20 block mb-2">Repairs</span>
                      <div className="flex flex-wrap gap-1">
                        {(selectedEnquiry.repairs_requested || []).map((r: string) => (
                          <span key={r} className="font-mono text-[10px] px-2 py-1 rounded-lg bg-white/[0.04] text-steel/50">{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <h4 className="font-mono text-[9px] text-steel/20 uppercase tracking-[0.2em] mb-3">Pricing</h4>
                  <p className="font-mono text-[28px] text-signal-red">{formatPrice(selectedEnquiry.confirmed_price_pence || selectedEnquiry.estimated_price_pence)}</p>
                  <p className="font-mono text-[10px] text-steel/20 mt-1">{selectedEnquiry.confirmed_price_pence ? "Confirmed" : "Estimated"}</p>
                </div>

                {/* Status actions */}
                <div className="mb-6">
                  <h4 className="font-mono text-[9px] text-steel/20 uppercase tracking-[0.2em] mb-3">Update Status</h4>
                  <div className="space-y-2">
                    {selectedEnquiry.status === "new" && (
                      <button onClick={() => updateStatus(selectedEnquiry.id, "confirmed")} className="w-full py-3 rounded-xl font-body text-[13px] font-semibold text-white transition-all" style={{ backgroundColor: "#F59E0B" }}>Confirm Booking</button>
                    )}
                    {(selectedEnquiry.status === "new" || selectedEnquiry.status === "confirmed") && (
                      <button onClick={() => updateStatus(selectedEnquiry.id, "in_progress")} className="w-full py-3 rounded-xl font-body text-[13px] font-semibold text-white transition-all" style={{ backgroundColor: "#3B82F6" }}>Start Repair</button>
                    )}
                    {selectedEnquiry.status === "in_progress" && (
                      <button onClick={() => updateStatus(selectedEnquiry.id, "ready_for_collection")} className="w-full py-3 rounded-xl font-body text-[13px] font-semibold text-white transition-all" style={{ backgroundColor: "#30C85E" }}>Mark Ready for Collection</button>
                    )}
                    {selectedEnquiry.status === "ready_for_collection" && (
                      <button onClick={() => updateStatus(selectedEnquiry.id, "completed")} className="w-full py-3 rounded-xl font-body text-[13px] font-semibold text-white transition-all bg-steel/30">Mark Completed</button>
                    )}
                    {selectedEnquiry.status !== "cancelled" && selectedEnquiry.status !== "completed" && (
                      <button onClick={() => updateStatus(selectedEnquiry.id, "cancelled")} className="w-full py-2 rounded-xl font-body text-[11px] text-signal-red/50 hover:text-signal-red border border-signal-red/10 hover:border-signal-red/20 transition-all">Cancel</button>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-mono text-[9px] text-steel/20 uppercase tracking-[0.2em] mb-3">Internal Notes</h4>
                  <textarea
                    defaultValue={selectedEnquiry.owner_notes || ""}
                    placeholder="Add notes about this repair..."
                    className="w-full px-4 py-3 rounded-xl font-body text-[13px] text-steel placeholder:text-steel/15 outline-none resize-none h-24 border border-white/[0.05] focus:border-signal-red/30 transition-colors"
                    style={{ backgroundColor: "#1D1D21" }}
                    onBlur={async (e) => {
                      const { error } = await supabase.from("enquiries").update({ owner_notes: e.target.value }).eq("id", selectedEnquiry.id);
                      if (error) toast.error(`Failed to save notes: ${error.message}`);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
