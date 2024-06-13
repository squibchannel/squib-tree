import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { session } = await req.json();
  console.log(session);
  try {
    if (session.status !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Handle authorized POST request logic
    return NextResponse.json({ message: "Hello From TwitchBot" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
