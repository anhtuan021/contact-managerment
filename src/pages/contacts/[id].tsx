import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContactForm from '../../components/ContactForm';
import { ContactFormData, FrontendContact } from '@/types/Contact';

export default function EditContact() {
  const router = useRouter();
  const { id } = router.query;

  const [initial, setInitial] = useState<FrontendContact | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/contacts/${id}`)
        .then((res) => res.json())
        .then((data) => setInitial(data));
    }
  }, [id]);


  const handleUpdate = async (data: ContactFormData) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/contacts');
    } else {
      alert('Lỗi cập nhật!');
    }
  };

  if (!initial) return <div>Đang tải...</div>;


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",         
        background: "#fafbfd",    
      }}
    >
    <div style={{ padding: 24 }}>
      <h2>Cập nhật liên hệ</h2>
      <ContactForm initial={initial} onSubmit={handleUpdate} />
    </div>
    </div>
  );
}
