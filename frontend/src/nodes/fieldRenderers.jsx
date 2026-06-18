
// Schema-driven field rendering: each field "kind" maps to a small
// component that knows how to render and edit a value of that kind.


export const TextField = ({ value, onChange }) => (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
  );
  
  export const TextareaField = ({ field, value, onChange }) => (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={field.rows || 3} />
  );
  
  export const SelectField = ({ field, value, onChange }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {field.options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
  
  export const NumberField = ({ value, onChange }) => (
    <input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
  );
  
  export const CheckboxField = ({ value, onChange }) => (
    <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
  );
  
  export const fieldRenderers = {
    text: TextField,
    textarea: TextareaField,
    select: SelectField,
    number: NumberField,
    checkbox: CheckboxField,
  };