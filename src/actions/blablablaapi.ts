"use server";

import HashGenAPI from "@/lib/axios/hashtagAPI";

import { predictResponse } from "@/types/api/hashgenAPI";

export async function hashGenSearch(
  keyword: string
): Promise<predictResponse | undefined> {
  try {
    const res = await HashGenAPI.get<predictResponse>("/tag/predict", {
      params: {
        keyword,
      },
    });

    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);

    return;
  }
}
// export async function hashGenSearch(keyword: string) {
//   try {
//     const res = await HashGenAPI.get("/tag/trending", {
//       params: {
//         keyword,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.log(error);

//     return;
//   }
// }
