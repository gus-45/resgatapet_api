"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authBusiness_1 = require("../business/authBusiness");
class AuthController {
    constructor() {
        this.authBusiness = new authBusiness_1.AuthBusiness();
        this.login = async (req, res) => {
            try {
                const { email, senha } = req.body;
                const result = await this.authBusiness.login({ email, senha });
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map