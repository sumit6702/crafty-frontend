// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  (await cookies()).delete("token"); // Delete the token cookie
  localStorage.removeItem("token"); // Delete the token from local storage
  // Redirect to the login page
  return NextResponse.redirect(new URL("/login", request.url));
}
