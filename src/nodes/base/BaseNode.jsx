import { useMemo, useState } from "react";
import { Handle } from "reactflow";
import { Icon } from "@iconify/react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

export default function BaseNode(props) {
  const { id, data = {}, isConnectable, selected } = props;
  const { config } = data;
  const {
    title,
    icon,
    description,
    theme = {},
    inputs = [],
    outputs = [],
    fields = [],
    defaults = {},
  } = config || {};

  const initialValues = useMemo(
    () => ({ ...defaults, ...(data.values || {}) }),
    [defaults, data.values]
  );
  const [values, setValues] = useState(initialValues);

  const update = (key, value) => {
    const next = { ...values, [key]: value };
    setValues(next);

    data.onChange?.(id, next);
  };

  return (
    <Card
      className="vs-node"
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme.borderColor || "#e5e7eb"}`,
        background: theme.bg || "#ffffff",
        color: theme.text || "#111827",
        boxShadow: selected
          ? "0 0 0 3px rgba(99,102,241,.25)"
          : "0 1px 3px rgba(0,0,0,.08)",
        minWidth: 260,
      }}
    >
      <CardHeader
        avatar={icon ? <Icon icon={icon} style={{ fontSize: 20 }} /> : null}
        title={<Typography variant="subtitle2">{title}</Typography>}
        action={
          <IconButton
            size="small"
            onClick={() => data.onDelete?.(id)} // now this will work
          >
            <Icon icon="mdi:delete" style={{ fontSize: 16, color: "red" }} />
          </IconButton>
        }
        sx={{
          borderBottom: "1px solid #f1f5f9",
          p: 1.5,
          "& .MuiCardHeader-content": { display: "flex", alignItems: "center" },
        }}
      />

      {/* -------------------------- Description or node card---------------------- */}
      {description && (
        <CardContent sx={{ pt: 1, pb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      )}

      {/* -----------------------------Fields to display ----------------------------- */}
      {fields.length > 0 && (
        <CardContent sx={{ display: "grid", gap: 1.5 }}>
          {fields.map((f) => {
            const v = values[f.key] ?? "";

            // ----------------------------- Incase of select input ------------------------------
            if (f.input === "select") {
              return (
                <label key={f.key} style={{ display: "grid", gap: 4 }}>
                  <span style={{ fontSize: 12 }}>{f.label}</span>
                  <select
                    value={v}
                    onChange={(e) => update(f.key, e.target.value)}
                    style={{
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
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
            // ----------------------------- Incase of textarea input ------------------------------

            if (f.input === "textarea") {
              const matches = [...v.matchAll(/\{\{(.*?)\}\}/g)];

              const variableValidationRegex = /^[a-zA-Z_][a-zA-Z0-9_]{2,49}$/;

              // Identify invalid variable names
              const invalidVars = matches
                .map((m) => m[1])
                .filter((name) => !variableValidationRegex.test(name));

              const hasError = invalidVars.length > 0;
              const errorText = hasError
                ? `Invalid variable name${
                    invalidVars.length > 1 ? "s" : ""
                  }: ${invalidVars.join(", ")} `
                : "";

              return (
                <>
                  <TextField
                    key={f.key}
                    label={f.label}
                    value={v}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    multiline
                    minRows={2}
                    maxRows={20}
                    fullWidth
                    size="small"
                    error={hasError} // keep red border if invalid
                    helperText={errorText}
                    sx={{ "& .MuiInputBase-root": { fontSize: "14px" } }}
                  />

                  {matches
                    .filter((m) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(m[1]))
                    .map((match, idx) => (
                      <Handle
                        key={`var-${match[1]}`}
                        id={`vars-${match[1]}`} // unique and related to the input
                        type="target"
                        position="left"
                        isConnectable={true}
                        style={{ background: "#eab308" }}
                      />
                    ))}
                </>
              );
            }
            // ----------------------------- Incase of checkbox input ------------------------------

            if (f.input === "checkbox") {
              return (
                <label
                  key={f.key}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={v}
                    onChange={(e) => update(f.key, e.target.checked)}
                  />
                  <span style={{ fontSize: 12 }}>{f.label}</span>
                </label>
              );
            }

            // ----------------------------- Default feild ------------------------------

            return (
              <TextField
                key={f.key}
                label={f.label}
                type={f.input || "text"}
                value={v}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                fullWidth
                size="small"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                  },
                }}
              />
            );
          })}
        </CardContent>
      )}

      {inputs.map((h) => (
        <Handle
          key={`in-${h.id}`}
          id={h.id}
          type="target"
          position="left"
          isConnectable={isConnectable}
          style={{
            width: 8,
            height: 8,
            background: theme.borderColor || "#6366f1",
          }}
        />
      ))}
      {outputs.map((h) => (
        <Handle
          key={`out-${h.id}`}
          id={h.id}
          type="source"
          position="right"
          isConnectable={isConnectable}
          style={{
            width: 8,
            height: 8,
            background: theme.borderColor || "#6366f1",
          }}
        />
      ))}
    </Card>
  );
}
