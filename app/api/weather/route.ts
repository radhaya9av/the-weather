import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // Ensure the route is treated as dynamic
export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
