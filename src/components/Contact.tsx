import { Mail, Phone, User } from 'lucide-react';

const ContactCard = ({ name, role, organization, email, phone }: {
  name: string;
  role: string;
  organization?: string;
  email: string;
  phone: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <User className="text-blue-600 mr-2" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
        {organization && <p className="text-sm text-gray-500">{organization}</p>}
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex items-center">
        <Mail className="text-gray-400 w-4 h-4 mr-2" />
        <a href={`mailto:${email}`} className="text-sm text-gray-600 hover:text-blue-600">
          {email}
        </a>
      </div>
      <div className="flex items-center">
        <Phone className="text-gray-400 w-4 h-4 mr-2" />
        <a href={`tel:${phone}`} className="text-sm text-gray-600 hover:text-blue-600">
          {phone}
        </a>
      </div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ContactCard
            name="Senel Perera"
            role="Chairman"
            organization="IEEE Student Branch of University Of Moratuwa"
            email="senel.ephraims@ieee.org"
            phone="0770410762"
          />
          <ContactCard
            name="Yasith Senarath"
            role="Vice Chairman"
            organization="IEEE Student Branch of University Of Moratuwa"
            email="yasithsenarath@ieee.org"
            phone="0715960336"
          />
          <ContactCard
            name="Malithi Rumalka"
            role="Assistant Secretary"
            organization="IEEE Student Branch of University Of Moratuwa"
            email="malithirumalka@gmail.com"
            phone="0776536321"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;