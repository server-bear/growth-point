import { IncomingMessage } from 'http';

const getOriginFromRequest = (req: IncomingMessage) => {
  const { host } = req.headers;
  const protocol = host?.includes('localhost') ? 'http' : 'https';

  return `${protocol}://${host}`;
};

export default getOriginFromRequest;
