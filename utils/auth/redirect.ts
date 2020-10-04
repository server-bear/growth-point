import { IncomingMessage, ServerResponse } from 'http';
import endpoints from '../../constants/endpoints';

const allowRoutes = [
  endpoints.pages.login,
  endpoints.pages.signup,
];

function redirectLogin(req: IncomingMessage, res: ServerResponse | undefined) {
  if (res && !allowRoutes.includes(req.url as string)) {
    res.writeHead(302, { Location: endpoints.pages.login });
    res.end();
  }
}

export default redirectLogin;
