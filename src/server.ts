import { app } from "./app";
import { animalRouter } from "./routes/animalRoutes";
import { ongRouter } from "./routes/ongRoutes";
import { userRouter } from "./routes/usuarioRoutes";

app.use('/usuarios', userRouter)
app.use('/animais', animalRouter);
app.use('/ongs', ongRouter);