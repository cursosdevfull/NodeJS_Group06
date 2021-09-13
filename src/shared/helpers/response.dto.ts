import { Result } from '../application/result.repository';

export class ResponseDto {
  static format<T>(
    traceId: string,
    data: T | T[],
    channelId: number,
    name: string,
    total: number = null
  ): Result<T> {
    if (total) {
      return { trace: { traceId, channelId, name }, payload: { data, total } };
    }
    return { trace: { traceId, channelId, name }, payload: { data } };
  }
}
