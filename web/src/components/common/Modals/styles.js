import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  place-items: center;
  padding-bottom: 12px;
`

export const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    color: #ccc;
    font-size: 0.9em;

    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`

export const SelectInput = styled.select`
  appearance: none;
  display: block;
  border: none;
  border-radius: 0;
  outline: none;
  padding: 0.7em;
  padding-left: 0;
  font-size: 0.95em;
  color: #141414;
  line-height: 1.25;
  margin-bottom: 10px;
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
`

export const Button = styled.button`
  margin: 24px 0 auto;
  width: 100%;
  outline: 0;
  border: 0;
  color: #141414;
  font-size: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  display: inline-block;
  background-color: #f3f3f3;
  transition: all 125ms ease-in;
  border-radius: 4px;

  &:hover {
    color: #ffffff;
    background-color: blue;
  }

  &:disabled {
    opacity: 0.5;
  }
`
