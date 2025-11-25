import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './prisma/client'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key')

export async function verifyAuth(token: string) {
  const { payload } = await jwtVerify(token, secret)
  return payload
}

export async function authenticate(username: string, password: string) {
  // Usar queryRaw para evitar OFFSET en SQL Server con compatibilidad < 110
  const users = await prisma.$queryRaw<Array<{
    MODULO: string
    USUARIO: string
    CONTRASENA: string
    NOMBRE: string
    DIRECCION: string
    TELEFONO: string
    CARGO: string
    FECHA_EXPIRACION: Date
    ACTIVO: any
    CONSULTORIO: string
    GRUPO_RECAUDACION: string
    MEDICO: string | null
    FLAT1: boolean
    FLAT2: boolean
    FLAT3: boolean
    EESS: string
    DNI: string | null
    ESTADO: boolean | null
    USUNOMBRE: string | null
    USUPATERNO: string | null
    USUMATERNO: string | null
    FECHAULTIMOINGRESO: Date | null
  }>>`
    SELECT TOP (1) * 
    FROM [USUARIO] 
    WHERE MODULO = ${`FARMACIA`} AND USUARIO = ${username}
  `
  
  const user = users[0]
  if (!user) throw new Error('Usuario no encontrado')

  // Verificar si el usuario está activo
  if (Number(user.ACTIVO) !== 1) {
    throw new Error('Usuario inactivo')
  }

  // Comparación directa de contraseñas sin encriptación
  if (user.CONTRASENA !== password) {
    throw new Error('Contraseña incorrecta')
  }

  // Asumiendo que el campo CARGO se usa como rol/perfil
  const token = await new SignJWT({ 
    id: user.USUARIO,
    username: user.USUARIO,
    role: user.CARGO 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret)

  return { 
    token, 
    user: {
      USUARIO: user.USUARIO,
      PERFIL: user.CARGO, 
      NOMBRE: user.NOMBRE
    }
  }
}
