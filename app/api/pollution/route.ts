import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // Ensure the route is treated as dynamic

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollution data ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}