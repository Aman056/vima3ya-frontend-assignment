export default function Sidebar({ activeSections, onNavigate }) {
  const sections = [
    { id: "A", label: "Personal Info" },
    { id: "B", label: "Contact" },
    { id: "C", label: "Work" },
    { id: "D", label: "Skills" },
  ];

  return (
    <div className="sidebar sticky-top h-100 pt-5" style={{ minWidth: "150px" }}>
      <ul className="list-unstyled">
        {sections.map((sec, i) => (
          <li
            key={sec.id}
            onClick={() => onNavigate(i)}
            className={`py-2 px-3 mb-2 rounded transition-all ${
              activeSections.includes(i) ? "bg-primary text-white" : "text-secondary"
            }`}
            style={{ cursor: "pointer", transition: "0.3s" }}
          >
            Section {sec.id}
          </li>
        ))}
      </ul>
    </div>
  );
}