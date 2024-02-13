import jwt from "jsonwebtoken";

export const postLogoutController = async (req, res) => {
    res.clearCookie("jwt");
    res.clearCookie("JWTinfo");
    res.send({msg: "erfolgreich ausgeloggt"});
}
