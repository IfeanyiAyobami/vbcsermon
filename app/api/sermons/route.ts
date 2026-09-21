import {NextResponse} from "next/server";import {getAllSermons} from "@/lib/data/sermons";export async function GET(){return NextResponse.json(await getAllSermons())}
