
import { React, useRef, useState, useEffect } from 'react';
import { FaEye, FaDownload, FaTimes, FaFilePdf, FaFileImage } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { gsap } from 'gsap';

const docs = [
  {
    id: 1,
    title: "Medical Report of Anuj",
    type: "pdf",
    patient: "Anuj Pratap",
    category: "results",
    aiSummary: {
      overview: "Health report of Anuj showing key metrics and observations.",
      vitals: [
        { name: "Hemoglobin", value: "15.1 g/dL", normalRange: "13–17 g/dL", status: "Normal" },
        { name: "WBC Count", value: "6,200 /μL", normalRange: "4,000–11,000 /μL", status: "Normal" },
        { name: "Platelet Count", value: "200,000 /μL", normalRange: "150,000–450,000 /μL", status: "Normal" },
        { name: "Blood Sugar (Fasting)", value: "95 mg/dL", normalRange: "70–100 mg/dL", status: "Normal" },
        { name: "Cholesterol (Total)", value: "205 mg/dL", normalRange: "< 200 mg/dL", status: "High" }
      ],
      analysis: [
        "Values indicate no immediate critical health concern.",
        "Further evaluation might be needed for borderline results.",
        "Overall, patient is stable based on current data."
      ],
      recommendations: [
        "Repeat test in 2 weeks.",
        "Maintain a balanced diet.",
        "Consult a specialist if symptoms persist."
      ]
    },
    url: "https://drive.google.com/file/d/1hpWcmIXJLV9q0iyKMDw4VPNYFmQQkonJ/view?usp=drive_link",
    previewUrl: "https://drive.google.com/file/d/1hpWcmIXJLV9q0iyKMDw4VPNYFmQQkonJ/preview",
    size: "196 KB",
    updatedAt: "2025-06-04T00:00:00"
  },
  {
    id: 2,
    title: "CT Scan Report of Priya",
    type: "jpg",
    patient: "Priya Sharma",
    category: "imaging",
    aiSummary: {
      overview: "CT scan revealing minor sinus inflammation.",
      vitals: [],
      analysis: [
        "No signs of structural abnormality.",
        "Minor inflammation in sinus cavities."
      ],
      recommendations: [
        "Consult ENT specialist.",
        "Use prescribed nasal sprays."
      ]
    },
    url: "https://drive.google.com/file/d/1z6Mdl_OT11zF7GozE9QbNh07Ae-KoPIK/view?usp=drive_link",
    previewUrl: "https://drive.google.com/file/d/1z6Mdl_OT11zF7GozE9QbNh07Ae-KoPIK/preview",
    size: "74 KB",
    updatedAt: "2025-05-07T00:00:00"
  },
  {
    id: 3,
    title: "Blood Report of Rahul",
    type: "pdf",
    patient: "Rahul Verma",
    category: "results",
    aiSummary: {
      overview: "Routine blood test with slightly elevated cholesterol.",
      vitals: [
        { name: "Hemoglobin", value: "14.3 g/dL", normalRange: "13–17 g/dL", status: "Normal" },
        { name: "Cholesterol", value: "210 mg/dL", normalRange: "< 200 mg/dL", status: "High" }
      ],
      analysis: ["Mild hypercholesterolemia detected."],
      recommendations: ["Adopt low-fat diet.", "Retest after 1 month."]
    },
    url: "https://drive.google.com/file/d/1aYqO0bXeK_8rVqAlJybUOF4tWkq1uCPQ/view?usp=drive_link",
    previewUrl: "https://drive.google.com/file/d/1aYqO0bXeK_8rVqAlJybUOF4tWkq1uCPQ/preview",
    size: "467 KB",
    updatedAt: "2025-04-20T00:00:00"
  },
  {
    id: 4,
    title: "MRI Report of Sanya",
    type: "docx",
    patient: "Sanya Roy",
    category: "imaging",
    aiSummary: {
      overview: "MRI shows no abnormalities in brain scan.",
      vitals: [],
      analysis: ["Normal MRI scan; no signs of trauma or lesions."],
      recommendations: ["No immediate action required."]
    },
    url: "https://docs.google.com/document/d/1xZkGD-NUNj-h4winXcLPnXEi80Ilz2Sa/edit?usp=sharing",
    previewUrl: "https://docs.google.com/document/d/1xZkGD-NUNj-h4winXcLPnXEi80Ilz2Sa/preview",
    size: "16 KB",
    updatedAt: "2025-03-28T00:00:00"
  },
  {
    id: 5,
    title: "Liver Function Test - Abhishek",
    type: "pdf",
    patient: "Abhishek Singh",
    category: "results",
    aiSummary: {
      overview: "LFT showing elevated SGPT and SGOT levels.",
      vitals: [
        { name: "SGPT", value: "60 U/L", normalRange: "7–56 U/L", status: "High" },
        { name: "SGOT", value: "58 U/L", normalRange: "5–40 U/L", status: "High" }
      ],
      analysis: ["Indicates possible liver inflammation or fatty liver."],
      recommendations: ["Reduce alcohol intake.", "Ultrasound advised."]
    },
    url: "https://drive.google.com/file/d/19Gbnm1hi-bV2YfI51V4gNXLRBkwgp398/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/19Gbnm1hi-bV2YfI51V4gNXLRBkwgp398/preview",
    size: "453 KB",
    updatedAt: "2025-06-01T00:00:00"
  },
  {
    id: 6,
    title: "X-ray Chest - Manish",
    type: "png",
    patient: "Manish Kumar",
    category: "imaging",
    aiSummary: {
      overview: "X-ray indicates clear lungs and no abnormalities.",
      vitals: [],
      analysis: ["Lung fields are normal.", "No evidence of fluid or mass."],
      recommendations: ["No further action necessary."]
    },
    url: "https://drive.google.com/file/d/1y4LtjnwKWRywkPEVX_WK5JzGiVYCPHqe/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1y4LtjnwKWRywkPEVX_WK5JzGiVYCPHqe/preview",
    size: "117 KB",
    updatedAt: "2025-06-05T00:00:00"
  },
  {
    id: 7,
    title: "ECG Report - Reena",
    type: "jpeg",
    patient: "Reena Mishra",
    category: "reports",
    aiSummary: {
      overview: "ECG shows normal sinus rhythm.",
      vitals: [],
      analysis: ["No arrhythmia or abnormalities noted."],
      recommendations: ["Routine follow-up after 6 months."]
    },
    url: "https://drive.google.com/file/d/11UcHiRKANBUZXGusw8lm6h6QW77EEIzp/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/11UcHiRKANBUZXGusw8lm6h6QW77EEIzp/preview",
    size: "138 KB",
    updatedAt: "2025-05-15T00:00:00"
  },
  {
    id: 8,
    title: "Eye Test Report - Kunal",
    type: "pdf",
    patient: "Kunal Das",
    category: "reports",
    aiSummary: {
      overview: "Visual acuity report for both eyes.",
      vitals: [],
      analysis: ["Mild myopia in left eye."],
      recommendations: ["Prescription glasses recommended."]
    },
    url: "https://drive.google.com/file/d/12Tc6MsZdNEkPOeK6ZiaNNsCgzlGRwv5f/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/12Tc6MsZdNEkPOeK6ZiaNNsCgzlGRwv5f/preview",
    size: "453 KB",
    updatedAt: "2025-06-03T00:00:00"
  },
  {
    id: 9,
    title: "Thyroid Report of Sneha",
    type: "docx",
    patient: "Sneha Chatterjee",
    category: "results",
    aiSummary: {
      overview: "TSH slightly above normal range.",
      vitals: [
        { name: "TSH", value: "6.0 µIU/mL", normalRange: "0.4–4.0 µIU/mL", status: "High" }
      ],
      analysis: ["Suggestive of subclinical hypothyroidism."],
      recommendations: ["Monitor every 3 months.", "Consider endocrinologist consult."]
    },
    url: "https://docs.google.com/document/d/1zU9uE-cyn57P-oKK9WwEv_pTLZWzwHCz/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1zU9uE-cyn57P-oKK9WwEv_pTLZWzwHCz/preview",
    size: "17 KB",
    updatedAt: "2025-06-06T00:00:00"
  },
  {
    id: 10,
    title: "CBC Report - Tanmay",
    type: "pdf",
    patient: "Tanmay Dey",
    category: "results",
    aiSummary: {
      overview: "Complete blood count mostly within range.",
      vitals: [
        { name: "WBC", value: "5,500 /μL", normalRange: "4,000–11,000 /μL", status: "Normal" },
        { name: "RBC", value: "4.9 million/μL", normalRange: "4.5–6 million/μL", status: "Normal" }
      ],
      analysis: ["Healthy hematologic profile."],
      recommendations: ["Maintain hydration.", "Routine annual checkup."]
    },
    url: "https://drive.google.com/file/d/1LAGziFTmffXY398ekJqUzba73s5RcD5Q/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1LAGziFTmffXY398ekJqUzba73s5RcD5Q/preview",
    size: "454 KB",
    updatedAt: "2025-05-30T00:00:00"
  },
  {
    id: 11,
    title: "Ultrasound Abdomen - Aditya",
    type: "jpeg",
    patient: "Aditya Mehta",
    category: "imaging",
    aiSummary: {
      overview: "Abdominal ultrasound normal except mild fatty liver.",
      vitals: [],
      analysis: ["Grade 1 fatty liver.", "Other organs appear normal."],
      recommendations: ["Lifestyle modification.", "Low-fat diet."]
    },
    url: "https://drive.google.com/file/d/18XfMAkxMmaMZN8Dt_RDQsgnui7v8sLeT/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/18XfMAkxMmaMZN8Dt_RDQsgnui7v8sLeT/preview",
    size: "150 KB",
    updatedAt: "2025-06-02T00:00:00"
  }
];

const Documents = () => {

  const cardsContainerRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [categoryBy, setCategoryBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // console.log(filteredDocs);
  // console.log(searchBy);

  function parseInputDate(input) {
    let date = new Date(input);
    if (!isNaN(date)) return date;
    const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = input.match(ddmmyyyy);
    if (match) {
      const [_, day, month, year] = match;
      return new Date(`${year}-${month}-${day}`);
    }
    return null;
  }

  const searchByOptions = {
    all: (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),

    name: (doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()),

    patient: (doc) => doc.patient.toLowerCase().includes(searchQuery.toLowerCase()),

    type: (doc) => doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  };

  const sortByOptions = {
    nameAsc: (a, b) => a.title.localeCompare(b.title),
    nameDec: (a, b) => b.title.localeCompare(a.title),
    patientAsc: (a, b) => a.patient.localeCompare(b.patient),
    patientDec: (a, b) => b.patient.localeCompare(a.patient),
    dateAsc: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    dateDec: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
    sizeAsc: (a, b) => parseFloat(a.size) - parseFloat(b.size),
    sizeDec: (a, b) => parseFloat(b.size) - parseFloat(a.size),
  };

  const categoryByOptions = {
    "all": (doc) => true, // No filtering by category
    "reports": (doc) => doc.category === "reports",
    "imaging": (doc) => doc.category === "imaging",
    "results": (doc) => doc.category === "results",
  }
  const categories = ["all", "reports", "imaging", "results"]; // Tab labels

  const filteredDocs = docs.filter((doc) =>
    searchByOptions[searchBy](doc) &&
    (searchQuery ? true : true) &&
    categoryByOptions[categoryBy](doc)
  ).sort(
    sortByOptions[sortBy] || sortByOptions.date // Default to date sorting if no sortBy is selected
  );

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const indexOfLastDoc = currentPage * itemsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - itemsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirstDoc, indexOfLastDoc);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchBy, sortBy, categoryBy]);

  useEffect(() => {
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.querySelectorAll('.document-card'),
        { opacity: 0.75, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.05,
          ease: 'power4.in'
        }
      );
    }
  }, [currentDocs]);

  return (
    <div className="bg-white dark:bg-gray-700 dark:text-white rounded-lg shadow-md md:p-6 py-6 px-2">
      <h2 className="text-2xl font-semibold mb-4">Documents</h2>

      {/* Sort and Search Filter */}
      <div className="flex lg:flex-row flex-col gap-2 mb-4">
        {/* Search Options */}
        <div className='flex flex-col min-[450px]:flex-row gap-2 md:gap-0 items-center w-full md:w-auto'>
          <div className='w-full'>
            <h2 className='inline-block font-bold px-4 text-nowrap'>Search By</h2>
            <select
              name="search"
              id="search"
              onChange={(e) => setSearchBy(e.target.value)}
              className="ml-2 px-3 py-2 border-2 border-slate-200 rounded-md transition-all focus:outline-none focus:border-blue-500 
               dark:bg-slate-700 dark:text-white"
            >
              <option value="all">All</option>
              <option value="name">Document Name</option>
              <option value="patient">Patient Name</option>
              <option value="type">Document Type</option>
            </select>
          </div>

          <div className='w-full'>
            <h2 className='inline-block font-bold px-4 text-nowrap'>Sort By</h2>
            <select name="search" onChange={(e) => {
              setSortBy(e.target.value);
            }} id="search" className="ml-2 px-3 py-2 border-2 border-slate-200 rounded-md transition-all focus:outline-none focus:border-blue-500 
               dark:bg-slate-700 dark:text-white">
              <option value="nameAsc">Document Name (A-Z)</option>
              <option value="nameDec">Document Name (Z-A)</option>
              <option value="patientAsc">Patient Name (A-Z)</option>
              <option value="patientDec">Patient Name (Z-A)</option>
              <option value="dateAsc">Date (Oldest)</option>
              <option value="dateDec">Date (Newest)</option>
              <option value="sizeAsc">Size (Smallest)</option>
              <option value="sizeDec">Size (Largest)</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-4 ml-2 flex w-[90%] lg:w-[75%] items-center text-black dark:text-white border-2 border-slate-200 rounded-md focus:border-blue-500 transition-all focus-within:border-blue-500">
          <CiSearch className="text-xl text-amber-900 dark:text-slate-100  ml-2" />
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent focus:outline-none rounded-md"
            placeholder="Search Document..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="rounded-md px-1 py-1 w-full dark:bg-gray-700 md:w-fit">
        {/* Tabs */}
        <div className="flex flex-col min-[500px]:flex-row space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg ${categoryBy === cat
                ? "dark:bg-slate-800 bg-slate-300 text-black dark:text-white"
                : "text-gray-800 dark:text-gray-100"
                } transition-all duration-300`}
              onClick={() => setCategoryBy(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>


      {/* Cards */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-1 py-4">
        {currentDocs.length > 0 ? (
          currentDocs.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} className="document-card" />
          ))
        ) : (
          <div className="text-center py-10 col-span-full">
            <h3 className="mt-2 text-lg font-medium">No such documents found.</h3>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-600"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};


const iconMap = {
  pdf: <FaFilePdf />,
  docx: <MdOutlineDocumentScanner />,
  png: <FaFileImage />,
  jpeg: <FaFileImage />,
  jpg: <FaFileImage />,
  default: <MdOutlineDocumentScanner />
};

const DocumentCard = ({ doc, className = "" }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const avatar = doc.patient
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");

  // format date in dd mm yyyy format
  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');      // 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {/* Card */}
      <div className={`bg-white dark:bg-slate-800 dark:text-white p-4 rounded-2xl shadow hover:shadow-md shadow-gray-700 dark:hover:shadow-gray-300 dark:hover:bg-slate-900 hover:bg-gray-200 transition-all transform border border-gray-200 ${className}`}>
        {!!doc.title ? (
          <div className="flex items-center gap-2">
            <span className='text-2xl'>{iconMap[doc.type] || iconMap.default}</span>
            <h3 className="text-xl font-semibold text-black dark:text-white truncate text-wrap">{doc.title}</h3>
          </div>
        ) : (
          <h3 className="text-xl font-bold text-blue-800 dark:text-white">Medical Report</h3>
        )}

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
          {!!doc.type && <span className="bg-gray-200 px-2 py-1 rounded-md uppercase">{doc.type}</span>}
          {!!doc.size && <span className="text-black dark:text-white">{doc.size}</span>}
        </div>

        {!!doc.patient && (
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 bg-blue-100 text-blue-800 font-bold rounded-full flex items-center justify-center">
              {avatar}
            </div>
            <span className="text-md font-medium">{doc.patient}</span>
          </div>
        )}

        {!!doc.updatedAt && <h3 className='mt-2 text-sm text-gray-600 dark:text-slate-300'>Updated: {formatDate(doc.updatedAt)}</h3>}

        <div className="flex flex-col min-[400px]:flex-row gap-2 mt-4 justify-around text-sm font-medium">
          {!!doc.previewUrl &&
            (<button
              onClick={() => setIsViewerOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaEye /> View
            </button>)
          }

          {!!doc.url && (
            <button
              onClick={() => window.open(doc.url, "_blank", "noopener,noreferrer")}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FaDownload className="inline-block" />
              Download
            </button>
          )}

          {!!doc.aiSummary && (
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
              <RiRobot3Line /> Ask AI
            </button>
          )}
        </div>
      </div>

      {/* Viewer Modal */}
      {isViewerOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-5xl h-[80vh] overflow-hidden shadow-xl flex flex-col relative">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">Document Preview</h2>
              <button
                onClick={() => setIsViewerOpen(false)}
                className="text-gray-500 hover:text-red-600 text-lg"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {!!doc.url && (
                <iframe
                  src={doc.previewUrl}
                  className="w-full h-full"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      {
        isAIAssistantOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 dark:text-white rounded-lg w-[90%] max-w-3xl max-h-screen h-fit overflow-y-auto shadow-xl flex flex-col relative">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">AI Assistant</h2>
                <button
                  onClick={() => setIsAIAssistantOpen(false)}
                  className="text-gray-500 hover:text-red-600 text-lg"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {!!doc.aiSummary.overview && <p className="text-gray-700 dark:text-white mb-2">{doc.aiSummary.overview}</p>}

                {doc.aiSummary.vitals?.length > 0 && (
                  <>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-white">Vitals:</h3>
                    <ul className="list-disc pl-5 mb-4">
                      {doc.aiSummary.vitals.map((vital, index) => {
                        const status = vital.status.toLowerCase(); // Normalize casing
                        let textColor = "text-gray-700";

                        if (status === "high") textColor = "text-red-600 dark:text-red-400 font-semibold";
                        else if (status === "low") textColor = "text-blue-600 dark:text-blue-400 font-semibold";
                        else if (status === "normal") textColor = "text-black font-medium dark:text-white";

                        return (
                          <li key={index} className={textColor}>
                            {vital.name}: {vital.value} ({vital.status})
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {doc.aiSummary.analysis?.length > 0 && (
                  <>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-white">Analysis:</h3>
                    <ul className="list-disc pl-5 mb-4 text-black dark:text-white">
                      {doc.aiSummary.analysis.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {doc.aiSummary.recommendations?.length > 0 && (
                  <>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-white">Recommendations:</h3>
                    <ol className="list-decimal pl-5 text-black dark:text-white">
                      {doc.aiSummary.recommendations.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Documents;
