import * as React from 'react';
import {useTheme} from '@twilio-paste/theme';
import type {BorderRadius} from '@twilio-paste/style-props';
import {Box, safelySpreadBoxProps} from '@twilio-paste/box';
import {Heading, HeadingPropTypes} from '@twilio-paste/heading';
import {ChevronRightIcon} from '@twilio-paste/icons/esm/ChevronRightIcon';
import {DisclosurePrimitive} from '@twilio-paste/disclosure-primitive';

import {DisclosureContext} from './DisclosureContext';
import type {DisclosureHeadingProps, StyledDisclosureHeadingProps} from './types';
import {useHover, getIconHoverStyles} from './utils';
import {IconSizeFromHeading} from './constants';

const StyledDisclosureHeading = React.forwardRef<HTMLDivElement, StyledDisclosureHeadingProps>(
  (
    {children, element, marginBottom, renderAs, disclosureVariant, customDisabled, customFocusable, variant, ...props},
    ref
  ) => {
    const theme = useTheme();
    const hoverRef = React.useRef(null);
    const isHovered = useHover(hoverRef);
    const isDisabled = props['aria-disabled'];
    const isExpanded = props['aria-expanded'];
    const iconSize = IconSizeFromHeading[variant] || 'sizeIcon20';

    let bottomBorderRadius: BorderRadius = 'borderRadius20';
    if (disclosureVariant === 'contained' && isExpanded) {
      bottomBorderRadius = 'borderRadius0';
    }

    return (
      <Heading as={renderAs} marginBottom="space0" variant={variant} ref={ref}>
        <Box
          {...safelySpreadBoxProps(props)}
          as="div"
          backgroundColor={isExpanded ? 'colorBackgroundWeak' : 'colorBackgroundBody'}
          borderRadius="borderRadius20"
          borderBottomLeftRadius={bottomBorderRadius}
          borderBottomRightRadius={bottomBorderRadius}
          cursor="pointer"
          display="flex"
          element={element}
          outline="none"
          padding="space30"
          position="relative"
          ref={hoverRef}
          role="button"
          zIndex="zIndex10"
          transition="background-color 100ms ease-out"
          _hover={{
            backgroundColor: 'colorBackground',
          }}
          _focus={{
            boxShadow: 'shadowFocus',
          }}
          _disabled={{
            backgroundColor: 'colorBackgroundStrong',
            color: 'colorTextWeaker',
            cursor: 'not-allowed',
          }}
        >
          <Box
            as="span"
            element={`${element}_ICON`}
            display="flex"
            color={isDisabled ? 'colorTextWeaker' : 'colorTextIcon'}
            transition="transform 200ms ease-out"
            height={iconSize}
            width={iconSize}
            {...getIconHoverStyles(isHovered, isExpanded, isDisabled, theme.space)}
          >
            <ChevronRightIcon color="inherit" decorative size={iconSize} />
          </Box>
          {children}
        </Box>
      </Heading>
    );
  }
);

StyledDisclosureHeading.displayName = 'StyledDisclosureHeading';

const DisclosureHeading: React.FC<DisclosureHeadingProps> = ({
  children,
  as,
  element = 'DISCLOSURE_HEADING',
  disabled,
  focusable,
  ...props
}) => {
  const {disclosure, variant} = React.useContext(DisclosureContext);
  return (
    <DisclosurePrimitive
      {...disclosure}
      {...props}
      as={StyledDisclosureHeading}
      customDisabled={disabled}
      customFocusable={focusable}
      disabled={disabled}
      disclosureVariant={variant}
      element={element}
      focusable={focusable}
      renderAs={as}
    >
      {children}
    </DisclosurePrimitive>
  );
};

DisclosureHeading.displayName = 'DisclosureHeading';

if (process.env.NODE_ENV === 'development') {
  DisclosureHeading.propTypes = HeadingPropTypes;
}

export {DisclosureHeading};
