export async function getToken(code = ""): Promise<any> {
  var options = {
    code: code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT as string,
    grant_type: "authorization_code",
  };

  const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(options),
  });

  const result = await response.json();
  if (result && result.access_token) {
    return await getProfile(result);
  } else {
    return {};
  }
}

export async function getProfile(token = null, refresh = false): Promise<any> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_PROFILE + token?.access_token,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();
  result.access_token = token.access_token;
  result.refresh_token = refresh == false ? token.refresh_token : null;
  let now = new Date();
  const milliseconds = token.expires_in * 1000;
  result.expires_at = new Date(now.getTime() + milliseconds);

  return result;
}

export async function refreshToken(refreshToken = ""): Promise<any> {
  var options = {
    refresh_token: refreshToken as string,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    grant_type: "refresh_token",
  };

  const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(options),
  });

  const result = await response.json();
  if (result && result.access_token) {
    return await getProfile(result, true);
  } else {
    return {};
  }
}

export async function revokeToken(accessToken: String): Promise<any> {
  const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REVOKE + accessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({}),
  });

  const result = await response.json();
  return {};
}
