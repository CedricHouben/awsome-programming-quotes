export function getHostname(window: Window, id: string) {
  return `${window.location.protocol}//${window.location.host}/${id}`;
}
