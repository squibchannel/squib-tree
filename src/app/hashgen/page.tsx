// https://mukeshsolanki.gitbook.io/hashtag-api/reference/api-reference/hashtags

import { simpleFetch } from "@/actions/blablablaapi";
import Marquee from "@/components/ui/marquee";
import { testTags } from "@/lib/const";
import TagCard from "@/components/TagCard";

export default async function HashGen() {
  // const hashKey = process.env.HASHGEN_KEY!;

  // const topHashURL = "https://hashtag5.p.rapidapi.com/api/v2.1/tag/top";
  // const hashOptions = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": hashKey,
  //     "X-RapidAPI-Host": "hashtag5.p.rapidapi.com",
  //   },
  // };

  // const topHashes = await simpleFetch(topHashURL, hashOptions);

  return (
    <div className="main">
      <div className="relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg border bg-background sm:px-20 md:shadow-xl">
        <Marquee pauseOnHover reverse>
          {testTags.map((tag, index) => (
            <TagCard key={index} tag={tag} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
// huh
