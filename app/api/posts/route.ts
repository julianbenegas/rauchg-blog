import { NextResponse } from "next/server";
import { getBaseHubPostsMeta } from "@/app/basehub/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getBaseHubPostsMeta());
}
