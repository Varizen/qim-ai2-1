"use client";

import { useState } from "react";

export default function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [purpose, setPurpose] = useState("");
  const [status, setStatus] = useState("");

  const upload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", purpose);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setStatus(data.success ? "Uploaded successfully!" : data.error || "Failed");
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="mt-4 text-gray-600">Upload knowledge base files.</p>

      <div className="mt-6 space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full border rounded-lg px-4 py-2"
        />
        <input
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Purpose (e.g. math, science)"
          className="block w-full border rounded-lg px-4 py-2"
        />
        <button
          onClick={upload}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </div>
    </main>
  );
}
