/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles);

// 1 = ADMIN
// 2 = REGISTRAR
// 3 = DATA_ENTRY
// 4 = BANK_OFFICER
// 5 = LAWYER
// 6 = PUBLIC