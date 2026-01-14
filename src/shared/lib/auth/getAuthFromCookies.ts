import { cookies } from "next/headers";
import { auth } from "@/shared/config/auth";
import type { Role } from "@/shared/lib/auth";

export async function getAuthFromCookies(): Promise<{
  hasToken: boolean;
  role: Role | null;
}> {
  const cookieStore = await cookies();
  const hasToken = Boolean(cookieStore.get(auth.accessTokenCookieName)?.value);
  const rawRole = cookieStore.get(auth.roleCookieName)?.value ?? null;
  const role: Role | null =
    rawRole === "STUDENT" || rawRole === "INSTRUCTOR" ? rawRole : null;

  return { hasToken, role };
}

