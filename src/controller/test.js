import { encryptPassword, verifyPassword } from "../utility/bcrypt.js";

export async function firstcount(req, res) {
  try {
    const { name, password } = req.body;

    const hashedPassword = await encryptPassword(password);

    return res.status(200).send({ massage: "success", name, password: hashedPassword });
  } catch (error) {
    return res.status(500).send({ massage: "internal server errors! " });
  }
}

export const validatePassword = async (req, res) => {
  try {
    const isValid = await verifyPassword(req.body.password,"$2b$10$FvcICLFbxTKHc2Rumf2fNu4JhPIWVTJUgeSbEm/xRvdvTJz3yJcw6"
    );
    if (isValid) {
      return res.status(200).send({ message: "Login successfully" });
    }
    return res.status(400).send({ message: "Unauthorized!" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error!" });
  }
};
