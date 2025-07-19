import ContactForm from '../../components/ContactForm';
import { useRouter } from 'next/router';
import { ContactFormData } from '../../types/Contact'; 

export default function CreateContact() {
  const router = useRouter();

  const handleCreate = async (data: ContactFormData) => {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/contacts');
    } else {
      alert('Lỗi thêm liên hệ!');
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",         // ⚡ quan trọng nhất
        background: "#fafbfd",      // hoặc màu nền nhẹ
      }}
    >
    <div style={{ padding: 24 }}>
      <h2>Thêm liên hệ mới</h2>
      <ContactForm onSubmit={handleCreate} />
    </div>
    </div>
  );
}
