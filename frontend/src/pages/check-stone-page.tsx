import React, { useEffect, useState } from 'react';

import { StoneInformation, useGetStoneInformation } from '../api/queries/use-get-stone-information';
import { JewelCodeInput } from '../components/jewel-code-input';
import { StoneInformationDisplay } from '../components/stone-information-display';
import { useToasts } from '../hooks/use-toasts';

export const CheckStonePage = () => {
  const [stoneId, setStoneId] = useState<number>();
  const [stone, setStone] = useState<StoneInformation>();
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToasts();
  const getStoneInformation = useGetStoneInformation();

  // fetches stone information for stoneId and sets stone state
  const fetchStone = async () => {
    if (!stoneId && stoneId !== 0) return;

    try {
      setLoading(true);
      setStone(undefined);
      const stone = await getStoneInformation(stoneId);
      setStone(stone);
    } catch (error: any) {
      showToast({
        severity: 'error',
        summary: 'Failed to get stone information.',
        detail: String(error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  // re-query stone information if stoneId has changed
  useEffect(() => {
    if (stoneId || stoneId === 0) fetchStone();
    else setStone(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stoneId]);

  const onStoneIdChanged = (stoneId: number) => setStoneId(stoneId);

  return (
    <>
      <span className="block text-6xl font-bold mb-1">Jewel prüfen</span>
      <p className="mt-0 mb-4 text-700 line-height-3">
        Wenn du einen Edelstein bei einen unserer Partner gekauft hast, kannst du dessen Lieferkette hier selbst
        nachvollziehen.
      </p>
      <JewelCodeInput onChange={onStoneIdChanged} />
      <div className="mt-4">
        {!!loading && <p>Lade Edelstein Informationen...</p>}
        {!!stone && <StoneInformationDisplay stone={stone} />}
      </div>
    </>
  );
};
