import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

import { NewRegisteredStone } from '../api/mutations/use-register-new-stone';

// creates and downloads a pdf
export const createCertificate = async (stone: NewRegisteredStone) => {
  // create QR-Code of stoneId encoded as base64 string
  // @ts-ignore QRCode.toDataURL typing doesn't return a promise but the implementation does
  const base64Image: string = await QRCode.toDataURL(document.getElementById('qr_code'), `${stone.stoneId}-JEWELCHAIN-JEWELCODE`);

  const doc = new jsPDF();
  doc.text([`Miner: ${stone.owner}`, `Jewel-Code: ${String(stone.stoneId)}`], 10, 20);
  doc.addImage(base64Image, 'png', 10, 30, 160, 160);
  doc.save(`jewelchain-jewel-${stone.stoneId}.pdf`);
};
