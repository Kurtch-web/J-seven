const notifications = [
  {
    id: 1,
    type: "superadmin",
    message: "Your material 'Cement - 25kg' was approved.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "client",
    message: "Client Anna requested a quotation for 4 items.",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "superadmin",
    message: "'Gravel - 1 cu.m' was rejected. Check your submission.",
    time: "1 day ago",
  },
];

export default function RecentNotifications() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Notifications</h2>
      <ul className="space-y-3">
        {notifications.map((note) => (
          <li
            key={note.id}
            className={`border-l-4 p-4 bg-slate-800 rounded-lg shadow border-slate-600 ${
              note.type === "superadmin" ? "border-orange-500" : "border-blue-400"
            }`}
          >
            <p className="text-white">{note.message}</p>
            <span className="text-sm text-slate-400">{note.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
