// https://mukeshsolanki.gitbook.io/hashtag-api/reference/api-reference/hashtags

import CopyHashesButton from "@/components/CopyHashesButton";
import KeywordHashSearch from "@/components/KeywordHashSearch";
import RenderMarquee from "@/components/RenderMarquee";

export default async function HashGen() {
  // const topHashes = await simpleFetch(topHashURL, hashOptions);

  return (
    <div className="main flex justify-center flex-col ">
      <h3 className="flex justify-center mb-4 text-2xl">
        Daily Top 100 Hashes
      </h3>
      <div className="mx-auto relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg border bg-background sm:px-20 md:shadow-xl max-w-[90%]">
        <RenderMarquee />
      </div>
      <CopyHashesButton />
      <KeywordHashSearch />
    </div>
  );
}
