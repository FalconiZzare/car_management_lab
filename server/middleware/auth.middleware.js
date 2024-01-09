const { executeQuery } = require("../utils/utils");

module.exports = async (req, res, next) => {
  const authUser = req.headers["x-user-id"];

  try {
    const user = await executeQuery(`
        SELECT roleId
        FROM users
        WHERE id = '${authUser}'
    `);

    if (user?.length <= 0 || user[0]?.roleId !== 1) {
      return res.status(401).json({
        message: "Not Authorized!",
        success: false
      });
    } else if (user[0]?.roleId === 1) {
      next();
    }
  } catch (err) {
    res.status(403).json({ message: "Authorization failed!", success: false });
  }
};
