type Callback = (value: boolean) => void;
type Ref = React.RefObject<HTMLElement>;

export const useOutsideClick = (ref: Ref, callback: Callback) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
};
