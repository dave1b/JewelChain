import { jsPDF } from 'jspdf';

import { NewRegisteredStone } from '../api/mutations/use-register-new-stone';

// creates and downloads a pdf
export const createCertificate = (stone: NewRegisteredStone) => {
  const doc = new jsPDF();
  doc.text([`Miner: ${stone.owner}`, `Jewel-Code: ${String(stone.stoneId)}`], 10, 10);
  doc.save(`jewelchain-jewel-${stone.stoneId}.pdf`);
};
