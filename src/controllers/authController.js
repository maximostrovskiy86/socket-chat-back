import jwt from "jsonwebtoken";
import { login} from "../services/authService.js";

// eslint-disable-next-line consistent-return
export const authController = async (req, res) => {
  
  try {
    // console.log("REQUEST",req.body);
    
    const { username, password } = req.body;

    const data = await login(username, password);
    
    // console.log("DATA", data);

    if (!data) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already exist",
      });
    }

    res.json({
      status: "success",
      ...data,
    });
  } catch (e) {
    res.status(400).json({ message: "Login error" });
  }
};

//   const [bearer, token] = req.headers.authorization.split(" ");
//
//   if (bearer !== "Bearer") {
//     return res.status(401).json({
//       status: "401 Unauthorized",
//       code: 401,
//       message: "Username or password is wrong --bearer",
//     });
//   }
//
//   if (token === null) {
//     return res.status(401).json({
//       status: "401 Unauthorized",
//       code: 401,
//       message: "Unauthorized token",
//     });
//   }
//
//   try {
//     const user = jwt.decode(token, process.env.JWT_SECRET);
//     req.user = user;
//     res.json({
//       status: "success",
//       user,
//       token,
//     });
//   } catch (err) {
//     return res.status(401).json({
//       status: "401 Unauthorized",
//       code: 401,
//       message: "Please, provide a token",
//     });
//   }
// };
