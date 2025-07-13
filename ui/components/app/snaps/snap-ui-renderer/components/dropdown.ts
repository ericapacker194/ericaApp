import { DropdownElement, OptionElement } from '@ericaapp/snaps-sdk/jsx';
import { getJsxChildren } from '@ericaapp/snaps-utils';

import { UIComponentFactory } from './types';

export const dropdown: UIComponentFactory<DropdownElement> = ({ element, form }) => ({
  element: 'SnapUIDropdown',
  props: {
    id: element.props.name,
    name: element.props.name,
    disabled: element.props.disabled,
    form,
    options: getJsxChildren(element).map((child) => ({
      value: child.props.value,
      name: child.props.children,
      disabled: child.props.disabled,
    })),
  },
});
