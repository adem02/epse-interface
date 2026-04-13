export function JsonLine ({ content }: { content: string }) {
  const parts = content.split(/(".*?")/g);
  return (
    <span style={{ whiteSpace: "pre" }}>
      {parts.map((part, i) => {
        if (part.startsWith('"') && part.endsWith('"')) {
          const isKey = content.indexOf(part) < content.indexOf(':') || !content.includes(':');
          return (
            <span key={i} style={{ color: isKey ? "#94a3b8" : "#00E5FF" }}>
              {part}
            </span>
          );
        }
        if (part === 'true' || part === 'false') {
          return <span key={i} style={{ color: "#00E5FF" }}>{part}</span>;
        }
        return <span key={i} style={{ color: "#64748b" }}>{part}</span>;
      })}
    </span>
  );
};