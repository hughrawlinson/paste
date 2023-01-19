import * as React from 'react';
import type {GenericThemeShape} from '@twilio-paste/theme';
import type {BoxStyleProps} from '@twilio-paste/box';

/**
 * Returns the styles needed for the icon color and transitions
 * @param {boolean} isHovered
 * @param {boolean} ariaExapanded
 * @param {boolean} ariaDisabled
 * @param {GenericThemeShape['space']} space
 * @returns {BoxStyleProps} transform styles depending on variant if ariaDisabled is false
 */
export const getIconHoverStyles = (
  isHovered: boolean,
  ariaExpanded: boolean | 'true' | 'false' | undefined,
  ariaDisabled: boolean | 'true' | 'false' | undefined,
  space: GenericThemeShape['space']
): Pick<BoxStyleProps, 'transform'> => {
  if (!ariaDisabled) {
    return {
      transform: `${isHovered ? `translateX(${space.space10})` : `translateX(0)`} ${
        ariaExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
      }`,
    };
  }

  return {};
};

/*
 *TODO: Move this hook over to a Paste hook library
 */
export const useHover = <T extends HTMLElement = HTMLElement>(elementRef: React.RefObject<T>): boolean => {
  const [value, setValue] = React.useState(false);
  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const node = elementRef?.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [elementRef]);

  return value;
};
