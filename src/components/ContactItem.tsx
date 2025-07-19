import Link from 'next/link';
import { FrontendContact } from '@/types/Contact'; // ✅ dùng kiểu dự liệu frontend, không phải model

interface ContactItemProps {
  contact: FrontendContact;
  onDelete: (id: string) => void;
}

export default function ContactItem({ contact, onDelete }: ContactItemProps) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: 6,
      padding: 12,
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <b>{contact.name}</b>
        <div>Email: {contact.email}</div>
        {contact.phone && <div>Phone: {contact.phone}</div>}
        <div>Group: {contact.group || "Other"}</div>
      </div>
      <div>
        <Link href={`/contacts/${contact._id}`}>
          <button>Sửa</button>
        </Link>
        <button
          style={{ marginLeft: 8, color: 'red' }}
          onClick={() => {
            if (window.confirm(`Xoá liên hệ "${contact.name}"?`)) {
              onDelete(contact._id);
            }
          }}
        >
          Xoá
        </button>
      </div>
    </div>
  );
}
