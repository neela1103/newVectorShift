import { useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import clsx from 'clsx';

// small helper to map string → Position enum
const posMap = {
  Left: Position.Left,
  Right: Position.Right,
  Top: Position.Top,
  Bottom: Position.Bottom,
};

export default function BaseNode(props) {
  const { id, data = {}, isConnectable, selected } = props;
  const { config } = data; // we will pass config via data.config
  const {
    title, icon, description, theme = {},
    inputs = [], outputs = [], fields = [], defaults = {},
  } = config || {};

  const initialValues = useMemo(() => ({ ...defaults, ...(data.values || {}) }), [defaults, data.values]);
  const [values, setValues] = useState(initialValues);

  const update = (key, value) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // bubble up if parent provided a callback (optional)
    data.onChange?.(id, next);
  };

  return (
    <div
      className={clsx(
        'vs-node',
        selected && 'vs-node--selected'
      )}
      style={{
        borderRadius: 12,
        border: `1px solid ${theme.accent || '#e5e7eb'}`,
        background: theme.bg || '#ffffff',
        color: theme.text || '#111827',
        boxShadow: selected ? '0 0 0 3px rgba(99,102,241,.25)' : '0 1px 3px rgba(0,0,0,.08)',
        minWidth: 260,
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, borderBottom: '1px solid #f1f5f9' }}>
        {icon ? <span>{icon}</span> : null}
        <strong style={{ fontSize: 14 }}>{title}</strong>
      </header>

      {description ? (
        <div style={{ fontSize: 12, padding: '8px 12px', color: '#6b7280' }}>{description}</div>
      ) : null}

      {fields.length > 0 && (
        <div style={{ display: 'grid', gap: 8, padding: 12 }}>
          {fields.map((f) => {
            const v = values[f.key] ?? '';
            if (f.input === 'select') {
              return (
                <label key={f.key} style={{ display: 'grid', gap: 4 }}>
                  <span style={{ fontSize: 12 }}>{f.label}</span>
                  <select
                    value={v}
                    onChange={(e) => update(f.key, e.target.value)}
                    style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  >
                    {(f.options || []).map((opt) => (
                      <option key={opt.value ?? opt} value={opt.value ?? opt}>
                        {opt.label ?? opt}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            if (f.input === 'textarea') {
              return (
                <label key={f.key} style={{ display: 'grid', gap: 4 }}>
                  <span style={{ fontSize: 12 }}>{f.label}</span>
                  <textarea
                    value={v}
                    onChange={(e) => update(f.key, e.target.value)}
                    rows={4}
                    placeholder={f.placeholder}
                    style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  />
                </label>
              );
            }
            // default to text/number
            return (
              <label key={f.key} style={{ display: 'grid', gap: 4 }}>
                <span style={{ fontSize: 12 }}>{f.label}</span>
                <input
                  type={f.input || 'text'}
                  value={v}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
              </label>
            );
          })}
        </div>
      )}

      {/* Handles */}
      {inputs.map((h) => (
        <Handle
          key={`in-${h.id}`}
          id={h.id}
          type="target"
          position={posMap[h.side || 'Left']}
          isConnectable={isConnectable}
          style={{ width: 8, height: 8, background: theme.accent || '#6366f1' }}
        />
      ))}
      {outputs.map((h) => (
        <Handle
          key={`out-${h.id}`}
          id={h.id}
          type="source"
          position={posMap[h.side || 'Right']}
          isConnectable={isConnectable}
          style={{ width: 8, height: 8, background: theme.accent || '#6366f1' }}
        />
      ))}
    </div>
  );
}
    