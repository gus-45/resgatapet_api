import { app } from "./app";
import { userRouter } from "./routes/usuarioRoutes";

app.use('/usuarios', userRouter)