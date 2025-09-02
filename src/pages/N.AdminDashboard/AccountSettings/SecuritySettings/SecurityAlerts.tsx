export default function SecurityAlerts() {
  const alerts = [
    { type: "⚠️ Suspicious login attempt", date: "Aug 21, 2025" },
    { type: "🔒 Password changed", date: "Aug 18, 2025" },
  ];

  return (
    <ul className="space-y-3">
      {alerts.map((a, i) => (
        <li
          key={i}
          className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm"
        >
          <p className="font-semibold">{a.type}</p>
          <p className="text-slate-400">{a.date}</p>
        </li>
      ))}
    </ul>
  );
}
