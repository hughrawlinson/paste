import * as React from 'react';

import {TokenContext} from '../../context/TokenContext';
import {EditorWrapper} from '../../components/layout/editor-wrapper';
import {OptionsList} from '../../components/token-option';

export default function Sizing(): JSX.Element {
  const {tokens, updateToken} = React.useContext(TokenContext);

  if (tokens.sizings == null) return <></>;

  return (
    <EditorWrapper>
      <OptionsList bucket="sizings" options={tokens.sizings} handleChange={updateToken} />
    </EditorWrapper>
  );
}
