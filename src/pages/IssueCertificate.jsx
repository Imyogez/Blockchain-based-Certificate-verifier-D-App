import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { CertModuleCert } from '../scdata/deployed_addresses.json';

const IssueCertificate = () => {
  const provider = new BrowserProvider(window.ethereum);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('Certified Blockchain Associate');
  const [grade, setGrade] = useState('S');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  async function issuecert(e) {
    e.preventDefault();
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(CertModuleCert, abi, signer);
      const txl = await instance.issue(id, name, course, grade, date);
      console.log(txl);
      navigate('/');
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 flex flex-col items-center py-8 px-4">
      <h3 className="text-4xl font-extrabold text-blue-900 mb-8">Certificate Dapp</h3>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Issue New Certificate</h3>

        <form onSubmit={issuecert} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
            <select
              name="course"
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
              <option value="Developer Essential for Blockchain">Developer Essential for Blockchain</option>
              <option value="Blockchain Foundation Program">Blockchain Foundation Program</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate ID *</label>
            <input
              type="text"
              name="id"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Name *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade *</label>
            <select
              name="grade"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
            <input
              type="date"
              name="issuedate"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Issue Certificate"
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer transition duration-200 ease-in-out"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueCertificate;
