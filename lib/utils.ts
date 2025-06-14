import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadFile = async (
  file: File,
  userId: string,
  fileType: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  formData.append("fileType", fileType);

  const response = await fetch("/api/v1/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (response.ok) {
    return data.url;
  } else {
    alert("Upload failed");
  }
};
