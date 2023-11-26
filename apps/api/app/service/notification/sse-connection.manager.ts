import { Request, Response } from 'express';
import tokenHandler from '../../helpers/token.handler';
import { notificationEventManager } from './notification-event.manager';

export function sseConnectionManager(req: Request, res: Response) {
  const tokenInfos = tokenHandler.verifyTokenAndGetData(
    req.cookies.refreshToken,
    process.env.JWT_REFRESH_TOKEN_KEY as string,
  );
  const headers = {
    'Content-Type': 'text/event-stream',
    // add client url here
    'Access-Control-Allow-Origin': 'http://localhost:5004',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  const clientTestId = tokenInfos?.user_id;

  notificationEventManager.onNew((data) => {
    if (data.profileId !== clientTestId) return;
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  req.on('close', () => {
    console.log(`${clientTestId} connection closed`);
  });
}
