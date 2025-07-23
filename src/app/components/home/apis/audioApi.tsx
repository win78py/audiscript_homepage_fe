'use client';

import axios from 'axios';
import { API_URL } from '../constants/constant';

export const getAudioDetailAPI = (audioId: string) => {
	return axios.get(`${API_URL.AUDIO}/${audioId}`, {
		headers: {
			// Authorization: `Bearer ${access_token}`,
		},
	});
};

export const postAudioAPI = (params: any) => {
	const formData = new FormData();

	  for (const key in params) {
    if (key === 'file_url') {
      formData.append('file_url', params.file_url[0]);
    } else {
      formData.append(key, params[key]);
    }
  }

	try {
		const response = axios.post(API_URL.TRANSCRIBE, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};