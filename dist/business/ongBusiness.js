"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OngBusiness = void 0;
const ongData_1 = require("../data/ongData");
const FilterUtils_1 = require("../utils/FilterUtils");
class OngBusiness {
    constructor() {
        this.ongData = new ongData_1.OngData();
    }
    async getAllOngs(filter) {
        try {
            const completeFilter = FilterUtils_1.FilterUtils.applyOngDefaults(filter);
            const ongs = await this.ongData.getAllOngs(completeFilter);
            return ongs;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getOngById(id_ong) {
        try {
            const ong = await this.ongData.getOngById(id_ong);
            return ong;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.OngBusiness = OngBusiness;
//# sourceMappingURL=ongBusiness.js.map