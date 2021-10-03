import express, { Request, Response } from "express";
import { getGoogleAuthURL, getJWTToken, getTokens } from "../../utils/authHelper";
import axios from 'axios'
import { getRepository } from "typeorm";
import User from "../entities/User";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {

  res.send({
    url: getGoogleAuthURL()
  })
});

router.get("/callback", async (req: Request, res: Response) => {
  try {

    console.log(res.header);
    

    const code = req.query.code as string;

    const { id_token, access_token } = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URL,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser: any = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    const userRepo = getRepository(User);
    const user = await userRepo.findOne(googleUser.id);
    if (!user) {
      await userRepo.save(
        userRepo.create({
          id: googleUser.id,
          email: googleUser.email,
          first_name: googleUser.given_name,
          last_name: googleUser.family_name,
          avatar: googleUser.picture
        })
      )
    }

    const token = getJWTToken(googleUser);

    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: (1000 * 60 * 60 * 24),
      secure: false,
    });

    res.redirect(process.env.CLIENT_ROOT_URI);

  } catch (error) {
    console.log(error);
    
  }

});

export default router;

