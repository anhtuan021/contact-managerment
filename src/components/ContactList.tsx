import { FrontendContact } from '@/types/Contact';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: FrontendContact[];
  onDelete: (id: string) => void;
}

const ContactList = ({ contacts, onDelete }: ContactListProps) => {
  if (contacts.length === 0) return <p>Không có liên hệ nào.</p>;
  return (
    <div>
      {contacts.map(c => (
        <ContactItem key={c._id} contact={c} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ContactList;

