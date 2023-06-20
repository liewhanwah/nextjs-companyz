import { refreshToken, revokeToken } from "./googleAPI";

export function getParam() {
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT as string,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
    scope: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SCOPE,
  };

  return `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}?${new URLSearchParams(
    options
  ).toString()}`;
}

export async function tokenRefresh(userProfile) {
  let now = new Date();
  const milliseconds = 300 * 1000; //300 seconds
  const futureDate = new Date(now.getTime() + milliseconds);

  if (futureDate > new Date(userProfile?.expires_at)) {
    return await refreshToken(userProfile.refresh_token);
  } else {
    return null;
  }
}

export async function tokenRevoke(accessToken: String) {
  return await revokeToken(accessToken);
}
