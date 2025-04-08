// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import { XCircle } from "lucide-react";

// const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

// const CreateTicket = () => {
//   const [files, setFiles] = useState([]);
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const calculateTotalSize = (fileArray) => {
//     return fileArray.reduce((acc, file) => acc + file.size, 0);
//   };

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       const newFiles = acceptedFiles.filter(
//         (newFile) => !files.some((existingFile) => existingFile.name === newFile.name)
//       );

//       if (newFiles.length === 0) {
//         setMessage("⚠️ No new files added. They may already be selected.");
//         return;
//       }

//       const totalSize = calculateTotalSize([...files, ...newFiles]);

//       if (totalSize > MAX_TOTAL_SIZE) {
//         setMessage(`⚠️ Total file size exceeds 10MB. Please remove some files.`);
//         return;
//       }

//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//       setMessage("");
//     },
//     [files]
//   );

//   const handleRemoveFile = (fileName) => {
//     setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
//   };

//   const handleUpload = async () => {
//     if (!subject.trim() || !description.trim()) {
//       setMessage("⚠️ Please fill in all fields before uploading.");
//       return;
//     }
//     // if (files.length === 0) {
//     //   setMessage("⚠️ Please select at least one file.");
//     //   return;
//     // }

//     const formData = new FormData();
//     // formData.append("subject", subject);
//     // formData.append("description", description);
//     // formData.append("priority", priority);

//     // formData.append("createdAt", new Date().toISOString()); // Current timestamp
//     // formData.append("createdBy", "System"); // Change accordingly if needed
//     // formData.append("displayPage", "Support Ticket Page");
//     // formData.append("loanRef", "N/A"); // Change dynamically if needed

//     // Browser and Version
//     const userAgent = navigator.userAgent;
//     formData.append("browserVersion", userAgent);

//     // Default Employee Details
//     formData.append("sourceChecker", "falcon"); // Assuming "falcon" is a predefined source
//     formData.append("employeeName", "Default Name");
//     formData.append("employeeBranch", "BLR");
//     formData.append("employeeEmail", "example@gmail.com");
//     formData.append("employeePhone", "9191919191");
//     formData.append("employeeRole", "Credit Executive");
//     formData.append("employeeDepartment", "Credit");

//     formData.append("subject", subject);
//     formData.append("description", description);
//     formData.append("priority", priority);
//     formData.append("createdAt", new Date().toISOString());
//     formData.append("createdBy", "System");
//     formData.append("source", "GTR - Sourcing Engine");
//     formData.append("displayPage", `${window.location.href} (AllApplicants)`);

//     // formData.append("displayPage", "http://localhost:3000/applications (AllApplicants)");
//     formData.append("loanRef", "No Value");
//     // formData.append("browserVersion", "Chrome 134");
//     formData.append("employeeName", "Uday Telecaller");
//     formData.append("employeeBranch", "BENGALURU");
//     formData.append("employeeEmail", "udaykumar.nm@varthana.com");
//     formData.append("employeePhone", "1111111111");
//     formData.append("employeeLogin", "17");
//     formData.append("employeeLoginId", "17");
//     formData.append("employeeRoleId", JSON.stringify([
//       { roleId: 22, role: "CREDIT EXECUTIVE", department: "CREDIT" },
//       { roleId: 26, role: "GM", department: "CREDIT" },
//       { roleId: 35, role: "CREDIT OFFICER", department: "CREDIT" },
//       { roleId: 39, role: "SENIOR UNDERWRITER", department: "CREDIT" },
//       { roleId: 38, role: "CREDIT UNDERWRITER", department: "CREDIT" },
//       { roleId: 29, role: "CREDIT MANAGER", department: "CREDIT" },
//       { roleId: 5, role: "ADMIN", department: "IT" },
//       { roleId: 20, role: "TELECALLER", department: "SALES" },
//       { roleId: 19, role: "RELATIONSHIP MANAGER", department: "SALES" },
//       { roleId: 42, role: "OPERATIONS CHECKER", department: "OPERATIONS" },
//       { roleId: 55, role: "DISB OPS", department: "OPERATIONS" },
//       { roleId: 53, role: "SCHOOL LOAN CIBIL CHECKER", department: "OPERATIONS" },
//       { roleId: 54, role: "OPS REVIEWER", department: "OPERATIONS" },
//       { roleId: 41, role: "OPERATIONS MAKER", department: "OPERATIONS" },
//       { roleId: 30, role: "OPERATION MANAGER", department: "OPERATIONS" }
//     ]))

//     if (files.length > 0) {
//       files.forEach((file) => {
//         formData.append("files", file);
//       });
//     }

//     try {
//       setUploading(true);
//       setMessage("");
//       const response = await axios.post("http://localhost:8082/api/v1/upload", formData);
//       setMessage(`✅ Upload successful! Issue Key: ${response.data.issueKey}`);
//       setSubject("");
//       setDescription("");
//       setPriority("Medium");
//       setFiles([]);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setMessage("❌ Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/png": [],
//       "image/jpeg": [],
//       "image/svg+xml": [],
//       "video/mp4": [],
//       "application/pdf": [], // PDF files
//       "application/msword": [], // .doc files
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [], // .docx files
//       "application/vnd.ms-excel": [], // .xls files
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [], // .xlsx files
//       "application/zip": [], // ZIP files
//       "application/x-zip-compressed": [], // ZIP compressed
//     },
//     multiple: true,
//   });


//   return (

//     <div className="w-[500px] p-6">
//       <h2 className="text-lg font-bold text-center text-black mb-4">Contact Support</h2>
//       <input type="text" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border border-black rounded-md mb-2" />
//       <textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-black rounded-md mb-2 resize-none" rows={3}></textarea>
//       <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border border-black rounded-md mb-4">
//         <option value="High">High</option>
//         <option value="Medium">Medium</option>
//         <option value="Low">Low</option>
//       </select>
//       <div {...getRootProps()} className={`w-full h-[200px] p-6 border-2 border-dashed rounded-lg cursor-pointer transition flex flex-col items-center justify-center ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-800 bg-gray-300 hover:bg-gray-100"}`}>
//         <input {...getInputProps()} />
//         <p className="text-gray-600">{isDragActive ? "📂 Drop files here..." : "Drag & drop files here, or click to select (max 10MB total)"}</p>
//       </div>
//       {files.length > 0 && (
//         <div className="mt-4 grid grid-cols-3 gap-2">
//           {files.map((file, index) => (
//             <div key={index} className="relative group">
//               {file.type.startsWith("image") ? (
//                 <img src={URL.createObjectURL(file)} alt={file.name} className="w-30 h-24 object-cover rounded-md shadow-lg" />
//               ) : (
//                 <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{file.name}</a>
//               )}
//               <button onClick={() => handleRemoveFile(file.name)} className="absolute top-0 right-0 bg-white rounded-full p-1 opacity-75 hover:opacity-100">
//                 <XCircle className="w-5 h-5 text-red-500" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <button onClick={handleUpload} className={`mt-4 w-full py-2 rounded-lg text-white transition ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-600"}`} disabled={uploading}>
//         {uploading ? "Creating a ticket..." : "Raise a Ticket"}
//       </button>
//       {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
//     </div>

//   );
// };

// export default CreateTicket;

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { BiCloudUpload } from "react-icons/bi";
import Loading from "../components/Loading"; // adjust path as needed

const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

const playSuccessSound = () => {
  const audio = new Audio("/success.mp3");
  audio.play().catch((err) => console.warn("Sound play error:", err));
};


const CreateTicket = () => {
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const calculateTotalSize = (fileArray) =>
    fileArray.reduce((acc, file) => acc + file.size, 0);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.filter(
        (file) => !files.some((f) => f.name === file.name)
      );

      const totalSize = calculateTotalSize([...files, ...newFiles]);
      if (totalSize > MAX_TOTAL_SIZE) {
        setMessage("⚠️ Total file size exceeds 10MB. Please remove some files.");
        return;
      }

      if (newFiles.length === 0) {
        setMessage("⚠️ No new files added. They may already be selected.");
        return;
      }

      setFiles((prev) => [...prev, ...newFiles]);
      setMessage("");
    },
    [files]
  );

  const handleRemoveFile = (fileName) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const buildFormData = () => {
    const formData = new FormData();
    const userAgent = navigator.userAgent;

    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("createdAt", new Date().toISOString());
    formData.append("createdBy", "System");
    formData.append("source", "GTR - Sourcing Engine");
    formData.append("displayPage", `${window.location.href} (AllApplicants)`);
    formData.append("loanRef", "No Value");
    formData.append("browserVersion", userAgent);
    formData.append("sourceChecker", "falcon");
    formData.append("employeeName", "Uday Telecaller");
    formData.append("employeeBranch", "BENGALURU");
    formData.append("employeeEmail", "udaykumar.nm@varthana.com");
    formData.append("employeePhone", "1111111111");
    formData.append("employeeLogin", "17");
    formData.append("employeeLoginId", "17");

    formData.append(
      "employeeRoleId",
      JSON.stringify([
        { roleId: 22, role: "CREDIT EXECUTIVE", department: "CREDIT" },
        { roleId: 26, role: "GM", department: "CREDIT" },
        { roleId: 35, role: "CREDIT OFFICER", department: "CREDIT" },
        { roleId: 39, role: "SENIOR UNDERWRITER", department: "CREDIT" },
        { roleId: 38, role: "CREDIT UNDERWRITER", department: "CREDIT" },
        { roleId: 29, role: "CREDIT MANAGER", department: "CREDIT" },
        { roleId: 5, role: "ADMIN", department: "IT" },
        { roleId: 20, role: "TELECALLER", department: "SALES" },
        { roleId: 19, role: "RELATIONSHIP MANAGER", department: "SALES" },
        { roleId: 42, role: "OPERATIONS CHECKER", department: "OPERATIONS" },
        { roleId: 55, role: "DISB OPS", department: "OPERATIONS" },
        { roleId: 53, role: "SCHOOL LOAN CIBIL CHECKER", department: "OPERATIONS" },
        { roleId: 54, role: "OPS REVIEWER", department: "OPERATIONS" },
        { roleId: 41, role: "OPERATIONS MAKER", department: "OPERATIONS" },
        { roleId: 30, role: "OPERATION MANAGER", department: "OPERATIONS" },
      ])
    );

    files.forEach((file) => formData.append("files", file));
    return formData;
  };

  const handleUpload = async () => {
    if (!subject.trim() || !description.trim()) {
      setMessage("⚠️ Please fill in all fields before uploading.");
      return;
    }
  
    try {
      setUploading(true);
      setMessage("");
      const formData = buildFormData();
  
      const response = await axios.post(
        "http://localhost:8082/api/v1/upload",
        formData
      );
  
      playSuccessSound(); // ✅ Play sound on success
  
      setMessage("✅We have received your query, We will get back to you shortly!");
      console.log(`Issue Key: ${response.data.issueKey}`);
      setSubject("");
      setDescription("");
      setPriority("Medium");
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("❌ Failed to create a ticket, try again later!");
    } finally {
      setUploading(false);
    }
  };
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/mp4": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/zip": [],
      "application/x-zip-compressed": [],
    },
    multiple: true,
  });

  if (uploading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-white">
        <Loading />
        <p className="mt-4 text-lg text-center">Creating a ticket for you, please hold tight...</p>
      </div>
    );
  }

  return (
    <div className="w-[500px] p-4 bg-[#253744] border border-[#809BCE] border-b-[#48A248] border-b-2 shadow-4xl">
      <h2 className="text-lg font-bold text-center text-white mb-4">
        Contact Support
      </h2>

      <input
        type="text"
        placeholder="Enter subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border-none text-white outline-none rounded-md mb-2 bg-black"
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border-none text-white outline-none rounded-md mb-2 bg-black"
        rows={3}
      />

      <div className="relative mb-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full p-2 border-none text-white outline-none rounded-md bg-black text-left"
        >
          {priority}
        </button>

        <div
          className={`absolute w-full mt-1 bg-black text-white rounded-md shadow-md z-10 transform transition-all duration-200 origin-top ${dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}
        >
          {["High", "Medium", "Low"].map((level) => (
            <div
              key={level}
              onClick={() => {
                setPriority(level);
                setDropdownOpen(false);
              }}
              className={`p-2 cursor-pointer hover:bg-gray-800 ${priority === level ? "bg-gray-600" : ""
                }`}
            >
              {level}
            </div>
          ))}
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`w-full h-[200px] p-6 border-2 border-dashed rounded-lg cursor-pointer transition flex flex-col items-center justify-center ${isDragActive
          ? "border-blue-500 bg-blue-300"
          : "border-black bg-gray-300 hover:bg-green-200"
          }`}
      >
        <input {...getInputProps()} />
        <div className="mb-2">
          <BiCloudUpload size={100} />
        </div>
        <p className="text-gray-600 text-center">
          {isDragActive
            ? "📂 Drop files here..."
            : "Drag & drop files here, or click to select (max 10MB total)"}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {files.map((file, index) => {
            const fileURL = URL.createObjectURL(file);
            const isImage = file.type.startsWith("image/");
            const isPdf = file.type === "application/pdf";

            return (
              <div
                key={index}
                className="relative group bg-white border shadow-2xl rounded-md shadow-md overflow-hidden"
              >
                {isImage ? (
                  <img
                    src={fileURL}
                    alt={file.name}
                    className="w-full h-24 object-cover rounded-md"
                  />
                ) : isPdf ? (
                  <iframe
                    src={fileURL}
                    title={file.name}
                    className="w-full h-24 rounded-md"
                  />
                ) : (
                  <div className="w-full h-24 bg-gray-600 rounded-md flex items-center justify-center text-xs text-white text-center px-2">
                    📄 {file.name}
                  </div>
                )}

                <button
                  onClick={() => handleRemoveFile(file.name)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-75 hover:opacity-100"
                >
                  <RxCross2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={handleUpload}
        className={`mt-4 w-full py-2 rounded-lg text-white transition ${uploading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-gray-800 hover:bg-black"
          }`}
        disabled={uploading}
      >
        {uploading ? "Creating a ticket..." : "Raise a Ticket"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-300">{message}</p>
      )}
    </div>
  );
};

export default CreateTicket;

