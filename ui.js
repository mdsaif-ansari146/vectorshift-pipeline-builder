// draggableNode.js - Part 2: Styled drag chips

export const DraggableNode = ({ type, label, emoji = '⚙️', color = '#6366f1' }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.7';
  };

  return (
    <div
      className={type}
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => { e.target.style.opacity = '1'; }}
      draggable
      title={`Drag to add ${label} node`}
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.1)',
        border: `1px solid rgba(255,255,255,0.15)`,
        backdropFilter: 'blur(4px)',
        transition: 'all 0.15s ease',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color + '33';
        e.currentTarget.style.borderColor = color + '99';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: 13 }}>{emoji}</span>
      <span style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 500, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        {label}
      </span>
    </div>
  );
};
