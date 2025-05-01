import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/dapp-logo.png';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { CertModuleCert } from '../scdata/deployed_addresses.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ViewCertificate = () => {
  const provider = new BrowserProvider(window.ethereum);
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const certRef = useRef(null);

  useEffect(() => {
    async function getcert(searchId) {
      try {
        const signer = await provider.getSigner();
        const instance = new Contract(CertModuleCert, abi, signer);
        const result = await instance.Certificates(searchId);
        setCertificate({
          name: result[0],
          course: result[1],
          grade: result[2],
          date: result[3],
        });
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    }

    if (id) {
      getcert(id);
    }
  }, [id, provider]);

  const handleDownload = async () => {
    if (!certRef.current) return;

    // Capture without the download button
    const canvas = await html2canvas(certRef.current, {
      ignoreElements: (element) =>
        element.classList && element.classList.contains('download-btn'),
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`Certificate-${id}.pdf`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-8">
      <div
        className="relative w-full max-w-[297mm] h-[210mm] bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-8"
        ref={certRef}
      >
        {/* Download PDF button */}
        <button
          onClick={handleDownload}
          className="download-btn absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Download PDF
        </button>

        {/* Certificate Header */}
        <div className="text-center mb-8">
          <img src={logo} className="w-40 mx-auto mb-4" alt="KBA Logo" />
          <h3 className="text-6xl font-serif font-bold text-gray-800 mb-3">
            Kerala Blockchain Academy
          </h3>
          <p className="text-2xl text-gray-700 italic">
            Certificate of Achievement
          </p>
        </div>

        {/* Certificate Content */}
        {certificate ? (
          <div className="text-center text-xl text-gray-800 leading-relaxed mx-auto max-w-[80%]">
            <p className="mb-8">
              This is to certify that
              <span className="font-bold text-gray-900"> {certificate.name} </span>
              has successfully completed the
              <span className="font-bold text-gray-900"> {certificate.course} </span>
              course with a grade of
              <span className="font-bold text-gray-900"> {certificate.grade} </span>
              on
              <span className="font-bold text-gray-900"> {certificate.date} </span>.
            </p>
          </div>
        ) : (
          <p className="text-xl text-center text-gray-500">
            Loading certificate details...
          </p>
        )}

        {/* Certificate ID */}
        <div className="absolute bottom-6 right-10 text-lg text-gray-800">
          <p>
            Certificate ID:{' '}
            <span className="font-bold text-gray-900">{id}</span>
          </p>
        </div>

        {/* Decorative Borders */}
        <div className="absolute inset-0 border-[12px] border-double border-gray-400 rounded-[16px] pointer-events-none"></div>
        <div className="absolute inset-4 border-[6px] border-double border-gray-200 rounded-[12px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ViewCertificate;
