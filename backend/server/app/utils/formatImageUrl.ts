import urljon from 'url-join';
import { SERVER_URL } from '../constants';

export default function formatImageUrl(...paths: string[]) {
  return urljon(SERVER_URL, 'uploads', ...paths);
}
