"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const animalRoutes_1 = require("./routes/animalRoutes");
const ongRoutes_1 = require("./routes/ongRoutes");
const usuarioRoutes_1 = require("./routes/usuarioRoutes");
const adocaoRoutes_1 = require("./routes/adocaoRoutes");
const prioridadesRoutes_1 = require("./routes/prioridadesRoutes");
const doacaoRoutes_1 = require("./routes/doacaoRoutes");
const ocorrenciaRoutes_1 = require("./routes/ocorrenciaRoutes");
app_1.app.use('/usuarios', usuarioRoutes_1.userRouter);
app_1.app.use('/animais', animalRoutes_1.animalRouter);
app_1.app.use('/ongs', ongRoutes_1.ongRouter);
app_1.app.use('/adocoes', adocaoRoutes_1.adocaoRouter);
app_1.app.use('/prioridades', prioridadesRoutes_1.prioridadeRouter);
app_1.app.use('/doacoes', doacaoRoutes_1.doacaoRouter);
app_1.app.use('/ocorrencias', ocorrenciaRoutes_1.ocorrenciaRouter);
//# sourceMappingURL=server.js.map