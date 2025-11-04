"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const usuarioData_1 = require("../data/usuarioData");
const FilterUtils_1 = require("../utils/FilterUtils");
class UserBusiness {
    constructor() {
        this.userData = new usuarioData_1.UserData();
    }
    async getAllUsers(filter) {
        try {
            const completeFilter = FilterUtils_1.FilterUtils.applyUserDefaults(filter);
            const users = await this.userData.getAllUsers(completeFilter);
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getUserById(id_usuario) {
        try {
            const user = await this.userData.getUserById(id_usuario);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=usuarioBusiness.js.map