import { Request, Response } from 'express';
import tokenHandler from '../../helpers/token.handler.js';
import { notificationEventManager } from './notification-event.manager.js';
import logger from '../../helpers/logger.js';
import { SSENotificationData } from '@skillcoop/types';
import { CLIENT_URL } from '../../utils/variables.js';

export function sseConnectionManager(req: Request, res: Response) {
  const tokenInfos = tokenHandler.verifyTokenAndGetData(
    req.cookies.refreshToken,
    process.env.JWT_REFRESH_TOKEN_KEY as string,
  );

  if (!tokenInfos) {
    return res.sendStatus(401);
  }

  logger.info('SSE connection : on' + CLIENT_URL);

  const headers = {
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': CLIENT_URL,
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);

  const clientId = tokenInfos?.user_id;

  notificationEventManager.on(
    'new-notification',
    (data: SSENotificationData) => {
      if (data.profileId !== clientId) return;
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
  );

  req.on('close', () => {
    console.log(`${clientId} connection closed`);
    notificationEventManager.removeAllListeners('new-notification');
  });
}
