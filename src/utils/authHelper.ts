import querystring from "querystring";
import axios from 'axios'
import jwt from "jsonwebtoken";

const getGoogleAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.REDIRECT_URL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

const getTokens = ({ code, clientId, clientSecret, redirectUri }): any => {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`);
      throw new Error(error.message);
    });
}

const getJWTToken = (data) => {
  const token = `Bearer ${jwt.sign(data, process.env.JWT_SECRET)}`;
  return token;
}

const decodeToken = (token) => {
  return jwt.decode(token.replace("Bearer ", ""));
}

export {
  getGoogleAuthURL,
  getTokens,
  getJWTToken,
  decodeToken
}