import * as Session from 'express-session';

import { User } from '../user/user.entity';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

type ExpressSession = Session.Session & Partial<Session.SessionData>;
