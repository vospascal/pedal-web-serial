import styled from '@emotion/styled';
import {
  alignItems, flexDirection, flexWrap, justifyContent,
} from 'styled-system';

export const Flex = styled('div')({
  display: 'flex',
}, flexWrap, flexDirection, alignItems, justifyContent, (props) => props.css);
Flex.displayName = 'Flex';
