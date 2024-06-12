import createError from '@fastify/error'

export const AUTH_NO_TOKEN = createError('AUTH_NO_TOKEN', 'x-access-token is missing', 401);
export const AUTH_INVALID_TOKEN = createError('AUTH_INVALID_TOKEN', 'The token provided is invalid', 401);

export const AUTH_NO_ADMIN_TOKEN = createError('AUTH_NO_ADMIN_TOKEN', 'admin-token is missing', 401);
export const AUTH_INVALID_ADMIN_TOKEN = createError('AUTH_INVALID_ADMIN_TOKEN', 'The admin-token provided is invalid', 401);

export const ALREADY_EXISTS = createError('ALREADY_EXISTS', 'The object already exists', 412);

export const PROPERTY_ISADMIN_FALSE = createError('PROPERTY_ISADMIN_FALSE', 'isAdmin property must be true', 400);

export const USER_NOT_FOUND = createError('USER_NOT_FOUND', 'This user could not be found', 404);
export const USER_ALREADY_EXISTS = createError('ALREADY_EXISTS', 'This user already exists', 400);