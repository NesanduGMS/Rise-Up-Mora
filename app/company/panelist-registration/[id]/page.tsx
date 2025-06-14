import React from "react";

function Page() {
  // Static company list
  const updatedCompanyList = [
    { com_name: "Company A", com_id: 1 },
    { com_name: "Company B", com_id: 2 },
    { com_name: "Company C", com_id: 3 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 m-10">
        <div className="relative">
          <div className="absolute bg-[#0c2735] text-white font rounded-[10px] border-none cursor-pointer z-10 py-2 px-5 top-6 left-4">
            <div className="font-poppins sm:text-[40px] line-height-1 text-[30px]">
              Registration
            </div>
          </div>

          <div className="absolute top-1 left-0 mt-8 ml-1.5 sm:mt-8 sm:ml-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none py-2.5 cursor-pointer sm:w-[260px] sm:h-[70px] w-[230px] h-[55px]"></div>

        </div>
      </div>
      <div className="bg-white rounded-lg p-10 max-w-2xl">
        <form className="space-y-6">
          <div className="flex items-center space-x-11">
            <label
              htmlFor="panellistName"
              className="text-lg font-bold  text-black"
              style={{ minWidth: '150px' }} // Adjust as needed for label width
            >
              Panellist Name
            </label>
            <input
              id="panellistName"
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              style={{ width: '100px' }} // Adjust as needed for input width
              placeholder="Panellist Name"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="comName"
              className="text-lg font-bold  text-black"
              style={{ minWidth: '150px' }} // Adjust as needed for label width
            >
              Panellist Company
            </label>
            <select
              id="comName"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              style={{ width: '300px' }} // Adjust as needed for select width
            >
              <option value="">-- Select a Company --</option>
              {updatedCompanyList.map((company) => (
                <option key={company.com_id} value={company.com_name}>
                  {company.com_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-11">
            <label
              htmlFor="panelNumber"
              className="text-lg font-bold  text-black"
              style={{ minWidth: '150px' }} // Adjust as needed for label width
            >
              Panel Number
            </label>
            <input
              id="panelNumber"
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              style={{ width: '300px' }} // Adjust as needed for input width
              placeholder="0"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent shadow-sm text-lg font-medium rounded-full text-white bg-[#0c2735] hover:bg-[#f1c232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;



