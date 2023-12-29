import { Request, Response } from 'express';
import tokenHandler from '../../helpers/token.handler';
import { notificationEventManager } from './notification-event.manager';
import logger from '../../helpers/logger';
import { SSENotificationData } from 'skillcoop-types';
import { CLIENT_URL } from '../../utils/variables';

export function sseConnectionManager(req: Request, res: Response) {
  const tokenInfos = tokenHandler.verifyTokenAndGetData(
    req.cookies.refreshToken,
    process.env.JWT_REFRESH_TOKEN_KEY as string,
  );
  logger.info('SSE connection : on');

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
