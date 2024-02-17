export function getEventFormatbyRequiredParticipants(
  requiredParticipants: number,
) {
  if (requiredParticipants === 6) return '3v3';
  if (requiredParticipants === 10) return '5v5';
  if (requiredParticipants === 14) return '7v7';
  if (requiredParticipants === 22) return '11v11';
  return null;
}
