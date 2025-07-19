import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContactList from '@/components/ContactList';
import { FrontendContact } from '@/types/Contact';

export default function ContactListPage() {
  const [contacts, setContacts] = useState<FrontendContact[]>([]);
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, [reload]);

  const filteredContacts = contacts.filter((c) => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchGroup = groupFilter ? c.group === groupFilter : true;
    return matchName && matchGroup;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === 'asc'
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  const handleDelete = async (id: string) => {
    const ok = confirm('Bạn chắc chắn muốn xoá?');
    if (!ok) return;
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    setReload((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📒 Danh bạ liên hệ</h2>

      <div style={styles.controls}>
        <input
          placeholder="🔍 Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          style={styles.select}
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
        >
          <option value="">Tất cả nhóm</option>
          <option value="Friends">Bạn bè</option>
          <option value="Family">Gia đình</option>
          <option value="Work">Công việc</option>
          <option value="Other">Khác</option>
        </select>

        <button
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          style={styles.sortButton}
        >
          Sắp xếp: {sortOrder === 'asc' ? 'A–Z' : 'Z–A'}
        </button>

        <Link href="/contacts/create">
          <button style={styles.createButton}>➕ Thêm liên hệ</button>
        </Link>
      </div>

      <ContactList contacts={sortedContacts} onDelete={handleDelete} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: 24,
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: 12,
    borderBottom: '2px solid #eee',
    paddingBottom: 8,
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flex: '1 1 200px',
    padding: 8,
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  select: {
    padding: 8,
    borderRadius: 4,
  },
  sortButton: {
    padding: '8px 14px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  createButton: {
    padding: '8px 14px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};
