export default function ActiveSessions() {
  const sessions = [
    {
      device: "Chrome on Windows",
      location: "Philippines",
      lastActive: "2 mins ago",
    },
  ];

  return (
    <div className="space-y-4">
      {sessions.map((s, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700"
        >
          <div>
            <p className="font-semibold">{s.device}</p>
            <p className="text-xs text-slate-400">
              {s.location} • {s.lastActive}
            </p>
          </div>
          <button className="text-red-400 hover:underline text-sm">
            Logout
          </button>
        </div>
      ))}
    </div>
  );
}
