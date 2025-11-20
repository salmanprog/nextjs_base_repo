"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import useApi from "@/utils/useApi";
import { useParams, useRouter } from "next/navigation";

export default function EditEvent() {
  const router = useRouter();
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("1");
  const [image, setImage] = useState<File | null>(null);
  const [oldImage, setOldImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch categories
  const { data: categoryList, fetchApi: fetchCategories } = useApi({
    url: "/api/admin/events/category",
    method: "GET",
    type: "manual",
    requiresAuth: true,
  });

  // Fetch single event
  const { data: eventData, fetchApi: fetchEvent } = useApi({
    url: `/api/admin/events/${slug}`,
    method: "GET",
    type: "manual",
    requiresAuth: true,
  });

  // Update Event API
  const { sendData, loading } = useApi({
    url: `/api/admin/events/${slug}`,
    method: "PATCH",
    type: "manual",
    requiresAuth: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchEvent();
  }, []);

  // Fill edit form fields
  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title ?? eventData.name ?? "");
      setDescription(eventData.description || "");
      setStatus(eventData.status ? "1" : "0");
      setCategoryId(String(eventData.categoryId));  // ⭐ Important
      setOldImage(eventData.imageUrl || null);
    }
  }, [eventData]);

  const updateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title) return setErrorMsg("Event title is required.");
    if (!categoryId) return setErrorMsg("Category is required.");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("categoryId", categoryId);
      formData.append("description", description);
      formData.append("status", status);

      if (image) formData.append("image", image);

      const res = await sendData(formData, undefined, "PATCH");

      if (res.code === 200) {
        //router.push(`/admin/event/edit/${slug}`);
        setSuccessMsg("Event updated successfully!");
      } else {
        setErrorMsg(res.message || "Something went wrong.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Update failed. Try again.");
    }
  };

  return (
    <div className="p-4 mx-auto md:p-6">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Edit Event
        </h2>
      </div>
      {successMsg && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03]">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Event Details
          </h3>
        </div>

        <div className="p-4 sm:p-6">
          <form onSubmit={updateEvent} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block mb-1 text-sm font-medium">Event Title</label>
              <input
                type="text"
                className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium">Event Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-11 w-full rounded-lg border px-4"
              >
                <option value="">-- Select Category --</option>
                {categoryList?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-sm font-medium">Description</label>
              <textarea
                rows={5}
                className="w-full rounded-lg border px-4 py-2.5 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1 text-sm font-medium">Event Image</label>

              {oldImage && !image && (
                <img
                  src={oldImage}
                  className="w-32 h-32 object-cover rounded-md mb-2"
                  alt="Old"
                />
              )}

              <label className="cursor-pointer block border-2 border-dashed p-6 rounded-lg text-center">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setImage(e.target.files[0]);
                  }}
                />
                <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                {image && <p className="text-xs text-green-600 mt-2">{image.name}</p>}
              </label>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full border rounded-lg px-4 py-2.5"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Update Event
              </Button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}
