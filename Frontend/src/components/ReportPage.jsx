import { CheckCircle, Loader, MapPin, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Button from './common/Button';
import Input from './common/Input';



const getRecentReports = async (limit = 10) => {
  // API CALL: Replace with actual endpoint - GET /api/reports/recent?limit={limit}
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, location: '123 Green St', wasteType: 'Plastic', amount: '5 kg', createdAt: '2025-10-01' },
      { id: 2, location: '456 Eco Ave', wasteType: 'Paper', amount: '3 kg', createdAt: '2025-10-02' },
      { id: 3, location: '789 Leaf Rd', wasteType: 'Glass', amount: '2 kg', createdAt: '2025-10-03' }
    ]), 500);
  });
};



const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({ location: '', type: '', amount: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // API CALL: Fetch recent reports
    getRecentReports().then(setReports);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleVerify = () => {
    if (!file) return;
    setVerificationStatus('verifying');
    
    // API CALL: Verify waste using AI - POST /api/verify/waste
    // This would call your Gemini AI endpoint
    setTimeout(() => {
      const mockResult = {
        wasteType: 'Plastic',
        quantity: '5 kg',
        confidence: 0.95
      };
      setVerificationResult(mockResult);
      setVerificationStatus('success');
      setNewReport({ ...newReport, type: mockResult.wasteType, amount: mockResult.quantity });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verificationStatus !== 'success') return;
    
    setIsSubmitting(true);
    // API CALL: Submit report - POST /api/reports
    const report = await createReport(DUMMY_USER.id, newReport.location, newReport.type, newReport.amount, preview);
    setReports([{ ...report, createdAt: new Date().toISOString().split('T')[0] }, ...reports]);
    setNewReport({ location: '', type: '', amount: '' });
    setFile(null);
    setPreview(null);
    setVerificationStatus('idle');
    setVerificationResult(null);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-[#024130]">Report Waste</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-12">
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload Waste Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#86c537] transition">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <label className="cursor-pointer text-[#86c537] hover:text-[#75b02f] font-medium">
              <span>Upload a file</span>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        {preview && (
          <div className="mb-8">
            <img src={preview} alt="Preview" className="max-w-full h-auto rounded-xl shadow-md" />
          </div>
        )}

        <Button type="button" onClick={handleVerify} className="w-full mb-8 py-3" disabled={!file || verificationStatus === 'verifying'}>
          {verificationStatus === 'verifying' ? (
            <>
              <Loader className="animate-spin mr-3 h-5 w-5" />
              Verifying...
            </>
          ) : 'Verify Waste'}
        </Button>

        {verificationStatus === 'success' && verificationResult && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8 rounded-r-xl">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800">Verification Successful</h3>
                <p className="text-sm text-green-700 mt-1">
                  Type: {verificationResult.wasteType} | Quantity: {verificationResult.quantity} | Confidence: {(verificationResult.confidence * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input
              type="text"
              value={newReport.location}
              onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
            <Input
              type="text"
              value={newReport.type}
              placeholder="Verified type"
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <Input
              type="text"
              value={newReport.amount}
              placeholder="Verified amount"
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>

        <Button type="submit" className="w-full py-3" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader className="animate-spin mr-3 h-5 w-5" />
              Submitting...
            </>
          ) : 'Submit Report'}
        </Button>
      </form>

      <h2 className="text-3xl font-semibold mb-6 text-[#024130]">Recent Reports</h2>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  <MapPin className="inline w-4 h-4 mr-2 text-[#86c537]" />
                  {report.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{report.wasteType}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{report.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{report.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage
