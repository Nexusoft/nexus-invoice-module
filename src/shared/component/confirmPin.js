import PinDialog from './PinDialog';

export default function confirmPin({ confirmLabel } = {}, OpenPopUp) {
  console.log(OpenPopUp);
  return new Promise((resolve, reject) => {
    OpenPopUp(PinDialog, {
      confirmLabel,
      submitPin: pin => {
        resolve(pin);
      },
      onClose: () => {
        resolve(undefined);
      },
    });
  });
}
