export function getPayload(response) {
  return response?.data ?? response ?? {};
}

export function getList(response) {
  const payload = getPayload(response);
  return payload?.list ?? [];
}

export function getPagination(response) {
  const payload = getPayload(response);
  return payload?.pagination ?? {};
}

export function getCount(response) {
  const payload = getPayload(response);
  return payload?.count ?? 0;
}
