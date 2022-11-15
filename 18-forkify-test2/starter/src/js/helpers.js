import { TIMEOUT_SEC } from './config';

const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async url => {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

// 정리하면 helper에서 에러를 기록하고 싶은것이 아니라 최종적으로 반환되는
// model.js 내부에서 에러를 찾고 싶을 떄 throw를 사용해서 에러를 던진다.
