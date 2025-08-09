const activities = [
  { id: 1, label: "Uploaded 'Rebar - 10mm'", time: "Today, 9:12 AM" },
  { id: 2, label: "Quotation sent to Client Anna", time: "Yesterday, 3:41 PM" },
  { id: 3, label: "Deleted 'Old Steel Rod'", time: "2 days ago" },
];

export default function ActivityTimeline() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Activity Timeline</h2>
      <ol className="relative border-l border-slate-600 ml-4">
        {activities.map((activity) => (
          <li key={activity.id} className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-1.5 top-1.5" />
            <p className="text-white font-medium">{activity.label}</p>
            <span className="text-sm text-slate-400">{activity.time}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
