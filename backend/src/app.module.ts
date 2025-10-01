import { Module } from '@nestjs/common';
import { CasosModule } from './casos/casos.module';
import { ArchivosModule } from './archivos/archivos.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [
    ArchivosModule,
    CasosModule,
    AuthModule,
    UsuariosModule,
    NotificacionesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
