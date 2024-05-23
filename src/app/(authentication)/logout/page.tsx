import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { signOut } from "@/auth";

export default function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Logout of Twitch</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">Logout</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
