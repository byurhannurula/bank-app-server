import styled from 'styled-components'

export const Input = styled.input`
  display: block;
  border: none;
  border-radius: 0;
  outline: none;
  padding: 0.7em;
  padding-left: 0;
  font-size: 0.95em;
  color: #141414;
  line-height: 1.25;
  margin-bottom: 18px;
  background-color: transparent;
  border-bottom: 1px solid #ccc;

  &:focus {
    border-color: blue;

    &::placeholder {
      color: transparent;
      transition: all 150ms ease;
    }
  }

  &::placeholder {
    color: #ccc;
  }

  ${({ error }) =>
    error &&
    `
    border-color: red;
  `}
`

export const Button = styled.button`
  font-size: 0.8em;
  font-weight: 700;
  padding: 0.8em 4.5em;
  letter-spacing: 3px;
  color: blue;
  text-transform: uppercase;
  border: 1px solid var(--secondary);

  &:hover {
    color: #fff;
    transition: all 200ms ease-in-out;
    background-color: blue;
    border-color: blue;

    svg path {
      stroke: #fff;
    }
  }

  svg {
    width: 3.1em;
    height: 1.7em;
    margin-left: 1.55em;
  }
`

export const Error = styled.div`
  font-size: 0.8em;
  color: red;
`
