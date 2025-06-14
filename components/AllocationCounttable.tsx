'use client'
import React, { useEffect, useState } from 'react';

interface AllocationData {
  companyName: string;
  allocationCount: number;
}

const AllocationCountTable: React.FC = () => {
  const [data, setData] = useState<AllocationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/preference/getFirstPreference', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result); // Assuming the API returns an array of data
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  // Render the table
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Allocation Counts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
                  Allocation Count
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">{item.companyName}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{item.allocationCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllocationCountTable;
