import { User } from '@/modules/user/entities/user.entity';
import 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
