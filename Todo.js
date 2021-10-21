import Button from "@atlaskit/button";
import React from "react";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove';

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  &,
  &:hover {
    ${(p) =>
      p.isCompleted &&  //gạch ngang bỏ nhiệm vụ sau khi hoàn thành
      css`
        text-decoration: line-through;  
      `}
  }

  &:hover {
    .check-icon {
      display: inline-block;
    }
  }

  .check-icon {
    display: none;

    &:hover {
      background-color: #e2e2e2;
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick, onDelBtnClick}) {
  return (
    <div>
    <ButtonStyled
      isCompleted={todo.isCompleted}
      shouldFitContainer
      iconAfter={
        <div>
        {!todo.isCompleted && (
          <span className='check-icon' onClick={() => onCheckBtnClick(todo.id)}>
            <CheckIcon primaryColor='#4fff4f' />
            Complete
          </span>
        )}
        {
          <span className='remove-icon' onClick={() => onDelBtnClick(todo.id)}>
            <EditorRemoveIcon primaryColor='black' />
            Remove
          </span>
        }
        </div>
      }
    >
    {todo.name}
    </ButtonStyled>
    </div>
  );
}
