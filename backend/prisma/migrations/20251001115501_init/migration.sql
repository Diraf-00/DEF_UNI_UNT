-- CreateEnum
CREATE TYPE "EstadoCaso" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'RESUELTO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ESTUDIANTE_PREGRADO', 'ESTUDIANTE_POSGRADO', 'DOCENTE', 'ADMINISTRATIVO', 'EGRESADO', 'OTRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "codigo" TEXT,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direccion" TEXT,
    "tipo" "TipoUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caso" (
    "id" SERIAL NOT NULL,
    "expediente" TEXT NOT NULL,
    "codigoSeguimiento" TEXT NOT NULL,
    "estado" "EstadoCaso" NOT NULL DEFAULT 'PENDIENTE',
    "tipoVulneracion" TEXT NOT NULL,
    "fechaHechos" TIMESTAMP(3) NOT NULL,
    "lugarHechos" TEXT,
    "requiereAccion" BOOLEAN NOT NULL,
    "aceptaTerminos" BOOLEAN NOT NULL,
    "autorizaTratamientoDatos" BOOLEAN NOT NULL,
    "recurrenteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Caso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Denunciado" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT,
    "apellidos" TEXT,
    "cargoArea" TEXT,
    "relacion" TEXT NOT NULL,
    "casoId" INTEGER NOT NULL,

    CONSTRAINT "Denunciado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actualizacion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoCaso" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "detalle" TEXT,
    "casoId" INTEGER NOT NULL,

    CONSTRAINT "Actualizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "nombreArchivo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipoMime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "casoId" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Caso_expediente_key" ON "Caso"("expediente");

-- CreateIndex
CREATE UNIQUE INDEX "Caso_codigoSeguimiento_key" ON "Caso"("codigoSeguimiento");

-- CreateIndex
CREATE UNIQUE INDEX "Denunciado_casoId_key" ON "Denunciado"("casoId");

-- AddForeignKey
ALTER TABLE "Caso" ADD CONSTRAINT "Caso_recurrenteId_fkey" FOREIGN KEY ("recurrenteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denunciado" ADD CONSTRAINT "Denunciado_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "Caso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actualizacion" ADD CONSTRAINT "Actualizacion_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "Caso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "Caso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
