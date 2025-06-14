import Image from "next/image";

interface DepartmentCompaniesProps {
  department: string;
}

const DepartmentCompanies = ({ department }: DepartmentCompaniesProps) => {
  const departmentData: { [key: string]: { name: string; logo: string }[] } = {
    Electronic_and_Telecommunication_Engineering: [
      { name: "Dialog DNS", logo: "/companyImg/dialog.jpeg" },
    ],
    Electrical_Engineering: [
      { name: "MAS", logo: "/companyImg/mas.png" },
      { name: "DIMO", logo: "/companyImg/dimo.png" },
      { name: "Vega", logo: "/companyImg/vega.png" },
      { name: "Dialog DNS", logo: "/companyImg/dialog.jpeg" },
      { name: "Brantel", logo: "/companyImg/ifslogo.png" },
      { name: "Brantel", logo: "/companyImg/brantel.png" },
      { name: "Nagarro", logo: "/companyImg/nagarro.png" },
      { name: "Multilac", logo: "/companyImg/multilac.png" },
    ],
    Mechanical_Engineering: [
      { name: "DIMO", logo: "/companyImg/dimo.png" },
      { name: "Vega", logo: "/companyImg/vega.png" },
      { name: "Multilac", logo: "/companyImg/multilac.png" },
    ],
    Civil_Engineering: [],
    Material_Science_and_Engineering: [
      { name: "MAS", logo: "/companyImg/mas.png" },
      { name: "Multilac", logo: "/companyImg/multilac.png" },
    ],
    Chemical_and_Process_Engineering: [
      { name: "Multilac", logo: "/companyImg/multilac.png" },
    ],
    Transport_Management_and_Logistics_Engineering: [
      { name: "Transco Holdings", logo: "/companyImg/transco.png" },
    ],
    Textile_and_Apparel_Engineering: [
      { name: "MAS", logo: "/companyImg/mas.png" },
      { name: "Brandix", logo: "/companyImg/Brandix_Apparel_Limited_Logo.png" },
    ],
    Earth_Resources_Engineering: [],
    Computer_Science_and_Engineering: [
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
      { name: "Sensus Hub", logo: "/companyImg/senseusHub.png" },
      { name: "Nimbus Venture", logo: "/companyImg/Nimbus-Logo-320x132.png" },
      { name: "CodeGen", logo: "/companyImg/codegen.jpeg" },
      { name: "Creative Software", logo: "/companyImg/creativeSoftware.jpeg" },
    ],
    Information_Technology: [
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
      { name: "Sensus Hub", logo: "/companyImg/senseusHub.png" },
      { name: "Nimbus Venture", logo: "/companyImg/Nimbus-Logo-320x132.png" },
      { name: "CodeGen", logo: "/companyImg/codegen.jpeg" },
      { name: "Creative Software", logo: "/companyImg/creativeSoftware.jpeg" },
    ],
    Interdisciplinary_Studies: [
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
      { name: "Sensus Hub", logo: "/companyImg/senseusHub.png" },
      { name: "Nimbus Venture", logo: "/companyImg/Nimbus-Logo-320x132.png" },
      { name: "CodeGen", logo: "/companyImg/codegen.jpeg" },
      { name: "Creative Software", logo: "/companyImg/creativeSoftware.jpeg" },
    ],
    Computational_Mathematics: [
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
      { name: "Sensus Hub", logo: "/companyImg/senseusHub.png" },
      { name: "Nimbus Venture", logo: "/companyImg/Nimbus-Logo-320x132.png" },
      { name: "CodeGen", logo: "/companyImg/codegen.jpeg" },
      { name: "Creative Software", logo: "/companyImg/creativeSoftware.jpeg" },
    ],
  };

  console.log(department);

  const selectedCompanies = departmentData[department];

  if (!selectedCompanies) {
    return <p>No companies found for {department}.</p>;
  }

  return (
    <div className="container mx-auto px-5">
      <CompanyLogos department={department} companies={selectedCompanies} />
    </div>
  );
};

export default DepartmentCompanies;

interface Company {
  name: string;
  logo: string;
}

interface CompanyLogosProps {
  department: string;
  companies: Company[];
}

const CompanyLogos = ({ department, companies }: CompanyLogosProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">
        Companies - {department.replace(/_/g, " ")} :
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 justify-center items-center">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <div className="w-20 h-24 relative">
              <Image
                src={company.logo}
                alt={`${company.name} Logo`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-center">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
