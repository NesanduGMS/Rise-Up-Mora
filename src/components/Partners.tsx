
const Partners = () => {
  const partners = [
    {
      name: 'MAS',
      type: 'Main Industrial Partner',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop'
    },
    {
      name: 'IFS',
      type: 'Gold Partner',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop'
    },
    {
      name: 'GTN',
      type: 'Silver Partner',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop'
    },
    {
      name: 'SensusHub',
      type: 'Bronze Partner',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="mx-auto mb-4 h-20 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
              <p className="text-sm text-gray-500">{partner.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;