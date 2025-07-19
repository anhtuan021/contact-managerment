import { useState } from 'react';
import { ContactFormData } from '../types/Contact';

type Props = {
  initial?: Partial<ContactFormData>;
  onSubmit: (values: ContactFormData) => void;
};

export default function ContactForm({ initial = {}, onSubmit }: Props) {
  const [values, setValues] = useState<ContactFormData>({
    name: initial.name || '',
    email: initial.email || '',
    phone: initial.phone || '',
    group: initial.group || 'Other',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Hãy nhập tên và email hợp lệ!');
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Tên *</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Nhập tên..."
          required
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Email *</label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email hợp lệ..."
          required
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Số điện thoại</label>
        <input
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="Tùy chọn"
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Nhóm</label>
        <select
          name="group"
          value={values.group}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Friends">Bạn bè</option>
          <option value="Family">Gia đình</option>
          <option value="Work">Công việc</option>
          <option value="Other">Khác</option>
        </select>
      </div>

      <button type="submit" style={styles.button}>💾 Lưu thông tin</button>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '500px',
    padding: 16,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: 4,
    outline: 'none',
  },
  button: {
    marginTop: 12,
    padding: '10px 16px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
