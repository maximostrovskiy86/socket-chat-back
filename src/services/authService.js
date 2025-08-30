import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const getToken = (candidate) => {
    const secret = process.env.JWT_SECRET;
	
    if (!secret) throw new Error("JWT_SECRET is not defined!");
    return jwt.sign({
        username: candidate.username,
        id: candidate.id,
        createdAt: candidate.createdAt,
        isBanned: candidate.isBanned,
        isMuted: candidate.isMuted,
        isAdmin: candidate.isAdmin,
    }, secret);
};

export const login = async (username, password) => {

    try {
        let candidate = await User.findOne({ username }).select("+password");
		
		if (!candidate) {
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            // const isAdmin = await User.count();
            const isAdmin = await User.countDocuments() === 0;


            // if (!isAdmin) {
            //   candidate = await User.create({
            //     username,
            //     password: hashPassword,
            //     isAdmin: true,
            //     isOnline: true,
            //   });
            // } else {
            candidate = await User.create({
                username,
                password: hashPassword,
                isOnline: true,
                isAdmin: !isAdmin,
                isBanned: false,
                isMuted: false,
            });
			console.log("candidate", candidate);

            return { user: candidate, token: getToken(candidate) };
        }

        if (candidate.isBanned) {
            console.log("USER isBanned");
            return false;
        }

        if (!(await bcrypt.compare(password, candidate.password))) {
            console.log("password", password);
            console.log("candidate.password", candidate.password);

            console.log("Wrong password");

            throw new Error("Wrong password");
        }
		
        const token = getToken(candidate);

        if (!candidate.isOnline) {
            candidate = await User.findByIdAndUpdate(
                candidate._id,
                { isOnline: true },
                {
                    new: true,
                }
            );
            // candidate.isOnline = true;
        }

        return { user: candidate, token };
    } catch (e) {
        // console.log(e);
        // res.status(400).json({ message: "Login error" });
        console.log(e.message);
    }
};