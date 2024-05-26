"use server";

import hashtagAPI from "@/lib/axios/hashtagAPI";

import { predictResponse } from "@/types/api/hashgenAPI";

export async function hashGenSearch(
  keyword: string
): Promise<predictResponse | undefined> {
  try {
    const res = await hashtagAPI.get<predictResponse>("/tag/predict", {
      params: {
        keyword,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function hashImageSearch(
  imageString: string
): Promise<predictResponse | undefined> {
  try {
    const res = await hashtagAPI.post<predictResponse>("/tag/generate", {
      image: imageString,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getDailyTags(): Promise<predictResponse | undefined> {
  try {
    const res = await hashtagAPI.get<predictResponse>("/tag/trending");
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
}
