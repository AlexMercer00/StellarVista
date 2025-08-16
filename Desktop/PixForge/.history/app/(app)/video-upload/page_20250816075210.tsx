"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  description?: string;
  publicId: string;
  duration: number;
}

export default function VideoUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoadingVideos(true);
      const res = await axios.get("/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle video upload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      setTitle("");
      setDescription("");
      setFile(null);
      fetchVideos(); // refresh video list
    } catch (err) {
      console.error(err);
      alert("Video upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Video Upload</h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-4 rounded">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="file-input file-input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {/* Video List */}
      <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
      {loadingVideos ? (
        <div>Loading videos...</div>
      ) : videos.length === 0 ? (
        <div>No videos uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="border p-2 rounded shadow">
              <video
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}.mp4`}
                controls
                className="w-full"
              />
              <h3 className="font-bold mt-2">{video.title}</h3>
              {video.description && <p>{video.description}</p>}
              <p className="text-sm text-gray-500">
                Duration: {Math.round(video.duration)}s
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}