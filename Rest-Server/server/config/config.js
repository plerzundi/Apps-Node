
//============================
//  Puerto
//============================
process.env.PORT = process.env.PORT || 3000;


//============================
//  Entorno
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//============================
//  Fecha de expiración token
//============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 30 * 24;

//============================
//  SEED autentificación
//============================
process.env.SEED = process.env.SEED || 'secret';