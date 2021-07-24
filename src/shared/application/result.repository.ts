export interface Result<T> {
  trace: { traceId: string; channelId: number; name: string };
  payload: { data: T | T[] } | { data: T | T[]; total: number };
}
