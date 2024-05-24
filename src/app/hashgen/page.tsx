// https://mukeshsolanki.gitbook.io/hashtag-api/reference/api-reference/hashtags

import CopyHashesButton from "@/components/CopyHashesButton";
import KeywordHashSearch from "@/components/KeywordHashSearch";
import RenderMarquee from "@/components/RenderMarquee";
import HashTitle from "@/components/HashTitle";

export default async function HashGen() {
  // const topHashes = await simpleFetch(topHashURL, hashOptions);

  //TODO: ASSIGNMENT: Update the "daily top 100 hashes after a search"

  return (
    <div className="main flex justify-center flex-col ">
      <HashTitle />
      <div className="mx-auto relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg border bg-background sm:px-20 md:shadow-xl max-w-[90%]">
        <RenderMarquee />
      </div>
      <CopyHashesButton />
      <KeywordHashSearch />
    </div>
  );
}
