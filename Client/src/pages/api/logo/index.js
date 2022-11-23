import { storage } from '@/config/firebaseConfig';
import Cors from 'cors';
import { getBytes, ref } from 'firebase/storage';

const cors = Cors({ methods: ['GET', 'HEAD'] });

function runMiddleWare(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleWare(req, res, cors);

  const logo2 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/Client/public/images/lapaz-logo.jpg'
  ).then((r) => r.blob());
  res.status(200).json({ logo1, logo2 });
}
