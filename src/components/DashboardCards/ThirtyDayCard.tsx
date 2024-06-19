// import { ThirtyDaySummaryType } from "@/providers/DashboardProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function ThirtyDayCard({ data }: any) {
  const { avgViewers, minStreamed, hrsWatched, maxViewers } = data;

  if (!avgViewers || !minStreamed || !hrsWatched || !maxViewers) {
    return <p>Loading... </p>;
  }

  return (
    <Card className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-purple-800 px-4 py-2">
        <CardTitle className="text-lg font-semibold text-purple-100">
          Thirty Day Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2 mt-2">
        {/* <p className="mb-4 text-purple-200">Recent:</p> */}
        <ul className="flex flex-wrap gap-2">
          <li className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100">
            {`Average Viewer Count: ${avgViewers}`}
          </li>
          <li className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100">
            {`Max Viewers: ${maxViewers}`}
          </li>
          <li className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100">
            {`Minutes Streamed: ${minStreamed}`}
          </li>
        </ul>
        <p className="mt-4 text-purple-200">
          Total Hours Watched:{" "}
          <span className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100 bg-opacity-25">
            {hrsWatched || 0}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default ThirtyDayCard;
