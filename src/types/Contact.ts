export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  group: 'Friends' | 'Family' | 'Work' | 'Other';
};
export type FrontendContact = ContactFormData & {
  _id: string;
};