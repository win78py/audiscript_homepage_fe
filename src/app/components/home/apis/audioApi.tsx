"use client";

import axios from "axios";
import { API_URL } from "../constants/constant";
interface postParams {
  file_url: File[];
}

export const getAudioDetailAPI = (audioId: string) => {
  return axios.get(`${API_URL.AUDIO}/${audioId}`, {
    headers: {
      // Authorization: `Bearer ${access_token}`,
    },
  });
};

export const postAudioAPI = (params: postParams) => {
  const formData = new FormData();

  formData.append("file_url", params.file_url[0]);

  try {
    const response = axios.post(API_URL.TRANSCRIBE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
	  timeout: 999999,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
