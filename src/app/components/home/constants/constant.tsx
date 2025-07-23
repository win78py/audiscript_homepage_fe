'use client'
const BASE_URL = process.env.NEXT_PUBLIC_GO_BASE_URL;

export const API_URL = {
	AUDIO: `${BASE_URL}/audio`,
	TRANSCRIBE: `${BASE_URL}/audio/transcribe`,
};