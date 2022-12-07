import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';

import { StoneInformation, useGetStoneInformation } from '../api/queries/use-get-stone-information';
import { AddStepDialog } from '../components/add-step-dialog';
import { JewelCodeInput } from '../components/jewel-code-input';
import { NeedsAuthContainer } from '../components/needs-auth-container';
import { PassOwnershipDialog } from '../components/pass-ownership-dialog';
import { StoneInformationDisplay } from '../components/stone-information-display';
import { useToasts } from '../hooks/use-toasts';
import { isEqualAddress } from '../utils/is-equal-address';
import { useAuth } from './../hooks/use-auth';

export const UpdateStonePage = () => {
  const [stoneId, setStoneId] = useState<number>();
  const [stone, setStone] = useState<StoneInformation>();
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToasts();
  const getStoneInformation = useGetStoneInformation();
  const { accountAddress } = useAuth();

  const fetchStone = async () => {
    if (!stoneId && stoneId !== 0) return;

    try {
      setLoading(true);
      const stone = await getStoneInformation(stoneId);
      setStone(stone);
    } catch (error: any) {
      // error?.message is "Returned error: Error: VM Exception while processing transaction: reverted with reason string 'Dieser Stein existiert nicht'"
      // extract "Dieser Stein existiert nicht" from error?.message
      const reasonIndex = error?.message?.indexOf('reason string');
      const reason = error?.message?.substring(reasonIndex + 15, error?.message?.length - 1);

      showToast({
        severity: 'error',
        summary: 'Jewel-Informationen nicht erhalten.',
        detail: String(reason || error?.message || error),
        sticky: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (stoneId || stoneId === 0) fetchStone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stoneId]);

  const onStoneIdChanged = (stoneId: number) => setStoneId(stoneId);

  const onAddedStep = () => fetchStone();

  const onPassedOwnership = () => {
    setStoneId(undefined);
    setStone(undefined);
  };

  const [addStepDialogVisible, setAddStepDialogVisible] = useState<boolean>(false);
  const onHideAddStepDialog = () => setAddStepDialogVisible(false);
  const onShowAddStepDialog = () => setAddStepDialogVisible(true);

  const [passOwnerDialogVisible, setPassOwnerDialogVisible] = useState<boolean>(false);
  const onHidePassOwnerDialog = () => setPassOwnerDialogVisible(false);
  const onShowPassOwnerDialog = () => setPassOwnerDialogVisible(true);

  const ownsStone = isEqualAddress(stone?.owner, accountAddress);

  return (
    <>
      <span className="block text-6xl font-bold mb-1">Jewel aktualisieren</span>
      <p className="mt-0 mb-4 text-700 line-height-3">
        Hier kannst du einen neuen Verarbeitungsschritt zu deinem Edelstein hinzufügen und den Besitz von deinem
        Edelstein weitergeben.
      </p>
      <NeedsAuthContainer>
        <>
          <p className="mt-0 mb-4 text-700 line-height-3">
            Bitte gebe zuerst an, welchen Edelstein du bearbeiten möchtest.
          </p>
          <JewelCodeInput onChange={onStoneIdChanged} />
          <div className="mt-4">
            {!!loading && 'Lade Edelstein Informationen...'}
            {!!stone && (
              <>
                <AddStepDialog
                  onAddedStep={onAddedStep}
                  onHide={onHideAddStepDialog}
                  stoneId={stone.stoneId}
                  visible={addStepDialogVisible}
                />
                <PassOwnershipDialog
                  onPassedOwnership={onPassedOwnership}
                  onHide={onHidePassOwnerDialog}
                  stoneId={stone.stoneId}
                  visible={passOwnerDialogVisible}
                />
                <StoneInformationDisplay
                  stone={stone}
                  footer={
                    <div>
                      {!ownsStone && <Tooltip target=".add-step-tooltip" position="bottom" />}
                      <div
                        className={'add-step-tooltip'}
                        style={{ display: 'inline-block' }}
                        data-pr-tooltip="Du besitzt diesen Edelstein nicht."
                      >
                        <Button
                          type="button"
                          label="Verarbeitungsschritt hinzufügen"
                          icon="pi pi-step-forward"
                          onClick={onShowAddStepDialog}
                          disabled={!ownsStone}
                        />
                      </div>
                      {!ownsStone && <Tooltip target=".pass-ownership-tooltip" position="bottom" />}
                      <div
                        className="pass-ownership-tooltip"
                        style={{ display: 'inline-block' }}
                        data-pr-tooltip="Du besitzt diesen Edelstein nicht."
                      >
                        <Button
                          label="Besitz weitergeben"
                          icon="pi pi-user-edit"
                          className="p-button-secondary ml-2"
                          onClick={onShowPassOwnerDialog}
                          disabled={!ownsStone}
                        />
                      </div>
                    </div>
                  }
                />
              </>
            )}
          </div>
        </>
      </NeedsAuthContainer>
    </>
  );
};
