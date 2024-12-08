const User = require("./../models/user-model");
const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "No authorization token provided",
        success: false,
      });
    }
    // const user = await User.findOne({
    //   where: { access_token: token },
    // });

    // if (!user) {
    //   return res.status(401).json({
    //     message: "Invalid or expired token",
    //     success: false,
    //   });
    // }
    // req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

module.exports = verifyAccessToken;
