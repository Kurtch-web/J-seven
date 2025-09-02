export default function LoginActivity() {
  const logins = [
    {
      date: "Aug 22, 2025",
      location: "Manila, PH",
      device: "Chrome on Windows",
    },
    {
      date: "Aug 20, 2025",
      location: "Cavite, PH",
      device: "Edge on Windows",
    },
  ];

  return (
    <ul className="space-y-3">
      {logins.map((log, i) => (
        <li
          key={i}
          className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm"
        >
          <p className="font-semibold">{log.device}</p>
          <p className="text-slate-400">
            {log.location} • {log.date}
          </p>
        </li>
      ))}
    </ul>
  );
}
