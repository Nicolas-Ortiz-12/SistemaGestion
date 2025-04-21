// src/components/TabSelector.jsx
import React from 'react'
import styled from 'styled-components'

const TabSelector = ({ activeTab, onChange }) => {
    return (
        <StyledWrapper>
            <div className="tab-container">
                <input
                    type="radio"
                    name="tab"
                    id="tab1"
                    className="tab tab--1"
                    checked={activeTab === 'movimientos'}
                    onChange={() => onChange('movimientos')}
                />
                <label className="tab_label" htmlFor="tab1">Movimientos</label>

                <input
                    type="radio"
                    name="tab"
                    id="tab2"
                    className="tab tab--2"
                    checked={activeTab === 'conciliaciones'}
                    onChange={() => onChange('conciliaciones')}
                />
                <label className="tab_label" htmlFor="tab2">Conciliaciones</label>

                <div className="indicator" />
            </div>
        </StyledWrapper>
    )
}

const tabWidth = 300

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .tab-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px;
    background-color: #dadadb;
    width: ${tabWidth * 2 + 4}px; /* ancho total incluyendo padding */
  }

  .indicator {
    content: "";
    width: ${tabWidth}px;
    height: 28px;
    background: #ffffff;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 9;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease-out;
  }

  .tab {
    width: ${tabWidth}px;
    height: 28px;
    position: absolute;
    z-index: 99;
    outline: none;
    opacity: 0;
  }

  .tab_label {
    width: ${tabWidth}px;
    height: 28px;
    position: relative;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    font-style:bold;
    font-size: 0.85rem;
    font-
    opacity: 0.6;
    cursor: pointer;
  }

  .tab--1:checked ~ .indicator {
    left: 2px;
  }

  .tab--2:checked ~ .indicator {
    left: calc(${tabWidth}px + 5px);
  }
`

export default TabSelector
